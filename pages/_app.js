// pages/_app.js
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css"; // (or wherever your styles are)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;