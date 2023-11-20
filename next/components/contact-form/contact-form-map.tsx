import React from 'react'
import { useTranslation } from "next-i18next";


const ContactFormMap = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className='w-full'>
                <div className='grid-cols-1 text-ss bg-slate-800'>
                    <div className='justify-center items-center hidden sm:block'>
                        <iframe
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Helsinki,Finland"
                            className='w-full h-96'
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ContactFormMap