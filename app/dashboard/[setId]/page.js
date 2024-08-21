'use client'

import React, { useEffect, useState } from 'react'
import {
    Container,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Paper,
    TextField,
    CardActionArea,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Dialog,
} from "@mui/material";
import { useAuth } from "@clerk/nextjs"
import {
    collection,
    doc,
    getDocs,
    getDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Aside from "../../../components/aside"
import Loading from '@/components/loading';


const FlashcardSetPage = ({ params }) => {
    const { userId } = useAuth();
    const setId = params.setId.split('%20').join(' ')
    const [isLoading, setIsLoading] = useState(false)
    // const setId = params.setId.replace(/[%20]/g, "")

    const [cards, setCards] = useState([])
    const [flipped, setFlipped] = useState([]);
    console.log('test ', setId);


    useEffect(() => {
        setIsLoading(true)
        async function getFlashcards() {
            if (!userId || !setId) return;

            const userDocRef = doc(collection(db, "users"), userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const colRef = collection(userDocRef, setId);

                const querySnapshot = await getDocs(colRef);
                const flashcards = [];

                querySnapshot.forEach((doc) => {
                    flashcards.push({ id: doc.id, ...doc.data() });
                });

                //console.log('flashcards: ', flashcards);
                setCards(flashcards);
                setIsLoading(false)
            } else {
                console.log("User document does not exist");
                setIsLoading(false)
            }
        }
        getFlashcards();
    }, [userId, setId])


    const handleCardClick = (index) => {
        setFlipped((prev) => {
            const newFlipped = [...prev];
            newFlipped[index] = !newFlipped[index];
            return newFlipped;
        });
    };

    return (
        <>
            <Aside />
            <div className='min-h-screen px-24'>
                {isLoading ? (
                    <Loading />
                ) : (

                    cards.length > 0 && (
                        <>
                            <Box sx={{ mt: 4 }}>
                                <div className='text-center mb-5'><Typography variant="h5">Flashcard Preview</Typography>
                                </div>
                                <Grid container spacing={3}>
                                    {cards.map((card, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Box sx={{
                                                position: "relative",
                                                width: "100%",
                                                height: "200px",
                                                cursor: "pointer",
                                            }}
                                                onClick={() => handleCardClick(index)}>
                                                <Box
                                                    sx={{
                                                        perspective: "1000px",
                                                        position: "relative",
                                                        width: "100%",
                                                        height: "200px",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            position: "relative",
                                                            width: "100%",
                                                            height: "100%",
                                                            transition: "transform 0.6s",
                                                            transformStyle: "preserve-3d",
                                                            transform: flipped[index]
                                                                ? "rotateY(180deg)"
                                                                : "rotateY(0deg)",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                position: "absolute",
                                                                width: "100%",
                                                                height: "100%",
                                                                backfaceVisibility: "hidden",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                padding: 2,
                                                                boxSizing: "border-box",
                                                                backgroundColor: "white",
                                                                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                                                overflow: "auto",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h6"
                                                                component="div"
                                                                sx={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    overflowY: "auto",
                                                                    wordWrap: "break-word",
                                                                }}
                                                                className='flex justify-center items-center'
                                                            >
                                                                {card.front}
                                                            </Typography>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                position: "absolute",
                                                                width: "100%",
                                                                height: "100%",
                                                                backfaceVisibility: "hidden",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                padding: 2,
                                                                boxSizing: "border-box",
                                                                backgroundColor: "white",
                                                                transform: "rotateY(180deg)",
                                                                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                                                overflow: "auto",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h6"
                                                                component="div"
                                                                sx={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    overflowY: "auto",
                                                                    wordWrap: "break-word",
                                                                }}
                                                                className='flex justify-center items-center'

                                                            >
                                                                {card.back}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <div className='flex justify-center items-center my-5'>
                                <Link href="/dashboard" className="px-7 py-4  bg-purple-400 text-2xl text-white rounded-md">
                                    Back
                                </Link>
                            </div>
                        </>



                    )

                )}




            </div>
        </>

    )
}

export default FlashcardSetPage