import React from 'react'
import Image from 'next/image'
import back from '../public/images/Hollowed-Boxes.svg'

const GlassContainer = ( { children } ) => {
    return (
        <>
            <main className='Glass-Container'>
                {children}
            </main>            
        </>
        
    )
}

export default GlassContainer
