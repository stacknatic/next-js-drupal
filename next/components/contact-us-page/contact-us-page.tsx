import React from 'react'
import ContactForm from '../contact-form/contact-form'
import ContactFormSocial from '../contact-form/contact-form-social'
import MapsCarousel from '../contact-form/carousel-maps'
import { ContactList } from '../contact-list'

export default function ContactUsPage() {
  return (
        <div className='flex flex-col justify-between'>
            <div className='lg:w-6/12 mx-auto lg:mx-40 justify-center'>
                <div >
                    <ContactForm />
                </div>
                <div>
                    <ContactFormSocial />
                    <MapsCarousel />
                </div>
            </div>
            <div>
                <ContactList />
            </div>
        </div>
  )
}
