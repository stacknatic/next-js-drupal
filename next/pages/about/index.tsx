import React from 'react';
import { getValidatedCustomerLogos } from '@/lib/drupal/get-customer-logos';
import { getValidatedPartnerLogos } from '@/lib/drupal/get-partner-logos';
import OfficeMap from '@/components/offices-map/offices-map';
import { getCommonPageProps } from '@/lib/get-common-page-props';
import Link from 'next/link';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/drupal/absolute-url';
const Page = ({ validatedCustomerLogos, validatedPartnerLogos }) => {
    // console.log(validatedCustomerLogos)
    console.log("partners", validatedPartnerLogos)


    // Check if field_logos is an array before mapping over it
    if (Array.isArray(validatedCustomerLogos.field_logos)) {
        const logoElements = validatedCustomerLogos.field_logos.map((logo) => (
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
        ));
        {

        }
        return (
            <div className=''>
                <section className=' bg-stone md:pb-5 pb-2 text-white'>
                    <div className='md:pt-5 pt-2 md:pl-10 pl-2 tracking-wider'>
                        <p className="md:text-2xl text-md md:w-1/2 leading-normal">
                            Our mission is to accelerate the development of Web applications
                        </p>
                    </div>
                    <div className='md:mt-10 md:w-[60vw] md:text-md text-xs px-3 mt-5 md:pl-10 leading-loose'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eos consequatur fugit dolorum quia amet sunt, nulla quibusdam ex est reprehenderit labore harum excepturi quis suscipit dolorem autem. Nam illo et sed tempore excepturi iusto eaque quidem doloremque, laborum eum est libero, maxime quia at labore quae quos ipsa laboriosam repudiandae aliquam adipisci nesciunt laudantium ullam! Iste ullam, quibusdam amet sed itaque, odit corporis molestiae distinctio perspiciatis tempore commodi ipsa?
                        </p>
                    </div>
                </section>
                <section>
                    <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                        WUNDER IN NUMBERS
                    </p>
                    <div className='bg-tranquil overflow-hidden mt-4 md:py-10 md:mt-9'>
                        <div className='flex justify-around text-center  animate-marquee animate-marquee space-x-6 '>
                            <div className=''>
                                <p className='md:text-[3em] text-primary-600 font-bold text-xl'>
                                    100+
                                </p>
                                <p className='md:tracking-widest tracking-tighter text-error md:text-xs text-[8px] md:mt-1'>WUNDERERS</p>
                            </div>
                            <div className=''>
                                <p className='md:text-[3em] text-primary-600 font-bold text-xl'>
                                    15
                                </p>
                                <p className='md:tracking-widest tracking-tighter text-error md:text-xs text-[8px] md:mt-1'>LANGUAGES</p>
                            </div>
                            <div className=''>
                                <p className='md:text-[3em] text-primary-600 font-bold text-xl'>
                                    60+
                                </p>
                                <p className='md:tracking-widest tracking-tighter text-error md:text-xs text-[8px] md:mt-1'>CLIENTS</p>
                            </div>
                            <div className=''>
                                <p className='md:text-[3em] text-primary-600 font-bold text-xl'>
                                    7x
                                </p>
                                <p className='md:tracking-widest tracking-tighter text-error md:text-xs text-[8px] md:mt-1'>GREAT PLACE TO WORK</p>
                            </div>
                            <div className=''>
                                <p className='md:text-[3em] text-primary-600 font-bold text-xl'>
                                    2010
                                </p>
                                <p className='md:tracking-widest tracking-tighter text-error md:text-xs text-[8px] md:mt-1'>FOUNDED IN</p>
                            </div>
                        </div>
                    </div>

                </section>
                <section className='pb-10'>
                    <div>
                        <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                            OUR CUSTOMERS
                        </p>
                        <div className='rounded-2xl bg-primary-100 md:mt-10 mt-5 md:py-10 py-5'>
                            <p className='md:px-9 md:text-sm text-xs leading-loose px-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores labore sequi velit esse quis suscipit cum fugiat, excepturi hic, voluptate quo in facilis cupiditate, sed fuga consectetur minima cumque voluptatem. Sit optio numquam, repellat facilis sint sapiente aliquam inventore. Voluptate! </p>
                            <div className='md:flex grid grid-cols-2 ss:grid-cols-4 gap-y-2 gap-x-2  md:justify-around md:mt-8 px-5 mt-7'>
                                {logoElements}
                            </div>
                        </div>
                    </div>
                    <div className='mt-[10vh]'>
                        <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                            OUR PARTNERS
                        </p>
                        <div className='rounded-2xl bg-primary-100 md:mt-10 mt-5 md:py-10 py-5'>
                            <p className='md:px-9 md:text-sm text-xs leading-loose px-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores labore sequi velit esse quis suscipit cum fugiat, excepturi hic, voluptate quo in facilis cupiditate, sed fuga consectetur minima cumque voluptatem. Sit optio numquam, repellat facilis sint sapiente aliquam inventore. Voluptate! </p>
                            <div className='md:flex grid grid-cols-2 ss:grid-cols-4 gap-y-2 gap-x-2  md:justify-around md:mt-8 px-5 mt-7'>
                                {logoElements}
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
                            <div className='bg-finnishwinter rounded-lg flex flex-col items-center pb-4'>
                                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='md:w-[100px] md:h-[100px] w-[90px] h-[90px] rounded-full md:mt-5 md:mb-5 mt-2 mb-2' />
                                <p className='md:px-9 md:text-sm text-xs leading-loose px-3 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, neque natus! Dignissimos vel consequatur aliquid aut deserunt eveniet nobis reiciendis.
                                </p>
                            </div>
                            <div className='bg-finnishwinter rounded-lg flex flex-col items-center'>
                                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='md:w-[100px] md:h-[100px] w-[90px] h-[90px] rounded-full md:mt-5 md:mb-5 mt-2 mb-2' />
                                <p className='md:px-9 md:text-sm text-xs leading-loose px-3 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, neque natus! Dignissimos vel consequatur aliquid aut deserunt eveniet nobis reiciendis.
                                </p>
                            </div>
                            <div className='bg-finnishwinter rounded-lg flex flex-col items-center'>
                                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='md:w-[100px] md:h-[100px] w-[90px] h-[90px] rounded-full md:mt-5 md:mb-5 mt-2 mb-2' />
                                <p className='md:px-9 md:text-sm text-xs leading-loose px-3 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, neque natus! Dignissimos vel consequatur aliquid aut deserunt eveniet nobis reiciendis.
                                </p>
                            </div>
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

        return {
            props: {
                ...(await getCommonPageProps(context)),
                validatedCustomerLogos: validatedCustomerLogos,
                validatedPartnerLogos: validatedPartnerLogos,
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
