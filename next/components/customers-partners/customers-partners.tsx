import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/drupal/absolute-url';
const CustomersPartners = ({ validatedCustomerLogos, validatedPartnerLogos }) => {
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
                <section className='pb-10'>
                    <div>
                        <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                            OUR CUSTOMERS
                        </p>
                        <div className='md:mt-10 mt-5 md:py-10 py-5'>
                            <div className='md:flex grid grid-cols-2 ss:grid-cols-4 gap-y-2 gap-x-2  md:justify-around md:mt-8 px-5 mt-7'>
                                {logoElements}
                            </div>
                        </div>
                    </div>
                    <div className='mt-[10vh]'>
                        <p className='md:text-lg text-xs md:pl-12 md:mt-[10vh] mt-9 font-semibold text-center md:text-left'>
                            OUR PARTNERS
                        </p>
                        <div className='md:mt-10 mt-5 md:py-10 py-5'>
                            <div className='md:flex grid grid-cols-2 ss:grid-cols-4 gap-y-2 gap-x-2  md:justify-around md:mt-8 px-5 mt-7'>
                                {logoElements}
                            </div>


                        </div>
                    </div>
                </section>
            </div>
        );
    } else {
        // Handle the case where field_logos is not an array
        return <p>field_logos is not an array.</p>;
    }
};

// export async function getStaticProps(context) {
//     try {
//         const validatedCustomerLogos = await getValidatedCustomerLogos(context);
//         const validatedPartnerLogos = await getValidatedPartnerLogos(context);

//         return {
//             props: {
//                 ...(await getCommonPageProps(context)),
//                 validatedCustomerLogos: validatedCustomerLogos,
//                 validatedPartnerLogos: validatedPartnerLogos,
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return {
//             props: {
//                 ...(await getCommonPageProps(context)),
//                 validatedCustomerLogos: { field_logos: [] }, // Provide a default value in case of an error
//                 validatedPartnerLogos: { field_logos: [] }, // Provide a default value in case of an error
//             },
//         };
//     }
// };


export default CustomersPartners;