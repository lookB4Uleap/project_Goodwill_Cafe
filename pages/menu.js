import GlassContainer from '../components/GlassContainer'
import Navbar from '../components/Navbar'
import useSWR from 'swr'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
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
    // console.log(menu)
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
      
      <div className='Empty-Space'></div>
      <GlassContainer>
        <Navbar opt={1} />
        <div className="Main">
        <div className="Logo">Goodwill Cafe</div>
        <section className="btn-group">
          <button type="button" className="btn btn-primary" onClick={() => dispMenu('coffee')}>Coffee</button>
          <button type="button" className="btn btn-primary" onClick={() => dispMenu('tea')}>Tea</button>
          <button type="button" className="btn btn-primary" onClick={() => dispMenu('snacks')}>Snacks</button>
          <button type="button" className="btn btn-primary" onClick={() => dispMenu('drinks')}>Drinks</button>
        </section>
        <article className="Menu-Article">
        <div className="list-group" >
        {
        (error) ? <div>failed to load</div> :
        (!data) ? <div>loading...</div> :
        (
        data.data.recordset.map(
          record => (
            
              <div className="list-group-item"
                key={record.id} onClick = {() => loadMenuItem(record.id)}
              >{record.item_name} :  &#8377;{record.item_price}</div>
              // {/* <div className="list-group-item list-group-item-action"></div> */}
          )
        )
        )
        }
        </div>  
        </article> 
        </div>
      </GlassContainer>
    </>
  )
}
