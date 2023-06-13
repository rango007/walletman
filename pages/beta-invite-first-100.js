/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {EmailAuthProvider, GoogleAuthProvider} from "firebase/auth";
import {Button, CircularProgress, Container, Dialog, Typography} from "@mui/material";
import {useAuth} from "../firebase/auth";
import {auth} from "../firebase/firebase";
import styles from "../styles/landing.module.scss";

const REDIRECT_PAGE = "/dashboard";

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup", // popup signin flow rather than redirect flow
  signInSuccessUrl: REDIRECT_PAGE,
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

export default function Home() {
  const {authUser, isLoading} = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);

  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (!isLoading && authUser) {
      router.push(REDIRECT_PAGE);
    }
  }, [authUser, isLoading, router]);

  return ((isLoading || (!isLoading && !!authUser)) ?
    <CircularProgress color="inherit" sx={{marginLeft: "50%", marginTop: "25%"}}/> :
    <div>
      <Head>
        <title>Walletman</title>
      </Head>

      <main>
        <Container className={styles.container}>
          <Typography variant="h2">Walletman for Businesses</Typography>
          <Typography variant="h1">&quot;Let customers pay in advance for cashbacks.&quot;</Typography>
          <div className={styles.buttons}>
            <Button variant="contained" color="secondary"
              onClick={() => setLogin(true)}>
              Login / Register
            </Button>
          </div>
          <Dialog onClose={() => setLogin(false)} open={login}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          </Dialog>
        </Container>
      </main>
    </div>
  );
}
