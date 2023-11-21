import React from 'react'
import ContactForm from '../contact-form/contact-form'
import ContactFormSocial from '../contact-form/contact-form-social'
import MapsCarousel from '../contact-form/carousel'

export default function ContactUsPage() {
  return (
    <div className='flex flex-col justify-between lg:flex-row'>
        <div className='lg:w-6/12 mx-auto lg:mx-40 justify-center'>
            <ContactForm />
        </div>
        <div className='w-4/12 mx-16'>
            <ContactFormSocial />
            <MapsCarousel />
        </div>
        </div>
  )
}
