import sql from 'mssql'
import sqlconfig from '../../util/sqlconfig'

const writeToDB = async (req, res) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlconfig)
        const user = req.body.user;
        const order = req.body.order;
        const result = await sql.query(
            `insert into orders (
                userid, username, user_email,
                item_id, item_name, item_price,
                order_size, total_order_cost, order_date 
            ) values(
                '${user.userId}', '${user.username}', '${user.userEmail}',
                ${order.itemId}, '${order.itemName}', ${order.itemPrice},
                ${order.orderSize}, ${order.orderSize * order.itemPrice}, 
                '${new Date().toISOString()}'
            )`)
        // console.log(order)
        // console.log(user)
        console.log(new Date().toISOString())
        res.status(200).json({data : result})
    } catch (err) {
        // ... error checks
        res.status(500).json({error: err})
    }
}

export default function handler(req, res) {
    // database: "mssql://sa:password@localhost:1433/database_name"
    writeToDB(req, res)
    // res.status(200).json({ name: 'John Doe' })
}
