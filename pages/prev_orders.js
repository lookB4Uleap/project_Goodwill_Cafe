import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import useSWR from 'swr'
import GlassContainer from '../components/GlassContainer'
import Navbar from '../components/Navbar'
import { auth } from '../util/firebase'

const prev_orders = () => {
    const [orders, setOrders] = useState()
    const [user, loading] = useAuthState(auth)
    
    
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const { data ,error } = useSWR(`/api/prev_orders/${user?.uid}`, fetcher)

    return (
        loading ? <div style={{ color: 'white' }}>loading...</div> :
    <>
    <GlassContainer>
        <Navbar opt={3} />
        <div className="Main">
        <div className="Logo">Goodwill Cafe</div>
        <div>Previous Orders</div>
            <div className="Orders-List">
                {/* <ul className="list-group">
                <br />
                {
                    data.data.recordset.map(
                        record => (
                            <li className="list-group-item list-group-item-light">
                                {record.item_name} {record.item_price} {record.order_size} {record.total}
                            </li>        
                        )
                    )
                }
                <li className="list-group-item list-group-item-light">Hello </li>

                </ul> */}

                <table className="table table-striped">
                    <thead>
                    <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Order Size</th>
                    <th>Total</th>
                    <th>Orde Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data.recordset.map(
                                record => (
                                    <tr key={record.order_id}>
                                        <td>{record.item_name}</td>
                                        <td>&#8377; {record.item_price}</td>
                                        <td>{record.order_size}</td>
                                        <td>&#8377; {record.total_order_cost}</td>
                                        <td>{Date(record.order_date)}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                
            </div>
        </div>
    </GlassContainer>
    </>
    )
}

export default prev_orders