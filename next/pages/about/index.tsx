import React from 'react';
import { getValidatedCustomerLogos } from '@/lib/drupal/get-customer-logos';
import { getValidatedPartnerLogos } from '@/lib/drupal/get-partner-logos';
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
            <div>
                <section className=' bg-stone pb-5 text-white'>
                    <div className='pt-5 pl-10 tracking-wider'>
                        <p className="text-2xl w-1/2 leading-normal">
                            Our mission is to accelerate the development of Web applications
                        </p>
                    </div>
                    <div className='mt-10 w-[60vw] text-md pl-10 leading-loose'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eos consequatur fugit dolorum quia amet sunt, nulla quibusdam ex est reprehenderit labore harum excepturi quis suscipit dolorem autem. Nam illo et sed tempore excepturi iusto eaque quidem doloremque, laborum eum est libero, maxime quia at labore quae quos ipsa laboriosam repudiandae aliquam adipisci nesciunt laudantium ullam! Iste ullam, quibusdam amet sed itaque, odit corporis molestiae distinctio perspiciatis tempore commodi ipsa?
                        </p>
                    </div>
                </section>
                <section>
                    <div className=' mt-[7vh]'>
                        <h1 className='text-2xl text-primary-600 font-bold tracking-[.25em] flex justify-center'>
                            Helsinki
                        </h1>
                        <p className='text-xs flex justify-center font-semibold'>
                            HEADQUARTERS
                        </p>
                    </div>
                    <div className='bg-fog rounded-2xl mt-10 py-10'>
                        <p className='text-center text-md leading-md mb-10 tracking-widest '>OTHER LOCATIONS</p>
                        <div className='flex justify-around'>
                            <div>
                                <h1 className='text-md font-medium tracking-tighter pb-2'>Tallinn</h1>
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Tallinn,Estonia"
                                    width={200}
                                    height={200}
                                >
                                </iframe>
                            </div>
                            <div>
                                <h1 className='text-md font-medium tracking-tighter pb-2'>Madrid</h1>
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Madrid,Spain"
                                    width={200}
                                    height={200}
                                >
                                </iframe>
                            </div>
                            <div>
                                <h1 className='text-md font-medium tracking-tighter pb-2'>Warsaw</h1>
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Poland"
                                    width={200}
                                    height={200}
                                >
                                </iframe>
                            </div>
                        </div>
                    </div>


                    <p className='text-lg pl-12 mt-[10vh] font-semibold'>
                        WUNDER IN NUMBERS
                    </p>
                    <div className='flex bg-tranquil justify-around text-center py-10 mt-9'>
                        <div>
                            <p className='text-[3em] text-primary-600 font-bold'>
                                100+
                            </p>
                            <small className='tracking-widest text-error mt-1'>WUNDERERS</small>
                        </div>
                        <div>
                            <p className='text-[3em] text-primary-600 font-bold'>
                                15
                            </p>
                            <small className='tracking-widest text-error mt-1'>LANGUAGES</small>
                        </div>
                        <div>
                            <p className='text-[3em] text-primary-600 font-bold'>
                                60+
                            </p>
                            <small className='tracking-widest text-error mt-1'>CLIENTS</small>
                        </div>
                        <div>
                            <p className='text-[3em] text-primary-600 font-bold'>
                                7x
                            </p>
                            <small className='tracking-widest text-error mt-1'>GREAT PLACE TO WORK</small>
                        </div>
                        <div>
                            <p className='text-[3em] text-primary-600 font-bold'>
                                2010
                            </p>
                            <small className='tracking-widest text-error mt-1'>FOUNDED IN</small>
                        </div>
                    </div>
                </section>
                <section className='pb-10'>
                    <div className='mt-[10vh]'>
                        <p className='text-lg pl-12 mt-[10vh] font-semibold'>
                            OUR CUSTOMERS
                        </p>
                        <div className='border rounded-2xl bg-green-200 mt-10 py-10'>
                            <p className='px-9'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores labore sequi velit esse quis suscipit cum fugiat, excepturi hic, voluptate quo in facilis cupiditate, sed fuga consectetur minima cumque voluptatem. Sit optio numquam, repellat facilis sint sapiente aliquam inventore. Voluptate! </p>
                            <div className='flex justify-around mt-8 '>
                                {logoElements}
                            </div>
                        </div>
                    </div>
                    <div className='mt-[10vh]'>
                        <p className='text-lg pl-12 mt-[10vh] font-semibold'>
                            OUR PARTNERS
                        </p>
                        <div className='border rounded-2xl bg-blue-200 mt-10 py-10'>
                            <p className='px-9'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores labore sequi velit esse quis suscipit cum fugiat, excepturi hic, voluptate quo in facilis cupiditate, sed fuga consectetur minima cumque voluptatem. Sit optio numquam, repellat facilis sint sapiente aliquam inventore. Voluptate! </p>
                            <div className='flex justify-around mt-8 '>
                                {logoElements}
                            </div>


                        </div>
                    </div>
                </section>
                <article className='pb-[10em]'>
                    <p className='text-lg pl-12 mt-[10vh] font-semibold mb-9'>
                        TESTIMONIALS
                    </p>
                    <div className='flex justify-around gap-x-10 '>
                        <div className='border rounded-lg flex flex-col items-center'>
                            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-[100px] rounded-full mt-5 mb-5' />
                            <p className='px-5 text-center mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, neque natus! Dignissimos vel consequatur aliquid aut deserunt eveniet nobis reiciendis.
                            </p>
                        </div>
                        <div className='border rounded-lg flex flex-col items-center'>
                            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-[100px] rounded-full mt-5 mb-5' />
                            <p className='px-5 text-center mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, neque natus! Dignissimos vel consequatur aliquid aut deserunt eveniet nobis reiciendis.
                            </p>
                        </div>
                        <div className='border rounded-lg flex flex-col items-center'>
                            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-[100px] rounded-full mt-5 mb-5' />
                            <p className='px-5 text-center mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, neque natus! Dignissimos vel consequatur aliquid aut deserunt eveniet nobis reiciendis.
                            </p>
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
