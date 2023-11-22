'use client'
import React, { useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
const BranchMap = () => {
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {

            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');
            //init a marker
            const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

            const positions = [
                {
                    lat: 60.1656498,
                    lng: 24.9330231
                },
                {
                    lat: 60.4504628,
                    lng: 22.2640738
                },
                {
                    lat: 59.4200831,
                    lng: 24.8022112
                },
                {
                    lat: 56.950632,
                    lng: 24.1082947
                },
                {
                    lat: 57.5297604,
                    lng: 25.4035486
                },

            ]


            const mapOptions: google.maps.MapOptions = {
                //main marker for headqaurters
                center: positions[0],
                zoom: 6,
                mapId: 'Wunder_Branch_Offices'
            }

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            //other markers for other positions
            positions.map(position => {
                new Marker({
                    map: map,
                    position: position
                })
            })
            // const marker = new Marker({
            //     map: map,
            //     position: position
            // })
        }

        initMap()
    }, [])

    return (
        <div className='w-[100em] h-[40em]' ref={mapRef} />

    )
}

export default BranchMap