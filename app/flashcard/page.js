"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter, useSearchParams } from "next/navigation";

import {
    Container,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    CardActionArea,
} from "@mui/material";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      try {
        if (!search || !user) return;
  
        const colRef = collection(db, "users", user.id, search);
        const querySnapshot = await getDocs(colRef);
        const flashcards = [];
  
        querySnapshot.forEach((doc) => {
          flashcards.push({ id: doc.id, ...doc.data() });
        });
        setFlashcards(flashcards);
        setFlipped(new Array(flashcards.length).fill(false));  
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
    getFlashcard();
  }, [user, search]);
  

  const handleCardClick = (index) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Flashcard Preview</Typography>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardActionArea onClick={() => handleCardClick(index)}>
                      <CardContent>
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
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              backfaceVisibility: "hidden",
                              transition: "transform 0.6s",
                              transformStyle: "preserve-3d",
                              transform: flipped[index]
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                boxSizing: "border-box",
                              }}
                            >
                              <Typography variant="h5" component="div">
                                {flashcard.front}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                boxSizing: "border-box",
                                transform: "rotateY(180deg)",
                              }}
                            >
                              <Typography variant="h5" component="div">
                                {flashcard.back}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button variant="contained" color="secondary" onClick={handleOpen} gutterBottom>
                Save
              </Button>
            </Box>
          </Box>
        )}
      </Grid>
    </Container>
  );
}
