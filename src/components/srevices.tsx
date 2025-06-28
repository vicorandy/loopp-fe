import React, { useState,useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Crown ,Sparkle} from 'lucide-react';
import { PiSparkleFill } from "react-icons/pi";
import { useGetServices } from './libs/hooks/services';
import { slugify } from './libs/utils';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { ServiceData } from './libs/types';


const ServiceGrid = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const {data,isLoading,refetchWithParams} = useGetServices({page,limit})
    const [servicesCount,setServicesCount] = useState(1)
    const [services,setService] = useState<ServiceData[]>([])
    const router = useRouter()
  
 useEffect(() => {
  console.log({data})
  
  if (data?.services?.length) {
    setService((prev) => {
      const existingIds = new Set(prev.map((service:ServiceData) => service.id));
      setServicesCount(data?.servicesCount)
      const newServices = data.services.filter((service:ServiceData) => !existingIds.has(service.id));
      return [...prev, ...newServices];
    });
  }
}, [data]);


  const categories = [
    'All',
    'AI Agents',
    'Video & Image',
    'Voice & Music',
    'Technology',
    'Cybersecurity',
    'Healthcare',
    'Finance & Fintech',
    'Education & EdTech',
    'Real Estate',
    'Robotics and Automation',
    'Project Management',
    'Business',
    'Legal and Compliance',
    'Retail and E-Commerce',
    'Entertainment',
    'Aerospace',
    'Agriculture',
    'Manufacturing',
    'Fashion & Beauty',
    'Gaming & eSports',
    'Transportation',
    'Energy & Sustainability',
    'Supply Chain & Logistics',
    'Tourism & Hospitality',
    'Food & Beverage'
  ];

  function serviceRouter (service:ServiceData){
    const link = slugify(service.name)
    Cookies.set('selected-service',JSON.stringify(service))
    router.push(`/services/${link}`)

  }

  const scrollLeft = () => {
    const container = document.getElementById('categories-container');
    container?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById('categories-container');
    container?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const fetchMoreSerice = async()=>{
    console.log(servicesCount)
    if(servicesCount <= page * limit ) return
    setPage(page + 1) 
    await refetchWithParams({page,limit})
    
    
  }

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services?.filter(service => service?.category === selectedCategory);

  return (
    <div >
      {/* Categories Header */}
      <div className="max-w-[1350px] mx-auto bg-white  sticky top-20 z-40">
        <div className="relative  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Categories container */}
          <div
            id="categories-container"
            className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide mx-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-200 '
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="w-full mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices?.map((service) => (
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

        {/* No Results Message */}
        {filteredServices?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found for "{selectedCategory}" category.</p>
            <button 
              onClick={() => setSelectedCategory('All')}
              className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              Show All Services
            </button>
          </div>
        )}

        {filteredServices?.length >= 1 && (
          <div className='mx-auto w-[fit-content] mt-30'>
              <button onClick={fetchMoreSerice} className="block text-center bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                    {isLoading ? 'Loading...' : 'Load More'}
              </button>
          </div>
        )}
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        #categories-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ServiceGrid;