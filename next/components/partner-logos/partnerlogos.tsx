import React from 'react'
import { getValidatedPartnerLogos } from '@/lib/drupal/get-partner-logos';
import Link from 'next/link';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/drupal/absolute-url';
import { getCommonPageProps } from '@/lib/get-common-page-props';
import { getValidatedCleanAboutPage } from '@/lib/drupal/get-about-page';

const PartnerLogos = ({ validatedPartnerLogos, validatedAboutPage }) => {
    // Check if field_logos is an array before mapping over it
    if (Array.isArray(validatedPartnerLogos.field_logos)) {
        const logoElements = validatedPartnerLogos.field_logos.map((logo) => (
            <div key={logo.id} className="p-6 flex items-center justify-center flex-grow-0 flex-shrink-0 flex-basis-1/2 max-w-1/2">
                <Link href={logo.field_link.full_url}>
                    <Image
                        src={absoluteUrl(logo.field_logo.uri.url)}
                        width={100}
                        height={100}
                        alt={logo.field_logo.resourceIdObjMeta.alt}
                        quality={100}
                        className="max-h-[5rem]"

                    />
                </Link>
            </div>
        ));


        return (
            <div>
                <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                    OUR CUSTOMERS
                </p>
                <div className='rounded-2xl bg-primary-100 md:mt-10 mt-5 md:py-10 py-5'>
                    <p className='md:px-9 md:text-sm text-xs leading-loose px-3'>
                        {validatedAboutPage.field_our_partners_descriptions}
                    </p>
                    <div className='flex flex-wrap justify-center'>
                        {logoElements}
                    </div>
                </div>
            </div>
        )
    } else {
        // Handle the case where field_logos is not an array
        return <p>field_logos is not an array.</p>;
    }
}

export async function getStaticProps(context) {
    try {
        const validatedPartnerLogos = await getValidatedPartnerLogos(context);
        const validatedAboutPage = await getValidatedCleanAboutPage(context);

        return {
            props: {
                ...(await getCommonPageProps(context)),
                validatedPartnerLogos: validatedPartnerLogos,
                validatedAboutPage: validatedAboutPage,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                ...(await getCommonPageProps(context)),
                validatedPartnerLogos: { field_logos: [] }, // Provide a default value in case of an error
            },
        };
    }
};


export default PartnerLogos