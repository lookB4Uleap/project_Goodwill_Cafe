import Head from 'next/head'
import Image from 'next/image'
import GlassContainer from '../components/GlassContainer'
import Navbar from '../components/Navbar'
import styles from '../styles/Menu.module.css'
import useSWR from 'swr'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import { auth } from '../util/firebase'

export default function Menu() {
  // const [data, setData] = useState()
  // const [error, setError] = useState()
  const [menu, setMenu] = useState('coffee')
  const router =  useRouter()
  const [user, loading] = useAuthState(auth)
  // const [list, setList] = useState([])

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data ,error } = useSWR(`/api/menu/${menu}`, fetcher)

  const dispMenu = ( menu ) => {
    // setData(data)
    // setError(error)
    setMenu(menu)
    console.log(menu)
  }

  const loadMenuItem = (id) => {
    if (user)
    router.push(`/items/${id}`)
    else
    router.replace('/login')
  }

  return (
    loading ? <div style={{ color: 'white' }}>loading...</div> :
    <>
      <Navbar opt={1} />
      <div className='Empty-Space'></div>
      <GlassContainer>
        <section className={styles.tabSection}>
          <button onClick={() => dispMenu('coffee')}>Coffee</button>
          <button onClick={() => dispMenu('tea')}>Tea</button>
          <button onClick={() => dispMenu('snacks')}>Snacks</button>
          <button onClick={() => dispMenu('drinks')}>Drinks</button>
        </section>
        <article className={styles.menu}>
        {
        (error) ? <div>failed to load</div> :
        (!data) ? <div>loading...</div> :
        (
        data.data.recordset.map(
          record => (
            <div className={styles.list} key={record.id} onClick = {() => loadMenuItem(record.id)}>
              <div className={styles.listItemName}>{record.item_name}</div>
              <div className={styles.listItemPrice}>&#8377;{record.item_price}</div>
            </div>  
          )
        )
        )
        }
        </article> 
      </GlassContainer>
    </>
  )
}
