import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import home from '../public/images/home.png'
import menu from '../public/images/menu.png'
import booking from '../public/images/booking.png'
import orders from '../public/images/orders.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCalendarCheck, faClipboardList, faHome, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../util/firebase'

const Navbar = ({ opt }) => {
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (opt != null) {
            let links = document.querySelector('.Navbar-Container').querySelectorAll('.Navbar-Links')
            // console.log(links)
            links[opt].className = 'Navbar-Active-Links'
        }
        
        // let icons = document.querySelectorAll('.Icon')
        // icons[opt].className = 'Icon-Active' 
        // if (!loading){
        //     console.log(user ? user : "logout")
        // }
    }, [opt])

    if (loading) {
        
    }

    return (
        <>
        <div className='Navbar-Container'>
            <div className='Navbar-Links'>
                <Link href="/">
                    <div className='Image-Container'>
                        {/* <Image src={home} alt='home' /> */}
                        <FontAwesomeIcon icon={faHome} className='Icon' />
                    </div>
                </Link>
            </div>

            <div className='Navbar-Links'>
                <Link href="/menu">
                    <div className='Image-Container'>
                        {/* <Image src={menu} alt='home' /> */}
                        <FontAwesomeIcon icon={faBars} className='Icon' />
                    </div>
                </Link>
            </div>
            {(user) ? 
            <div className='Navbar-Links' onClick={async() => {await auth.signOut()}}>
                <Link href="/">
                    <div className='Image-Container'>
                        {/* <Image src={menu} alt='home' /> */}
                        <FontAwesomeIcon icon={faSignOutAlt} className='Icon' />
                    </div>
                </Link>
            </div> :

            <div className='Navbar-Links'>
                <Link href="/login">
                    <div className='Image-Container'>
                        {/* <Image src={menu} alt='home' /> */}
                        <FontAwesomeIcon icon={faSignInAlt} className='Icon' />
                    </div>
                </Link>
            </div>}
            
        </div>
        </>
    )
}

export default Navbar
