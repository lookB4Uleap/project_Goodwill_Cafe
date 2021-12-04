import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faBars, faHome, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../util/firebase'
import { useRouter } from 'next/router'

const Navbar = ({ opt }) => {
    const [user, loading] = useAuthState(auth)
    const router = useRouter()

    useEffect(() => {
        if (opt != null) {
            let links = document.querySelector('.Navbar-Container').querySelectorAll('.Navbar-Links')
            // console.log(links)
            links[opt].className = 'Navbar-Active-Links'
        }
        
        // console.log(user)
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
            {/* <Image src={user?.photoURL} alt="User" /> */}
            <div className='Navbar-Links' data-bs-toggle="tooltip" data-bs-placement="left" title="Home">
                <Link href="/">
                    <div className='Image-Container'>
                        {/* <Image src={home} alt='home' /> */}
                        <FontAwesomeIcon icon={faHome} className='Icon' />
                    </div>
                </Link>
            </div>

            <div className='Navbar-Links' data-bs-toggle="tooltip" data-bs-placement="left" title="Menu">
                <Link href="/menu" >
                    <div className='Image-Container'>
                        {/* <Image src={menu} alt='home' /> */}
                        <FontAwesomeIcon icon={faBars} className='Icon' />
                    </div>
                </Link>
            </div>
            
            {(user) ? 
            <div className='Navbar-Links' title="Logout" 
            onClick={async() => {
                await auth.signOut()
                router.replace("/")
            }} 
            data-bs-toggle="tooltip" data-bs-placement="left" >
                <Link href="/" >
                    <div className='Image-Container'>
                        {/* <Image src={menu} alt='home' /> */}
                        <FontAwesomeIcon icon={faSignOutAlt} className='Icon' />
                    </div>
                </Link>
            </div> :

            <div className='Navbar-Links' title="Login">
                <Link href="/login">
                    <div className='Image-Container'>
                        {/* <Image src={menu} alt='home' /> */}
                        <FontAwesomeIcon icon={faSignInAlt} className='Icon' />
                    </div>
                </Link>
            </div>}

            {(user) ? 
            <div className='Navbar-Links' data-bs-toggle="tooltip" data-bs-placement="left" title="Previous Orders">
                <Link href="/prev_orders" >
                <div className='Image-Container'>
                    <FontAwesomeIcon icon={faArchive} className='Icon' />
                </div>
                </Link>
            </div>: <></>
            }
            
        </div>
        </>
    )
}

export default Navbar
