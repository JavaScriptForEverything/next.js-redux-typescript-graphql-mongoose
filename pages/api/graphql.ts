import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { resolvers } from 'graphql/resolvers'
import { typeDefs } from 'graphql/typedefs'
import { connectToDatabase } from 'server/models/database'

const cors = Cors()
connectToDatabase() 			// create database connection 

const server = new ApolloServer({ typeDefs, resolvers })
const startServer = server.start()

const handler = cors(async (req, res) => {
	if( req.method === 'OPTIONS') return res.end()

	await startServer
	await server.createHandler({ path: '/api/graphql' })(req, res)
})
export default handler

export const config = {
	api: {
		bodyParser: false
	}
}