import React from 'react'
import { ImLocation2 } from 'react-icons/im'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { LiaLinkedinIn } from 'react-icons/lia'
import { FaGithub } from 'react-icons/fa'
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";


import { StatusMessage } from "@/ui/status-message";


type Inputs = {
    name: string;
    email: string;
    subject: string;
    message: string;
};


const ContactForm = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm<Inputs>();

    const onSubmit = async (data: Inputs) => {
        const response = await fetch(`/api/contact`, {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message,
                subject: data.subject,
            }),
            // This will record the submission with the right language:
            headers: {
                "accept-language": router.locale,
            },
        });

        if (!response.ok) {
            alert("Error!");
        }
    };

    const onErrors = (errors) => console.error(errors);

    if (isSubmitSuccessful) {
        return (
            <StatusMessage level="success" className="mx-auto w-full max-w-3xl">
                <p className="mb-4">{t("form-thank-you-message")}</p>
                <button type="button" onClick={() => reset()}>
                    {t("form-send-another-message")}
                </button>
            </StatusMessage>
        );
    }

    return (
        <div>
                <div className='w-full'>
                    <div className='max-w-6xl mx-auto flex-col'>
                        <h1 className='text-xl mb-5'>Contact Form</h1>
                        <p className='mb-5 max-w-md'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum explicabo, sed eius dicta quod neque? Ratione porro rerum illo. Aperiam ex dolor soluta repellendus eligendi!
                        </p>
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
                    <div>
                        <div className='grid-cols-1 text-ss bg-slate-800'>
                            <div className=''>
                                <form className='max-w-6xl mx-auto my-10' onSubmit={handleSubmit(onSubmit, onErrors)} >
                                    <h1 className='text-md mb-10 flex justify-center'>Get In Touch</h1>
                                    <div className='grid grid-cols-2 gap-4 pb-8 '>
                                        <div className='w-full'>
                                            <input
                                                type='text'
                                                id='name'
                                                placeholder='Full Name'
                                                className='w-full p-2 rounded-lg'
                                                {...register("name", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <input
                                                type='email'
                                                id='email'
                                                placeholder='Email Address'
                                                className='w-full p-2 rounded-lg'
                                                {...register("email", {
                                                    required: true,
                                                })}
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type='text'
                                            id='subject'
                                            placeholder='Subject'
                                            className='w-full p-2 rounded-lg outline-none'
                                            {...register("subject", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                    <div className='mt-8 mb-10'>
                                        <textarea
                                            placeholder='Type in your message'
                                            id='message'
                                            rows={10}
                                            cols={55}
                                            className='w-full p-2 rounded-lg'
                                            {...register("message", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                    <div className='text-right'>
                                    <button className='bg-primary-500 text-white p-3 rounded-lg' type='submit'>Send Message</button>
                                    </div>
                                </form>
                            </div>
                            <div className='justify-center items-center hidden sm:block'>
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Helsinki,Finland"
                                    className='w-full h-96'
                                >
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
           
        </div >
    )
}

export default ContactForm