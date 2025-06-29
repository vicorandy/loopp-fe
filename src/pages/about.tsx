// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-3 lg:px-10 xl:px-33">

     <Navbar />
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 md:px-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                <div className=" text-black font-bold bg-[#FFE1E1] my-5 p-2 px-8 w-[fit-content] mx-auto rounded-4xl">About</div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                    The AI Revolution Starts Here
                </h1>
                <p className="text-md md:text-lg text-black max-w-3xl mx-auto">
                    Empowering AI creators, developers, and businesses to turn creativity into measurable success.
                </p>
                </div>

                    {/* Hero Image with Animated Gradient */}
                    <div className="relative rounded-3xl overflow-hidden mb-20 h-96 md:h-[500px]">
                        <img src="/about1.webp" alt="" />
                    </div>
            </div>
            </section>

            {/* Bottom Section */}
            <section className="pb-16 md:px-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                    <h2 className="text-3xl md:text-3xl font-bold text-black">
                    Driving the Future of AI Innovation
                    </h2>
                    <p className="text-black text-md leading-relaxed">
                    At Lexica, we're on a mission to make AI accessible, efficient, and lucrative for creators and businesses alike. By 
                    seamlessly integrating AI into everyday workflows, we unlock new revenue streams, streamline complexity, and empower 
                    professionals to focus on impactful, high-value work.
                    </p>
                    <div className="flex flex-wrap gap-4">
                    <a href='/hire-an-engineer' >  <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
                        Hire an AI Engineer
                    </button> </a>
                    <a href='/#services'>   <button className="text-black  px-6 py-2 rounded-full font-medium hover:border-gray-500 transition-colors duration-300 flex items-center gap-2">
                        Explore Services
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button></a>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 h-96">
                    <img src="/about2.webp" className='h-96' alt="" />   
                
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>

        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 md:px-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                   Shape the Future with Your Talent
                </h1>
                <p className="text-md md:text-lg text-black max-w-3xl mx-auto">
                Join the AI workforce redefining what’s possible—one breakthrough at a time.
                </p>
                </div>

                    {/* Hero Image with Animated Gradient */}
                    <div className="relative rounded-3xl overflow-hidden mb-20 h-96 md:h-[500px]">
                        <img src="/about3.webp" className='w-[100%]' alt="" />
                    </div>
            </div>
            </section>

            {/* Bottom Section */}
            <section className="pb-16 md:px-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="relative">
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 h-96">
                    <img src="/about4.webp" className='h-96' alt="" />   
                
                    </div>
                </div>    

                {/* Right Image */}
                <div className="space-y-8">
                    <h2 className="text-3xl md:text-3xl font-bold text-black">
                    Driving the Future of AI Innovation
                    </h2>
                    <p className="text-black text-md leading-relaxed">
                    At Loopp, we believe the next generation of work is powered by people who know how to work with AI. We’re building a global community of engineers, innovators, and creators who are redefining what’s possible.
                    </p>
                    <p className="text-black text-md leading-relaxed">Ready to build intelligent systems, solve real-world problems, and launch a meaningful career in AI? Let’s build the future—together.</p>
                    <div className="flex flex-wrap gap-4">
                    <a href='/get-hired' ><button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
                       Get Hired
                    </button>
                    </a>

                    <a href='/#services'><button className="text-black  px-6 py-2 rounded-full font-medium hover:border-gray-500 transition-colors duration-300 flex items-center gap-2">
                        Explore Services
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button> </a>
                    </div>
                </div>

             
                </div>
            </div>
            </section>
        </div>
      <Footer />
    </div>
  );
};

export default AboutPage;