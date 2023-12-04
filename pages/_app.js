import "bootstrap/dist/css/bootstrap.min.css"; 
import '@fortawesome/fontawesome-free/css/all.css';
import '@/styles/globals.css'
import Header from "../components/Header"
import { Inter } from 'next/font/google'


import { useEffect } from "react";

const inter = Inter({ subsets: ['latin'] })


export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <main className={inter.className}>
      <Header />
      <Component {...pageProps} />
    </main>
  )
}
