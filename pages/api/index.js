import sql from 'mssql'
import sqlconfig from '../../util/sqlconfig'

const connectDB = async (req, res) => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlconfig)
        const result = await sql.query(`select * from menu`)
        res.status(200).json({data : result})
    } catch (err) {
        // ... error checks
        res.status(500).json({error: err})
    }
}

export default function handler(req, res) {
    // database: "mssql://sa:password@localhost:1433/database_name"
    connectDB(req, res)
    // res.status(200).json({ name: 'John Doe' })
}
