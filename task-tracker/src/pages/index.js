import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Banner from "@/Components/Banner";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userName, setUserName] = useState("");
  const fetchUser = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const { data } = await axios.get(`/api/auth/${userId}`);
      setUserName(data.data.name);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main>
      <Navbar userName={userName} />
      <Banner />
      <Footer />
    </main>
  );
}
