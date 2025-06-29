import React, { useState,useEffect } from 'react';
import { User, CheckCircle, Crown } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { DedicatedPMModal } from '@/components/modal/projectManagerModal';
import { PiSparkleFill } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
import Cookies from 'js-cookie';
import { useGetServices } from '@/components/libs/hooks/services';
import { ServiceData } from '@/components/libs/types';
import { useRouter } from 'next/router';
import { slugify } from '@/components/libs/utils';

const Service = () => {
  const selectedServiceData = Cookies.get('selected-service')
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedService,setSlectedService] = useState<ServiceData>()
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const {data,isLoading} = useGetServices({page:1,limit:12})
  const [services,setService] = useState<ServiceData[]>([])
  const router = useRouter()
 
   
     useEffect(()=>{
        setService(data?.services)
        if(selectedServiceData) setSlectedService(JSON.parse(selectedServiceData))
     },[data,selectedServiceData])

  const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Project submitted:', { projectDescription, deadline, budget });
    router.push('/hire-an-engineer')
    // Add your submission logic here
  };
  
  function serviceRouter (service:ServiceData){
    const link = slugify(service.name)
    Cookies.set('selected-service',JSON.stringify(service))
    router.push(`/services/${link}`)

  }
  
  
  
  return (
     <div className="container mx-auto px-3 lg:px-10 xl:px-33">
        <Navbar />
        <DedicatedPMModal open={modalOpen} onClose={()=>{setModalOpen(false)}} />

            <div className="mx-auto px-4 sm:px-6 lg:px-6 py-6 shadow-[0_0_20px_0_rgba(0,0,0,0.10)] mt-[8rem] rounded-3xl" >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Image Card */}
                    <div className="relative">
                    <div className="overflow-hidden rounded-2xl">
                        <img
                        src={selectedService?.image}
                        alt="Business person with 24/7 graphic"
                        className="w-full  object-cover aspect-[4/4] h-[100%]"
                        />
                    </div>
                       <div className="absolute top-4 left-4 z-25">
                            <span className="bg-white bg-opacity-90 text-[10px]  text-black px-3 py-1 rounded-full text-xs font-[600]">
                                {selectedService?.category.toUpperCase()}
                            </span>
                       </div>
                    </div>

                    {/* Right: Form */}
                    <div className="space-y-6">
                    {/* Badges: no wrap, smaller */}
                    <div className="flex  flex-col md:flex-row items-center justify-between gap-3 whitespace-nowrap">
                        <div className='flex gap-2 items-center'> 
                            <div className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                            <User className="w-3 h-3" />
                            PROJECT MANAGER
                            </div>
                            <PiWarningCircle className='w-5 h-5' onClick={()=>setModalOpen(true)} />
                        </div>
                        <div className='flex gap-3'>
                            <div className="flex items-center gap-1 bg-[#FFE1E1] text-black px-3 py-1 rounded-full text-xs font-medium">
                                            <CheckCircle className="w-3 h-3" />
                                            VETTED ENGINEERS
                            </div>
                            <div className="flex items-center font-bold border-1 gap-1 bg-[transparent] text-[black] px-3 py-1 rounded-full text-xs ">
                                                PRO
                                                <PiSparkleFill color='black' className="w-3 h-3" />
                            </div>
                         </div>
                    </div>

                    {/* Heading + Copy: scaled down */}
                    <div>
                        <h1 className="text-center lg:text-left text-2xl sm:text-3xl md:text-3xl lg:text-[28px] font-[600] text-black leading-snug mb-2">
                         {selectedService?.name}
                        </h1>
                        <p className="text-center lg:text-left text-black text-[14px] font-[400] leading-relaxed">
                        {selectedService?.description}
                        </p>
                    </div>

                    {/* Form: same structure, text sized down */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                        <label className="block text-xs font-semibold text-gray-900 mb-1">
                            PROJECT DESCRIPTION *
                        </label>
                        <textarea
                            rows={4}
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            placeholder="Briefly describe your project needs and goals"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none placeholder-gray-400"
                            required
                        />
                        </div>

                        <div>
                        <label className="block text-xs font-semibold text-gray-900 mb-1">
                            COMPLETION DEADLINE *
                        </label>
                        <select
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                            required
                        >
                            <option value="">Specify Completion Deadline</option>
                            <option value="1-week">1 Week</option>
                            <option value="2-weeks">2 Weeks</option>
                            <option value="1-month">1 Month</option>
                            <option value="2-months">2 Months</option>
                            <option value="3-months">3 Months</option>
                            <option value="6-months">6 Months</option>
                            <option value="flexible">Flexible</option>
                        </select>
                        </div>

                        <div>
                        <label className="block text-xs font-semibold text-gray-900 mb-1">
                            PROJECT BUDGET *
                        </label>
                        <input
                            type="text"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="E.g. 1,200 USD"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
                            required
                        />
                        </div>

                        <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg font-medium text-base hover:bg-gray-800 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                        Get Started
                        </button>
                    </form>
                    </div>
                </div>
            </div>
            
            <div className="mx-auto mt-[3rem]">
                <h1 className='text-3xl'>People also search for...</h1>
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
                </div>
            
                {/* Hide scrollbar */}
                <style jsx>{`
                    #categories-container::-webkit-scrollbar {
                    display: none;
                    }
                `}</style>
            </div>

        <Footer />
    </div>
  );
};

export default Service;