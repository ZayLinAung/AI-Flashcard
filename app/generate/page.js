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

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
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
          setFlashCards(data.flashcard);
          setFlipped(new Array(data.flashcard.length).fill(false));
        } else {
          setFlashCards([]);
          setFlipped([]);
        }
      })
      .catch((error) => {
        console.error("Error generating flashcards:", error);
        setFlashCards([]);
        setFlipped([]);
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
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
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
    router.push("/flashcard");
  };

  return (
    <Container maxWidth="md">
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
          Your Title Here
        </Typography>

        <Paper sx={{ p: 4, width: "100%" }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter Text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </Paper>
      </Box>

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
                              variant="h5"
                              component="div"
                              sx={{
                                width: "100%",
                                height: "100%",
                                overflowY: "auto",
                                wordWrap: "break-word",
                              }}
                            >
                              {flashcard.front}
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
                              variant="h5"
                              component="div"
                              sx={{
                                width: "100%",
                                height: "100%",
                                overflowY: "auto",
                                wordWrap: "break-word",
                              }}
                            >
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
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpen}
              gutterBottom
            >
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
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
      </Dialog>
    </Container>
  );
}