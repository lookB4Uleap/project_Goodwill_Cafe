import { faCoffee, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import GlassContainer from '../../components/GlassContainer'
import Navbar from '../../components/Navbar'
import styles from '../../styles/Item.module.css'
import { auth } from '../../util/firebase'
import { useRouter } from 'next/router'

const Item = ({ item }) => {
    const [user, loading] = useAuthState(auth)
    const router =  useRouter()
    const [orderSize, setOrderSize] = useState(1)

    const placeOrder = async() => {
      // console.log(user)
      // console.log(item)

      if (!user)
      router.replace('/login')

      const userDetails = {
        userId: user.uid,
        username: user.displayName,
        userEmail: user.email
      }
      const orderDetails = {
        itemId: item.data.recordset[0].id,
        itemName: item.data.recordset[0].item_name,
        itemPrice: item.data.recordset[0].item_price,
        orderSize: orderSize
      }
      const res = await fetch(
        '/api/order',
        {
          body: JSON.stringify({
            user: userDetails,
            order: orderDetails
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      )
      router.replace("/menu")
    }

    // if (!user) 
    // router.push('/login')

    return (
        loading ? <div style={{ color: 'white' }}>loading...</div> :
        <>

            <GlassContainer>
              <Navbar opt={1} />
              <div className={styles.container}>
                <div className={styles.innerContainer}>
                <FontAwesomeIcon icon={faCoffee} className='Card-Image' />
                Price: &#8377;{item.data.recordset[0].item_price}
                </div>
                <div className={styles.innerContainer}>
                    {/* Price: &#8377;{item.data.recordset[0].item_price} */}
                    <div className={styles.inc}>
                      <div>Quantity :</div>
                      <div className={styles.button}
                        onClick={() => setOrderSize(orderSize + 1)}
                      > 
                        <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: 40 }} />
                      </div>
                      <div type='number' min='1' 
                        className={styles.input} 
                        // onChange={ e => {
                        //   e.preventDefault()
                        //   setOrderSize(e.target.value)
                        // }}
                        >{orderSize}</div>
                      <div className={styles.button}
                        onClick={() => setOrderSize((orderSize - 1) > 1 ? orderSize-1 : 1 )}
                      > 
                        <FontAwesomeIcon icon={faMinusCircle} style={{ fontSize: 40 }} />
                      </div>
                    </div>
                    Total Cost: &#8377;{item.data.recordset[0].item_price * orderSize}
                    <button onClick={placeOrder} type="button" class="btn btn-primary" >Place Order</button>
                </div>
              </div>
            </GlassContainer>
        </>
    )
}

export default Item

export async function getStaticPaths() { // Why is getStaticPaths required ?
    const res = await fetch('http://localhost:3000/api')
    const items = await res.json()
  
    const paths = items.data.recordset.map((item) => ({
      params: { id: item.id.toString() },
    }))
  
    return { paths, fallback: false }
  }

export async function getStaticProps({ params }) {
    // const itemId = window.location.pathname.slice(1)
    const res = await fetch(`http://localhost:3000/api/${params.id}`)
    const item = await res.json()
    // console.log(item)
    return {
      props: {
        item
      }
    }
  }
