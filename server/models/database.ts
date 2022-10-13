import { connect, connection } from 'mongoose'

const DB_LOCAL_URL = process.env.DB_LOCAL_URL as string



export const connectToDatabase = () => {
	if(connection.readyState >= 1) return

	return connect(DB_LOCAL_URL)
		.then(conn => {
			const { host, port, name } = conn.connection
			console.log(`-----[ database connected on: ${host}:${port}/${name} ]-----`)
		})
		.catch(err => console.log(`database Connection failed. ${err.message}`))
}
