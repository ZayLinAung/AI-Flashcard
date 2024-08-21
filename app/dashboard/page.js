'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import {
    File,
    Home,
    ListFilter,
    MoreHorizontal,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
    Plus,
    Folders,
    Info
} from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { UserButton } from '@clerk/nextjs'
import {
    writeBatch,
    doc,
    collection,
    getDoc,
    setDoc,
    deleteDoc,
    arrayRemove,
    updateDoc
} from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import Aside from "../../components/aside"
import Loading from "@/components/loading"

export function Dashboard() {
    const { userId, getToken } = useAuth();
    const { isLoaded, isSignedIn, user } = useUser();

    const [sets, setSets] = useState([])
    // const [cards, setCards] = useState([])
    const router = useRouter()

    // Fetch sets
    async function getSets() {
        if (!userId) return;
        const docRef = doc(collection(db, "users"), userId);

        const docSnap = await getDoc(docRef);
        console.log('docSnap: ', docSnap);

        if (docSnap.exists()) {
            const collection = docSnap.data().flashcards || [];
            console.log('collection: ', collection);

            setSets(collection);
        } else {
            await setDoc(docRef, { flashcards: [] });
        }
    }
    useEffect(() => {
        getSets();
    }, [getSets]);


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Aside />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="/"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Folders className="h-5 w-5" />
                                    View flashcard  sets
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Plus className="h-5 w-5" />
                                    New Set
                                </Link>

                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>All Sets</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="relative ml-auto flex-1 md:grow-0">

                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <UserButton />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="archived" className="hidden sm:flex">
                                    Archived
                                </TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-8 gap-1">
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Filter
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Active
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Archived
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button size="sm" variant="outline" className="h-8 gap-1">
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Export
                                    </span>
                                </Button>

                                <Link
                                    href="/generate"
                                >
                                    <Button size="sm" className="h-8 gap-1">
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            New Set
                                        </span>
                                    </Button>
                                </Link>

                            </div>
                        </div>
                        <TabsContent value="all">
                            <Card x-chunk="dashboard-06-chunk-0">

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <CardHeader>
                                        <CardTitle>Flashcard Sets</CardTitle>
                                        <CardDescription>
                                            Manage your products and view their sales performance.
                                        </CardDescription>

                                    </CardHeader>
                                    <div className="relative md:grow-0 mx-6">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Search name..."
                                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                                        />
                                    </div>
                                </div>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>

                                                <TableHead>Name</TableHead>
                                                {/* <TableHead>Description</TableHead> */}
                                                {/* <TableHead className="hidden md:table-cell">
                                                    # of Cards
                                                </TableHead> */}
                                                {/* <TableHead className="hidden md:table-cell">
                                                    Created at
                                                </TableHead> */}
                                                <TableHead>
                                                    <span className="sr-only">Actions</span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        {/* Table body */}
                                        <TableBody>
                                            {sets && sets.map((set, index) => (
                                                <TableRow key={index}

                                                >

                                                    <TableCell className="font-medium" onClick={() => router.push(`/dashboard/${set.name}`)}
                                                        style={{ cursor: 'pointer' }}>
                                                        {set.name}
                                                    </TableCell>
                                                    {/* <TableCell>
                                                        {set.desc}
                                                    </TableCell> */}
                                                    {/* <TableCell className="hidden md:table-cell" onClick={() => router.push(`/dashboard/${set.name}`)}
                                                        style={{ cursor: 'pointer' }}>
                                                        
                                                    </TableCell> */}
                                                    {/* <TableCell className="hidden md:table-cell">
                                                        {new Date(set.created_at).toLocaleDateString()}
                                                    </TableCell> */}
                                                    <TableCell >
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    aria-haspopup="true"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    className="float-end"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                <DropdownMenuItem>Archive</DropdownMenuItem>
                                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>


                                            ))}



                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-xs text-muted-foreground">
                                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                        Sets
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
