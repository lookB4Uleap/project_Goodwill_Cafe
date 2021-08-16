import { faCoffee, faHamburger, faWineGlassAlt } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import Image from 'next/image'
import Carousel from '../components/Carousel'
import GlassContainer from '../components/GlassContainer'
import MainContainer from '../components/MainContainer'
import MediaCard from '../components/MediaCard'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import { auth } from '../util/firebase'
import { useEffect } from 'react'

export default function Home({ special, cust }) {
  const [user, loading] = useAuthState(auth)

  // useEffect(() => {
  //   console.log(user) 
  // }, [user])

  // console.log()
  return (
    loading ? <div style={{ color: 'white' }}>loading...</div> :
    <>
    <Navbar opt={0} />
    <div className='Empty-Space'></div>
    <GlassContainer>
        <div className={styles.header}>Goodwill Cafe</div>
        <div className={styles.greeting}>Welcome</div>
        <div className={styles.cardWrapper}>
          <MediaCard title="Today's Special" subtitle={special.data.recordset[0].item_name} icon={faCoffee} color='brown' />
          <MediaCard title="Customer's Choice" subtitle={cust.data.recordset[0].item_name} icon={faCoffee} color='whitesmoke' />
        </div>
        <div className={styles.cardWrapper}>
          <MediaCard title="Try a snack" icon={faHamburger} color='green' />
          <MediaCard title="Special Offers" icon={faWineGlassAlt} color='red' />
        </div>
    </GlassContainer>
    </>
  ) 
}

export async function getStaticProps() {
  const res1 = await fetch('http://localhost:3000/api/2')
  const res2 = await fetch('http://localhost:3000/api/4')
  const special = await res1.json()
  const cust = await res2.json()
  return {
    props: {
      special,
      cust
    }
  }
}