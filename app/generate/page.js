"use client";

import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import {
  Container,
  Box,
  Button,
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
import {
  writeBatch,
  doc,
  collection,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Aside from "@/components/aside";
import Loading from "@/components/loading";
import { SpinnerIcon } from "@/components/icons";

export default function Generate() {
  const { userId, getToken } = useAuth();

  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {

    if (name.length == 0 || text.length == 0) {
      alert("Inputs can't be empty!");
      return;
    }
    setIsLoading(true)
    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: text,
    })
      .then((res) => {
        // Log the response text to check for issues
        return res.text().then((text) => {
          console.log("Response text:", text);
          return JSON.parse(text); // Manually parse JSON
        });
      })
      .then((data) => {
        console.log("Data received:", data);

        if (data.flashcard && Array.isArray(data.flashcard)) {
          const updatedFlashcards = data.flashcard.map((flashcard) => ({
            ...flashcard,
            setName: name,
          }));
          setFlashCards(updatedFlashcards);
          setFlipped(new Array(data.flashcard.length).fill(false));
          setIsLoading(false)

        } else {
          setFlashCards([]);
          setFlipped([]);
          setIsLoading(false)

        }
      })
      .catch((error) => {
        console.error("Error generating flashcards:", error);
        setFlashCards([]);
        setFlipped([]);
        setIsLoading(false)
      });
  };

  const handleCardClick = (index) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashCards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection exists already");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections, userId: userId }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
    await batch.commit();
    handleClose();

    router.push('/dashboard');
  };

  return (
    <>
      <Aside />
      <Container maxWidth="lg" className="px-24">
        <Box
          sx={{
            mt: 4,
            mb: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Create Flashcard Set
          </Typography>

          <DialogContentText>
            Please enter a name for your flashcard set
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />

          <Paper sx={{ p: 4, width: "100%" }}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter Text for AI to Generate"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              disabled={isLoading}
              style={{
                background: "#a855f7"
              }}
            >
              {isLoading ? <SpinnerIcon /> : "Generate"}
            </Button>
          </Paper>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" className="text-center mb-2">Flashcard Preview</Typography>
            <Grid container spacing={2}>
              {isLoading ? (
                <SpinnerIcon />
              ) : (
                flashcards.map((card, index) => (
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
                ))
              )}

            </Grid>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center", mb: 5 }}>
              <Button
                variant="contained"
                onClick={saveFlashCards}
                gutterBottom
                style={{
                  background: "#a855f7"
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}

        {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcard</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard collection
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashCards}>Save</Button>
        </DialogActions>
      </Dialog> */}
      </Container>
    </>

  );
}