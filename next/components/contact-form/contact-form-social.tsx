import React from 'react'
import { ImLocation2 } from 'react-icons/im'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { LiaLinkedinIn } from 'react-icons/lia'
import { FaGithub } from 'react-icons/fa'

const ContactFormSocial = () => {

    return (
        <div>
                <div className='w-full'>
                    <div className='max-w-6xl mx-auto flex-col'>
                        <h2 className='my-10'>Social Links</h2>
                        <div className='mt-10 flex '>
                            <div className='w-1/8 flex flex-col items-center justify-center text-center'>
                                <a href='' className='flex flex-col items-center justify-center text-center'>
                                    <ImLocation2
                                        size={40}
                                    />
                                    {/* <p className='hidden sm:block'>
                                        Helsinki, Finland
                                    </p> */}
                                </a>
                            </div>
                            <div className='w-1/8 flex flex-col items-center justify-center text-center'>
                                <a href='' target='_blank' className='flex flex-col items-center justify-center text-center'>
                                    <FaGithub
                                        size={40}
                                    />
                                    {/* <p className='hidden sm:block'>
                                        Github
                                    </p> */}
                                </a>
                            </div>
                            <div className='w-1/8 flex flex-col items-center justify-center text-center'>
                                <a href='' target='_blank' className='flex flex-col items-center justify-center text-center '>
                                    <LiaLinkedinIn
                                        size={40}
                                    />
                                    {/* <p className='hidden sm:block'>
                                        LinkedIn
                                    </p> */}
                                </a>
                            </div>
                            <div className='w-1/8 flex flex-col items-center justify-center text-center'>
                                <a href='' target='_blank' className='flex flex-col items-center justify-center text-center '>
                                    <AiOutlineWhatsApp
                                        size={40}
                                    />
                                    {/* <p className='hidden sm:block'>
                                        WhatsApp
                                    </p> */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
           
        </div >
    )
}

export default ContactFormSocial