import React from 'react'
import ContactForm from '../contact-form/contact-form'
import ContactUsPageMap from '../contact-form/contact-form-map'
import ContactFormSocial from '../contact-form/contact-form-social'

export default function ContactUsPage() {
  return (
    <div className='flex justify-between'>
        <div className='w-6/12 mx-40'>
            <ContactForm />
        </div>
        <div className='w-4/12 mx-16'>
            <ContactFormSocial />
            <ContactUsPageMap />
        </div>
        </div>
  )
}
