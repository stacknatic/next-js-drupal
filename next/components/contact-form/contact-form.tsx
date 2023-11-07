import React from 'react'
import { ImLocation2 } from 'react-icons/im'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { LiaLinkedinIn } from 'react-icons/lia'
import { FaGithub } from 'react-icons/fa'

const ContactForm = () => {
    return (
        <div>
            <div className='flex justify-center'>
                <div className='md:w-[1200px] sm:block mt-[5%] sm:w-[800px] w-full'>
                    <div className='flex items-center justify-center '>
                        <h1 className='text-xl mb-5'>Contact Form</h1>
                    </div>
                    <div>
                        <div className='sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 grid grid-cols-1 text-ss bg-slate-800'>
                            <div>
                                <form className='sm:p-6 bg-primary-200' >
                                    <h1 className='text-md mb-10 flex justify-center'>Contact Us</h1>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12 '>
                                        <div className=''>
                                            <input
                                                type='text'
                                                name='full_name'
                                                placeholder='Full Name'
                                                className='p-2 rounded-lg'
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type='email'
                                                name='user_email'
                                                placeholder='Email Address'
                                                className='p-2 rounded-lg'
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type='text'
                                            name='subject_name'
                                            placeholder='Subject'
                                            className='p-2 rounded-lg outline-none'
                                        />
                                    </div>
                                    <div className='mt-8 mb-10'>
                                        <label htmlFor="" className='text-lg'>Message</label>
                                        <textarea
                                            placeholder='Type in your message'
                                            name='message'
                                            rows="10"
                                            cols="55"
                                            className='p-2 rounded-lg'
                                        />
                                    </div>
                                    <button className='bg-primary-500 text-white p-3 rounded-lg' type='submit'>Send Message</button>
                                </form>
                            </div>
                            <div className='justify-center items-center hidden sm:block'>
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Helsinki,Finland"
                                    className='md:w-[540px] md:h-[655px]'
                                >
                                </iframe>
                            </div>

                        </div>
                    </div>
                    <div className='mt-10 flex'>
                        <div className='w-1/4 flex flex-col items-center justify-center text-center'>
                            <a href='' className='flex flex-col items-center justify-center text-center '>
                                <ImLocation2
                                    size={40}

                                />
                                <p className='hidden sm:block'>
                                    Helsinki, Finland
                                </p>
                            </a>
                        </div>
                        <div className='w-1/4 flex flex-col items-center justify-center text-center'>
                            <a href='' target='_blank' className='flex flex-col items-center justify-center text-center '>
                                <FaGithub
                                    size={40}
                                />
                                <p className='hidden sm:block'>
                                    Github
                                </p>
                            </a>
                        </div>
                        <div className='w-1/4 flex flex-col items-center justify-center text-center'>
                            <a href='' target='_blank' className='flex flex-col items-center justify-center text-center '>
                                <LiaLinkedinIn
                                    size={40}
                                />
                                <p className='hidden sm:block'>
                                    LinkedIn
                                </p>
                            </a>
                        </div>
                        <div className='w-1/4 flex flex-col items-center justify-center text-center'>
                            <a href='' target='_blank' className='flex flex-col items-center justify-center text-center '>
                                <AiOutlineWhatsApp
                                    size={40}
                                />
                                <p className='hidden sm:block'>
                                    WhatsApp
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ContactForm