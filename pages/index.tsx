import Image from "next/image";
import { Inter } from "next/font/google";
import QuizPage from "./quiz";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (

    <main
      className=''
    >


      <div>
        <Navbar />
        <QuizPage />
      </div>
    </main>
  );
}
