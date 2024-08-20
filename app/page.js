import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  SignIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
} from "@clerk/nextjs";
import { Sprout, Flower2 } from "lucide-react";
import getStripe from "@/utils/get-stripe";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Head from "next/head";
import { grey } from "@mui/material/colors";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 ">
        <Link
          href="#"
          className="flex items-center text-4xl font-bold"
          prefetch={false}
        >
          <span>CramIt</span>
        </Link>
        <nav className="space-x-4">
          {/* Display when users are logged out */}
          <Link
            href="#"
            className="text-lg text-gray-700 dark:text-white"
            prefetch={false}
          >
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </Link>
          <Link href="#" prefetch={false}>
            <SignedOut>
              <SignUpButton />
            </SignedOut>
          </Link>

          {/* Display when users are signed in */}
          <Link href="/dashboard" prefetch={false}>
            <SignedIn>
              <Button variant="outline">Dashboard</Button>
            </SignedIn>
          </Link>
        </nav>
      </header>

      <div className="flex flex-col items-center pt-32">
        <section
          id="hero"
          className="flex flex-col justify-center items-center"
        >
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-semibold text-balance text-center font-heading">
            A simple way to solve your last minute cram
          </h1>
          <p className="text-base xl:text-xl text-balance max-w-[38rem] mt-8 text-center text-zinc-500">
            CramIt is currently in beta development
          </p>

          <div className="flex items-center gap-x-2 mt-5">
            <Button size="lg" asChild>
              <Link href="/dashboard">Try it now</Link>
            </Button>
          </div>
        </section>

        <section
          id="features"
          className="w-full rounded-tl-none rounded-3xl  p-6 mt-14 "
        >
          <h3 className="text-4xl font-semibold text-balance text-center font-heading text-zinc-800">
            Features
          </h3>
          <div className="grid lg:grid-cols-2 gap-10 mt-10 relative">
            <div className="w-full h-full bg-white border border-zinc-200 p-5 rounded-3xl rounded-br-none space-y-2 flex flex-col items-center">
              <Sprout />
              <h4 className="text-base font-medium text-balance">Free Plan</h4>
              <span className="text-sm text-zinc-500">
                <ul>
                  <li>- 5 Sets Max per account</li>
                  <li>- 10 Cazrds per Set</li>
                  <li>- 3 AI Card Generation/Day</li>
                </ul>
              </span>
              <Button className="flex items-center gap-x-2 mt-5">
                Choose basic
              </Button>
            </div>

            <div className="w-full h-full bg-white border border-zinc-200 p-5 rounded-3xl rounded-bl-none space-y-2 flex flex-col items-center">
              <Flower2 />
              <h4 className="text-base font-medium text-balance">Premium</h4>
              <span className="text-sm text-zinc-500">
                <ul>
                  <li>- Unlimited Number of Sets per Account</li>
                  <li>- Unlimited Cards per Set</li>
                  <li>- Unlimited AI Flashcard Generation</li>
                  <li>- Access to AI Chart Analytics</li>
                </ul>
              </span>
              <Button className="flex items-center gap-x-2 mt-5">
                Choose Pro
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
