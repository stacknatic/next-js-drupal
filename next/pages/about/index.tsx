import React from 'react';
import { getValidatedCustomerLogos } from '@/lib/drupal/get-customer-logos';
import { getValidatedPartnerLogos } from '@/lib/drupal/get-partner-logos';
import { getValidatedCleanAboutPage } from '@/lib/drupal/get-about-page';
import { getCommonPageProps } from '@/lib/get-common-page-props';
import Image from 'next/image';
import Customers from "@/components/customers-partners/customers";
import Partners from "@/components/customers-partners/partners";
import { absoluteUrl } from '@/lib/drupal/absolute-url';
import CountUp from 'react-countup'
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useTranslation } from "next-i18next";

const Page = ({ validatedCustomerLogos, validatedPartnerLogos, validatedAboutPage }) => {
    const { t } = useTranslation();
    return (
        <>
            <Breadcrumbs
                items={[
                {
                    title: t("about"),
                },
                 ]}
            />
            <section>
                <div className='md:py-16 py-8 pt-2 tracking-wider'>
                    <p className="text-heading-lg md:text-heading-xl text-primary-800 font-bold text-center md:text-left py-8 md:py-16">
                        {validatedAboutPage.field_mission_description}
                    </h2>
                </div>
                <div className='px-8 md:px-16 md:mx-auto md:text-md text-xs leading-loose'>
                    <p>
                        {validatedAboutPage.field_mission_statement}
                    </p>
                </div>
            </section>
            <section>
                <p className='text-sm md:mt-[10vh] mt-9 text-center md:text-left tracking-widest'>
                    WUNDER IN NUMBERS
                </p>
                <div className='overflow-hidden mt-4 md:py-10 md:mt-9'>
                    <div className='flex justify-around text-center space-x-6 '>
                        {validatedAboutPage.field_wunder_numers && Array.isArray(validatedAboutPage.field_wunder_numers) ?
                            validatedAboutPage.field_wunder_numers.map((number) => (
                                <div key={number.id}>
                                    <p className='sm:text-[3em] text-primary-600 font-bold text-lg'>
                                        {/* {number.field_number} */}
                                        <CountUp start={0} end={number.field_number} enableScrollSpy scrollSpyDelay={500} separator="" />
                                        {number.field_topic === 'clients' && <span>&nbsp;X</span>}
                                        {number.field_topic === 'wunderers' && <span>&nbsp;+</span>}
                                    </p>
                                    <p className='md:tracking-widest uppercase tracking-tighter text-error md:text-xs text-[8px] md:mt-1'>
                                        {number.field_topic}
                                    </p>
                                </div>
                            )) :
                            // Handle the case where field_wunder_numers is not an array or undefined
                            <p>No data available for WUNDER IN NUMBERS.</p>
                        }
                    </div>
                </div>

            </section>
            <section className='md:mx-auto pb-10'>
                <p className='text-sm md:mt-[10vh] mt-9 tracking-widest text-center md:text-left uppercase'>
                    Our Customers
                </h2>
                <div className='rounded-2xl md:mt-10 py-2'>
                    <p className='px-8 md:px-16 md:text-sm md:mb-[6em] text-xs leading-loose'>
                        {validatedAboutPage.field_our_customers_description}
                    </p>
                    <Customers validatedCustomerLogos={validatedCustomerLogos} />
                </div>
            </section>
            <section className=' md:mx-auto pb-10'>
                <p className='text-sm md:mt-[10vh] mt-9 tracking-widest text-center md:text-left uppercase'>
                    Our Partners
                </h2>
                <div className='rounded-2xl md:mt-10 py-2'>
                    <p className='px-8 md:px-16 md:text-sm md:mb-[6em] text-xs leading-loose'>
                        {validatedAboutPage.field_our_partners_descriptions}
                    </p>
                    <Partners validatedPartnerLogos={validatedPartnerLogos} />
                </div>
            </section>
            <article className='md:mx-auto pb-[10em]'>
                <div className=''>
                    <p className='text-sm pb-5 md:mt-[10vh] mt-2 tracking-widest uppercase text-center md:text-left'>
                        Testimonials
                    </p>
                    <div className='px-8 md:px-16 md:flex grid ss:grid-cols-3 gap-x-5 md:justify-around md:gap-x-10 mt-5 gap-y-5 '>
                        {validatedAboutPage.field_testimonials.length > 0 && Array.isArray(validatedAboutPage.field_testimonials) ? validatedAboutPage.field_testimonials.map((testimonial) => (
                            <div key={testimonial.id} className='bg-finnishwinter rounded-lg flex flex-col items-center pb-4'>
                                <Image
                                    src={absoluteUrl(testimonial.field_testi_image.uri.url)}
                                    alt={testimonial.field_testi_image.resourceIdObjMeta.alt}
                                    width={90}
                                    height={100}
                                    className="md:w-[100px] md:h-[100px] w-[90px] h-[90px] rounded-full md:mt-5 md:mb-5 mt-2 mb-2"
                                />
                                <p className='px-8 md:px-16 md:text-sm text-xs leading-loose text-center'>
                                    {testimonial.field_testimony}
                                </p>

                            </div>
                        )) :
                            <p>No data available for TESTIMONIALS.</p>}
                    </div>

                </div>
            </article>
        </>
    );
}

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
    console.error("Error fetching data:", error);
    return {
      props: {
        ...(await getCommonPageProps(context)),
        validatedCustomerLogos: { field_logos: [] }, // Provide a default value in case of an error
        validatedPartnerLogos: { field_logos: [] }, // Provide a default value in case of an error
      },
    };
  }
}

export default Page;
