import React from 'react'
import { useTranslation } from "next-i18next";


const ContactFormMap = () => {
    const { t } = useTranslation();

    return (
        <div>
            <p className='text-center text-md leading-md mb-10 tracking-widest '>OUR LOCATIONS</p>
            <div id='default-carousel' className='relative w-full' data-carousel='slide'>
                <div className='relative h-56 overflow-hidden rounded-lg md:h-96'>                        
                            <div className='hidden duration-700 ease-in-out' data-carousel-item>
                                {/* <h1 className='text-md font-medium tracking-tighter pb-2'>Helsinki</h1> */}
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Helsinki,Finland"
                                    width={200}
                                    height={200}
                                    className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                                >
                                </iframe>
                            </div>
                            <div className='hidden duration-700 ease-in-out' data-carousel-item>
                                {/* <h1 className='text-md font-medium tracking-tighter pb-2'>Tallinn</h1> */}
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Tallinn,Estonia"
                                    width={200}
                                    height={200}
                                    className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'

                                >
                                </iframe>
                            </div>
                            <div className='hidden duration-700 ease-in-out' data-carousel-item>
                                {/* <h1 className='text-md font-medium tracking-tighter pb-2'>Madrid</h1> */}
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Madrid,Spain"
                                    width={200}
                                    height={200}
                                    className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'

                                >
                                </iframe>
                            </div>
                            <div className='hidden duration-700 ease-in-out' data-carousel-item>
                                {/* <h1 className='text-md font-medium tracking-tighter pb-2'>Warsaw</h1> */}
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Poland"
                                    width={200}
                                    height={200}
                                    className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'

                                >
                                </iframe>
                            </div>
                            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
    </div>
    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
                        </div>
            </div>
        </div >
    )
}

export default ContactFormMap