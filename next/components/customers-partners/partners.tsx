import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/drupal/absolute-url';
const Partners = ({ validatedPartnerLogos }) => {
    // Mapping for Partner Logos
    const partnerLogoElements = Array.isArray(validatedPartnerLogos.field_logos) 
        ? validatedPartnerLogos.field_logos.map((logo) => (
            <div key={logo.id}>
                <Link href={logo.field_link.full_url}>
                    <Image
                        src={absoluteUrl(logo.field_logo.uri.url)}
                        width={100}
                        height={100}
                        alt={logo.field_logo.resourceIdObjMeta.alt}
                    />
                </Link>
            </div>
        ))
        : null;
    // Check if either logos array is not an array
    if (!partnerLogoElements) {
        return <p>field_logos is not an array.</p>;
    }
        return (
            <div className=''>
                <section className='pb-10'>
                    <div className='mt-[10vh]'>
                        <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                            OUR PARTNERS
                        </p>
                        <div className='md:mt-10 mt-5 md:py-10 py-5'>
                            <div className='md:flex grid grid-cols-2 ss:grid-cols-4 gap-y-2 gap-x-2  md:justify-around md:mt-8 px-5 mt-7'>
                                {partnerLogoElements}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
};

export default Partners;