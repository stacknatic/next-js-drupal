import React from 'react';
import { getValidatedCustomerLogos } from '@/lib/drupal/get-customer-logos';
import { getValidatedPartnerLogos } from '@/lib/drupal/get-partner-logos';
import { getValidatedCleanAboutPage } from '@/lib/drupal/get-about-page';
import { getCommonPageProps } from '@/lib/get-common-page-props';
import Link from 'next/link';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/drupal/absolute-url';
const Page = ({ validatedCustomerLogos, validatedPartnerLogos, validatedAboutPage }) => {
    // Check if field_logos is an array before mapping over it
    if (Array.isArray(validatedCustomerLogos.field_logos)) {
        const logoElements = validatedCustomerLogos.field_logos.map((logo) => (
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
        ));

        const partnerLogoElements = validatedPartnerLogos.field_logos.map((logo) => (
            // Adjust this code based on your requirements for partner logos
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
        ));
        return (
            <div className=''>
                <section className=' bg-primary-400 md:pb-5 pb-2 text-white'>
                    <div className='md:pt-5 pt-2 md:pl-10 pl-2 tracking-wider'>
                        <p className="md:text-2xl text-md md:w-1/2 leading-normal capitalize">
                            {validatedAboutPage.field_mission_description}
                        </p>
                    </div>
                    <div className='md:mt-10 md:w-[60vw] md:text-md text-xs px-3 mt-5 md:pl-10 leading-loose'>
                        <p>
                            {validatedAboutPage.field_mission_statement}
                        </p>
                    </div>
                </section>
                <section>
                    <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                        WUNDER IN NUMBERS
                    </p>
                    <div className='bg-tranquil overflow-hidden mt-4 md:py-10 md:mt-9'>
                        <div className='flex justify-around text-center  animate-marquee animate-marquee space-x-6 '>
                            {validatedAboutPage.field_wunder_numers && Array.isArray(validatedAboutPage.field_wunder_numers) ?
                                validatedAboutPage.field_wunder_numers.map((number) => (
                                    <div key={number.id}>
                                        <p className='md:text-[3em] text-primary-600 font-bold text-xl'>
                                            {number.field_topic}
                                        </p>
                                        <p className='md:tracking-widest uppercase tracking-tighter text-error md:text-xs text-[8px] md:mt-1'>
                                            {number.field_number}
                                        </p>
                                    </div>
                                )) :
                                // Handle the case where field_wunder_numers is not an array or undefined
                                <p>No data available for WUNDER IN NUMBERS.</p>
                            }
                        </div>
                    </div>

                </section>
                <section className='pb-10'>
                    <div>
                        <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                            OUR CUSTOMERS
                        </p>
                        <div className='rounded-2xl md:mt-10 mt-5 md:py-10 py-5'>
                            <p className='md:px-9 md:text-sm text-xs leading-loose px-3'>
                                {validatedAboutPage.field_our_customers_description}
                            </p>
                            <div className='flex flex-wrap justify-center'>
                                {logoElements}
                            </div>
                        </div>
                    </div>
                    <div className='mt-[10vh]'>
                        <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                            OUR PARTNERS
                        </p>
                        <div className='rounded-2xl md:mt-10 mt-5 md:py-10 py-5'>
                            <p className='md:px-9 md:text-sm text-xs leading-loose px-3'>
                                {validatedAboutPage.field_our_partners_descriptions}
                            </p>
                            <div className='flex flex-wrap justify-center'>
                                {partnerLogoElements}
                            </div>
                        </div>
                    </div>
                </section>
                <article className='pb-[10em]'>
                    <div className=''>
                        <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-2 font-semibold text-center md:text-left'>
                            TESTIMONIALS
                        </p>
                        <div className='md:flex grid ss:grid-cols-3 gap-x-5 md:justify-around md:gap-x-10 mt-5 gap-y-5 '>
                            {validatedAboutPage.field_testimonials.length > 0 && Array.isArray(validatedAboutPage.field_testimonials) ? validatedAboutPage.field_testimonials.map((testimonial) => (
                                <div key={testimonial.id} className='bg-finnishwinter rounded-lg flex flex-col items-center pb-4'>
                                    <Image
                                        src={absoluteUrl(testimonial.field_testi_image.uri.url)}
                                        alt={testimonial.field_testi_image.resourceIdObjMeta.alt}
                                        width={90}
                                        height={100}
                                        className="md:w-[100px] md:h-[100px] w-[90px] h-[90px] rounded-full md:mt-5 md:mb-5 mt-2 mb-2"
                                    />
                                    <p className='md:px-9 md:text-sm text-xs leading-loose px-3 text-center'>
                                        {testimonial.field_testimony}
                                    </p>

                                </div>
                            )) :
                                <p>No data available for TESTIMONIALS.</p>}
                        </div>

                    </div>
                </article>
            </div>
        );
    } else {
        // Handle the case where field_logos is not an array
        return <p>field_logos is not an array.</p>;
    }
};

export async function getStaticProps(context) {
    try {
        const validatedCustomerLogos = await getValidatedCustomerLogos(context);
        const validatedPartnerLogos = await getValidatedPartnerLogos(context);
        const validatedAboutPage = await getValidatedCleanAboutPage(context);


        return {
            props: {
                ...(await getCommonPageProps(context)),
                validatedCustomerLogos: validatedCustomerLogos,
                validatedPartnerLogos: validatedPartnerLogos,
                validatedAboutPage: validatedAboutPage,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                ...(await getCommonPageProps(context)),
                validatedCustomerLogos: { field_logos: [] }, // Provide a default value in case of an error
                validatedPartnerLogos: { field_logos: [] }, // Provide a default value in case of an error
            },
        };
    }
};


export default Page;