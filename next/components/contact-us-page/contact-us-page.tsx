import React from 'react'
import ContactForm from '../contact-form/contact-form'
import { ContactList } from '../contact-list'
import BranchMap from '../branch-maps/branchmap'

export default function ContactUsPage({ contactPersons }) {
    return (
        <div className='flex flex-col justify-between'>
            <div className='w-full mx-auto justify-center'>
                <div >
                    <ContactForm />
                </div>
            </div>
            <ContactList contactPersons={contactPersons} />
            <div>
                <BranchMap />
            </div>
        </div>
    )
}
