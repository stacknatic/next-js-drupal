import React from 'react'
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
            alert("Sending message...");
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
            <div className='w-full flex items-center justify-center rounded-xl shadow-inherit '>
                <form className='mb-2 w-[75%] grid gap-6' onSubmit={handleSubmit(onSubmit, onErrors)} >
                    <h1 className='mb-10 text-center pt-4 tracking-wide text-[2.5rem] font-bold my-10 text-primary-800'>Leave us a message</h1>
                    <div className='grid lg:grid-cols-2 md:grid-col-1 gap-4 pb-8 lg:justify-center'>
                        <div className='w-full '>
                            <input
                                type='text'
                                id='name'
                                placeholder='Full Name *'
                                className='w-full p-4 rounded-lg outline-none border border-[1px] border-gray-200 focus:border-primary-200 focus:border-[3px] ring-0 focus:border-gray-300'
                                {...register("name", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className='w-full'>
                            <input
                                type='email'
                                id='email'
                                placeholder='Email Address *'
                                className='w-full p-4 rounded-lg outline-none border border-[1px] border-gray-200 focus:border-primary-200 focus:border-[3px] ring-0 focus:border-gray-300'
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
                            placeholder='Subject *'
                            className='w-full p-4 rounded-lg outline-none border border-[1px] border-gray-200 focus:border-primary-200 focus:border-[3px] ring-0 focus:border-gray-300'
                            {...register("subject", {
                                required: true,
                            })}
                        />
                    </div>
                    <div className='mt-8 mb-10'>
                        <textarea
                            placeholder='Type in your message *'
                            id='message'
                            rows={10}
                            cols={55}
                            className='w-full p-4 rounded-lg outline-none border border-[1px] border-gray-200 focus:border-primary-200 focus:border-[3px] ring-0 focus:border-gray-300'
                            {...register("message", {
                                required: true,
                            })}
                        />
                    </div>
                    <div className='text-center pb-5'>
                        <button className='bg-primary-500 text-white px-[6rem] py-5 rounded-full' type='submit'>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactForm

