import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSearchService } from "@/components/libs/hooks/services";
import React from "react";
import { ServiceData } from "@/components/libs/types";
import Cookies from "js-cookie";
import { slugify } from "@/components/libs/utils";
import { CheckCircle } from "lucide-react";
import { PiSparkleFill } from "react-icons/pi";


export default function searchServicePage (){
const router = useRouter()
const [searchTerm,setSearchTerm] = useState<string>('')
const [services,setServices] = useState<ServiceData[]>([])
const {data} =useSearchService(searchTerm)

  const popularServices = [
    'AI Agent',
    'AI Chatbots',
    'AI for Video',
    'AI for Image',
    'AI for Voice',
  ];

function serviceRouter (service:ServiceData){
    const link = slugify(service.name)
    Cookies.set('selected-service',JSON.stringify(service))
    router.push(`/services/${link}`)

  }


useEffect(()=>{  
        if(typeof router.query.search === 'string') {
            setSearchTerm(router.query.search)
        }
},[router.query])

useEffect(()=>{
    setServices(data?.results)
},[data])

 return (
     <div className="container mx-auto px-3 lg:px-10 xl:px-33">
        <Navbar />
           <div className=" pt-25 pb-10 bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {searchTerm}
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-black mb-8">
          Browse {searchTerm} service to find what works best apporach for your project
        </p>
        
        {/* Related Tags */}
        <div className="flex items-center justify-center gap-2 ">
          <span className="text-sm text-gray-700 font-medium mr-2">
            popular:
          </span>
          {popularServices.map((tag, index) => (
              <button onClick={()=>router.push(`/services/search/${tag}`)} key={index} className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap bg-gray-100 hover:bg-[#FFE1E1]">
                 {tag}
              </button>
          ))}
        </div>
      </div>
           </div>
            
            <div className="mx-auto mt-[3rem]">        
                {/* Service Cards Grid */}
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-1 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services?.map((service) => (
                      <div onClick={()=>serviceRouter(service)} key={service.id} className="bg-white overflow-hidden transition-shadow duration-300 cursor-pointer">
                                  {/* Card Image with Overlay */}
                                  <div className="relative h-68 bg-gradient-to-br from-teal-600 to-teal-800 overflow-hidden">
                                    {/* Background Pattern/Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    
                                    {/* Category Tag */}
                                    <div className="absolute top-4 left-4 z-25">
                                      <span className="bg-white bg-opacity-90 text-[10px]  text-black px-3 py-1 rounded-full text-xs font-[600]">
                                        {service.category.toUpperCase()}
                                      </span>
                                    </div>
                    
                                    {/* Overlay Elements */}
                                    <div className="absolute bg-white inset-0 flex items-center justify-center">
                                        <img className='w-full h-[265px] object-cover object-center rounded-2xl ' src={service?.image} />
                                    </div>
                                  </div>
                    
                                  {/* Card Content */}
                                  <div className="py-2">
                                    {/* Verification and Pro Badge */}
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        {service.verified && (
                                           <div className="flex items-center gap-1 bg-[#FFE1E1] text-black px-3 py-1 rounded-full text-xs font-bold">
                                             <CheckCircle color='black' className="w-3 h-3" />
                                             VETTED ENGINEERS
                                             </div>
                                        )}
                                      </div>
                                      {service.pro && (
                                         <div className="flex items-center font-bold border-1 gap-1 bg-[transparent] text-[black] px-3 py-1 rounded-full text-xs ">
                                            PRO
                                            <PiSparkleFill color='black' className="w-3 h-3" />
                                          </div>
                                      )}
                                    </div>
                    
                                    {/* Service Title */}
                                    <h3 className="text-lg font-[400] text-black  text-[14px] leading-tight">
                                      {service.name}
                                    </h3>
                                  </div>
                     </div>
                    ))}
                </div>
            
                {/* Hide scrollbar */}
                <style jsx>{`
                    #categories-container::-webkit-scrollbar {
                    display: none;
                    }
                `}</style>
            </div>
    
            </div>

        <Footer />
    </div>
  );
}