import React from 'react'

const OfficeMap = () => {
    return (
        <>
            <div>
                <h1 className='text-md font-medium tracking-tighter pb-2'>Tallinn</h1>
                <iframe
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Tallinn,Estonia"
                    width={200}
                    height={200}
                    className="hidden md:block"
                >
                </iframe>
            </div>
            <div>
                <h1 className='text-md font-medium tracking-tighter pb-2'>Madrid</h1>
                <iframe
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Madrid,Spain"
                    width={200}
                    height={200}
                    className="hidden md:block"
                >
                </iframe>
            </div>
            <div>
                <h1 className='text-md font-medium tracking-tighter pb-2'>Warsaw</h1>
                <iframe
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Poland"
                    width={200}
                    height={200}
                    className="hidden md:block"
                >
                </iframe>
            </div>
        </>
    )
}

export default OfficeMap