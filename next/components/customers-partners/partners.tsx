import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/drupal/absolute-url';
const Partners = ({ validatedPartnerLogos }) => {
    // Mapping for Partner Logos
    const partnerLogoElements = Array.isArray(validatedPartnerLogos.field_logos)
        ? validatedPartnerLogos.field_logos.map((logo) => (
            <div key={logo.id} className="p-6 flex items-center justify-center flex-grow-0 flex-shrink-0 flex-basis-1/2 max-w-1/2">
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
        <div>
            <div className='flex flex-wrap justify-center'>
                {partnerLogoElements}
            </div>
        </div>
    );
};

export default Partners;