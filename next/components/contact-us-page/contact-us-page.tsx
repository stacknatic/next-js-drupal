import React from 'react'
import ContactForm from '../contact-form/contact-form'
import { ContactList } from '../contact-list'
import BranchMap from '../branch-maps/branchmap'
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useTranslation } from "next-i18next";

export default function ContactUsPage({ contactPersons }) {
    const { t } = useTranslation();
    return (
        <>
        <Breadcrumbs
        items={[
          {
            title: t("contact-us"),
          },
        ]}
      />
        
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
        </>
    )
}
