// pages/_app.js
// Trigger redeploy: fixed analytics path
import React from "react";
import { Analytics } from "@vercel/analytics";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;