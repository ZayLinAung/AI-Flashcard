import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import Head from "next/head";
import { grey } from "@mui/material/colors";

export default function Home() {
  return (
    <Container maxWidth="100vw">
      <Head>
        <title> Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from  your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">{""}Log in</Button>
            <Button color="inherit"href="/sign-up">Sign up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: "center",
          my: 4,
        }}
      >
        <Typography variant="h2" gutterBottom> Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" gutterBottom>
          {" "}
          {""}Easiest place to make flashcards from scratch
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get started
        </Button>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy text input</Typography>
            <Typography>
              {""}Simply input text and let the software do the rest
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart flashcard</Typography>
            <Typography>{""}Use any language</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible anywhere</Typography>
            <Typography>{""}Just download and it works</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Pricing </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: grey,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBotttom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5/month
              </Typography>
              <Typography>
                {""}Acess to basic flashcard features and limited storage
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}}>
                {" "}
                Choose basic
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
          <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: grey,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBotttom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10/month
              </Typography>
              <Typography>
                {""}Acess to pro flashcard features and limited storage
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}}>
                {" "}
                Choose pro
              </Button>
              </Box>
            </Grid> 
           </Grid> 
      </Box>
    </Container>
  );
}
