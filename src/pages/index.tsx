import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import ServiceGrid from "@/components/srevices";
import Footer from "@/components/footer";
import React,{useState} from "react";
import { Search } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Add your search logic here
  };

  return (
    <div className="max-w-[1500px] mx-auto ">
          <Navbar/>
          <div className="justify-center mt-[10rem] ">
               <div className=" text-black font-bold bg-[pink] p-2 px-8 w-[fit-content] mx-auto rounded-4xl">AI is rewriting the rules—Be Part of It!</div>
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] py-5 pb-8 leading-tight ">
          Find the Perfect AI Engineer <br />
          For Your Next Project
        </h1>

      <div className="w-full max-w-2xl mx-auto  px-5 py-5">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="What do you need to find?"
          className="flex-1 px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400 text-base"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          // onFocus={}
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex-shrink-0"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
          </div>
          <div id="services" >
            <ServiceGrid />
          </div>
          <Footer />
    </div>
  );
}
