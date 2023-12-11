import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/drupal/absolute-url';
const Customers = ({ validatedCustomerLogos }) => {
    // Mapping for Customer Logos
    const customerLogoElements = Array.isArray(validatedCustomerLogos.field_logos) 
        ? validatedCustomerLogos.field_logos.map((logo) => (
            <div key={logo.id}>
                <Link href={logo.field_link.full_url}>
                    <Image
                        src={absoluteUrl(logo.field_logo.uri.url)}
                        width={200}
                        height={100}
                        alt={logo.field_logo.resourceIdObjMeta.alt}
                    />
                </Link>
            </div>
        ))
        : null;

    // Check if either logos array is not an array
    if (!customerLogoElements) {
        return <p>field_logos is not an array.</p>;
    }
        return (
            <div className=''>
                <section className='pb-10'>
                    <div>
                        <p className='text-heading-sm font-bold md:text-heading-md my-10'>
                            Our customers
                        </p>
                        <div className='md:mt-10 mt-5 md:py-10 py-5'>
                            <div className='md:flex items-center grid grid-cols-2 ss:grid-cols-4 gap-y-2 gap-x-8  md:justify-around px-5 bg-white rounded-full border grayscale'>
                                {customerLogoElements}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
};

export default Customers;