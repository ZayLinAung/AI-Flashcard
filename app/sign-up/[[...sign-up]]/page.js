import { AppBar, Box, Container, Toolbar, Typography, Button, Link } from "@mui/material";
import {SignUp} from "@clerk/nextjs"

export default function SignUPPage() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit">
            <Link href="/sign-in" passHref>
                Sign up
            </Link>
          </Button>
           <Button color="inherit">
            <Link href="/sign-up" passHref>
                Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <Typography variant="h4"gutterBottom sx={{mt: 2}}>
            Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
