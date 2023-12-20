'use client'
import React, { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const BranchMap = () => {
    const mapRef = React.useRef<HTMLDivElement>(null);
    const [activeOffice, setActiveOffice] = useState(0);

    const offices = [
        { lat: 60.1656498, lng: 24.9330231, name: 'Helsinki', address: 'Kalevankatu 30', postal: '00100 Helsinki', country: 'Finland', email: 'fi.sales@wunder.io' },
        { lat: 60.4504628, lng: 22.2640738, name: 'Turku', address: 'Aurakatu 8', postal: '20100 Turku', country: 'Finland', email: 'fi.sales@wunder.io' },
        { lat: 59.4200831, lng: 24.8022112, name: 'Tallinn', address: 'Valukoja 8', postal: '11415 Tallinn', country: 'Estonia', email: 'ee.sales@wunder.io' },
        { lat: 56.950632, lng: 24.1082947, name: 'Riga', address: 'Z.A. Meierovica bulvāris 16', postal: 'Riga, LV-1050', country: 'Latvia', email: 'lv.sales@wunder.io' },
        { lat: 57.5297604, lng: 25.4035486, name: 'Valmiera', address: 'L.Paegles iela 47', postal: 'Valmiera, LV-4201', country: 'Latvia', email: 'lv.sales@wunder.io' },
    ];

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');
            const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

            const mapOptions: google.maps.MapOptions = {
                center: offices[activeOffice],
                zoom: 6,
                mapId: 'Wunder_Branch_Offices'
            }

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            offices.forEach((position, index) => {
                new Marker({
                    map: map,
                    position: position,
                    // label: (index + 1).toString(), // Use numbers as labels
                    icon: {
                        url: index === activeOffice
                            ? 'https://maps.google.com/mapfiles/ms/icons/pink-pushpin.png' // Active office marker icon
                            : 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', // Inactive office marker icon
                    },
                    zIndex: index === activeOffice ? 1 : 0,
                });
            });
        }

        initMap();
    }, [activeOffice]);

    const handleOfficeClick = (index: number) => {
        setActiveOffice(index);
    }

    return (
        <div className='w-full mt-5'>
            <div className="flex justify-around mt-10">
                {offices.map((location, index) => (
                    <h3 key={index} onClick={() => handleOfficeClick(index)} className={`cursor-pointer ${index === activeOffice ? 'text-primary-700 tracking-wider underline' : 'text-gray-500 tracking-wider'}`}>
                        {location.name}
                    </h3>
                ))}
            </div>
            <div className='w-full h-[30em] my-5  ' ref={mapRef} />
            <div>
                <div className='sm:grid sm:grid-cols-3 sm:gap-4 mt-10 grid-cols-1' >
                    {offices.map((address, index) => (
                        <div key={index} className="mb-5 leading-10">
                            <h3 className='text-lg font-bold pb-2'>{address.name}</h3>
                            <h4>{address.address}</h4>
                            <p>{address.postal}</p>
                            <p>{address.country}</p>
                            <p><a href="mailto:{address.email}" className='underline text-primary-500'>{address.email}</a></p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default BranchMap;


