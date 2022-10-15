## Next.JS-Redux-TypeScript-GraphQL-Mongoose
```
$ tree -I 'node_modules|.git|.next|public' 	// => print directory but exclude given folders
.
├── layout
│   ├── footer.tsx
│   ├── header.tsx
│   └── index.tsx
│
├── pages
│   ├── api
│   │   ├── disable-preview.ts
│   │   ├── graphql.ts
│   │   └── preview.ts
│   │
│   ├── _app.tsx
│   ├── index.tsx
│   ├── about.tsx
│   ├── login.tsx
│   ├── book.tsx
│   ├── notReady.tsx
│   │
│   ├── news
│   │   └── index.tsx
│   │
│   ├── posts
│   │   ├── index.tsx
│   │   └── [postId].tsx
│   │
│   └── user
│       └── profile.tsx
│
├── store
│   ├── index.ts
│   └── userReducer.ts
│
├── server
│   └── models
│       ├── database.ts
│       └── userModel.ts
│
├── graphql
│   │
│   ├── typedefs
│   │   ├── index.ts
│   │   └── userTypeDefs.ts
│   │
│   ├── resolvers
│   │   ├── index.ts
│   │   └── userResolvers.ts
│   │
│   └── queries
│       ├── index.ts
│       └── userQuery.ts
│
├── shared
│   └── types
│       └── user.ts
│
├── __tests__
│   ├── login.tsx
│   ├── __snapshots__
│   │   └── snapshot.tsx.snap
│   └── snapshot.tsx
│
├── playground
│   ├── demo.ts
│   └── mongo.js
│
├── package.json
├── tsconfig.json
├── README.md
├── next.config.js
├── jest.config.js
├── jest.setup.js
├── types.d.ts
├── next-env.d.ts
└── yarn.lock
```

#### Create Next.js Project

`$ yarn add next react react-dom`


##### /package.json
```
...
"scripts" : {
	"dev": "next dev",
	"build": "next build",
	"start": "next start"
}
...
```


### Enable TypeScript
```
$ touch tsconfig.json 					// => Empty file auto-generate by next.js
$ yarn dev 						// => Throw Error: need to install some packages
$ yarn add -D typescript @types/node @types/react 	// => copy paste or type bello packages
$ yarn dev 						// => Populate tsconfig.json file
```


### Enable ESLint (in VSCode)

	. By Default ESLint not enabled
	. "   	" 	"   " 	  " 	in TypeScript files too

```
$ yarn add -D eslint
$ yarn eslint --init 		// => Follow the instraction
```


### Enable Absolute import in Next.js

##### Relative import: Ugly way to import:
	import * as authController from '../../../../server/controllers/authController'
	import * as userController from '../../../../server/controllers/userController'

##### Absolute Import: Clean way to import:
	import * as authController from '@server/controllers/authController'
	import * as userController from '@server/controllers/userController'


##### /tsconfig.json
```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      	"@pages/*"	: [ "pages/*" ],
      	"@components/*" : [ "components/*" ],
      	"@layout/*"	: [ "layout/*" ],
      	"@docs/*"	: [ "docs/*" ],
	"@server/*" 	: ["server/*"],
	"@store/*" 	: ["store/*"],
	"@graphql/*" 	: ["graphql/*"],
	"@shared/*" 	: ["shared/*"],
      	"@util/*"	: [ "util/*" ],
    },
...
```





## Setup Redux with `next-redux-wrapper`

`$ yarn add @reduxjs/toolkit   react-redux    next-redux-wrapper`


##### /store/index.ts
```
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import userReducer from '@store/userReducer'

const makeStore = () => configureStore({
	reducer: {
		user: userReducer
	}
})

export const wrapper = createWrapper( makeStore, { debug: false })

type Store = ReturnType<typeof makeStore>
export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
```


##### /store/userReducer.ts
```
import { HYDRATE } from 'next-redux-wrapper'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '@store/index'
import { UserDocument } from '@shared/types/user'

type TInitialState = {
	loading: boolean
	error: string
	user: UserDocument
}

const initialState: TInitialState = {
	loading: false,
	error: '',
	user: {
		id: '',
		name: '',
		email: ''
	}
}

const { reducer, actions } = createSlice({
	name: 'user',
	initialState,
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
			error: ''
		}),
		failed: (state, action: PayloadAction<string>) => ({
			...state,
			loading: false,
			error: action.payload
		}),
		getUserById: (state, action: PayloadAction<UserDocument>) => ({
			...state,
			loading: false,
			user: action.payload
		})
	},
	extraReducers: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[HYDRATE]: (state, action: PayloadAction<any>) => ({
			...state, 												// state = all slices: userSlice + productSlice + ...
			user: { 													// userSlice
				...state.user, 			// copy previouse state of userSlice
				...action.payload.user.user 	// override by allSlice.userSlice.userObject
			}
		})
	}
})
export default reducer


// /pages/index.tsx 	: getServerSideProps
export const getUserById = () => async (dispatch: AppDispatch) => {
	dispatch( actions.requested() )
	const user = {
		id: '1',
		name: 'name',
		email: 'email'
	}
	dispatch( actions.getUserById(user) )
}
```



##### /pages/\__app.tsx
```
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {

  return <Component {...pageProps} />
}
export default wrapper.withRedux(MyApp)
```


##### /pages/index.tsx
```
import { useSelector } from 'react-redux'
import { RootState, wrapper } from '@store/index'
import  * as userReducer from '@store/userReducer'

import Box from '@mui/material/Box'


const HomePage = () => {
	const { user } = useSelector( (state: RootState) => state.user )
	console.log({ user })


	return (
		<Box sx={{ minHeight: 300 }}>

			<pre>
				{JSON.stringify(user, null, 2)}
			</pre>
		</Box>
	)
}
export default HomePage


export const getServerSideProps = wrapper.getServerSideProps( ({ dispatch }) => async () => {
	await dispatch(userReducer.getUserById())

	// return { props: {} } mandatory even though did not return anything
	return {
		props: { }
	}

})
```





## Database: MongoDB (with Mongoose driver)
```
$ sudo systemctl start mongodb 		// Start MongoDB Database
$ sudo systemctl status mongodb 	// Check Database Status

$ mongo 				// Connect To Database By Terminal
	$ show dbs 			// => Show all database available in the machine
	$ use test 			// => Switch to any database (test is default)
	$ show collections 		// => Show all the collections/tables in test database

	$ db 				// => Show current database
	$ db.dropDatabase() 		// => Delete 	" 	"
	$ db.users.drop() 		// => Delete `users` collection/table

	$ db.users.find() 			// =>
	$ db.users.find().pretty() 		// => Show users tables nicely formated
	$ db.users.find().limit(2).pretty() 	// => Show only 2 documents

	$ exit 				// => exit from database shell


$ yarn add mongoose
```


##### /server/models/database.ts
```
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
```

##### /server/models/userModel.ts
```
import { Schema, model, models, Model } from 'mongoose'
import { UserDocument } from '@shared/types/user'

/* /shared/types/user.ts
export type UserDocument = {
	id: string
	name: string
	email: string
}
*/

const userSchema = new Schema<UserDocument>({
	name: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		trim: true,
		required: true
	}
}, {
	timestamps: true
})

const userModel: Model<UserDocument> = models.User || model<UserDocument>('User', userSchema)
export default userModel
```


##### /pages/api/graphql
```
...
import { connectToDatabase } from '@server/models/database'
...

connectToDatabase() 			// create database connection
...
export const config = {
	api: {
		bodyParser: false
	}
}
```






## GraphQL (Server + Client)
```
$ yarn add apollo-server-micro micro graphql cors-micro
$ yarn add @apollo-client
```

### GraphQL Apollo Server

##### pages/api/graphql.ts
```
import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { resolvers } from '@graphql/resolvers'
import { typeDefs } from '@graphql/typedefs'
import { connectToDatabase } from '@server/models/database'

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
```

##### /graphql/typeDefs/index.ts
```
import { gql } from 'apollo-server-micro';
import { userTypeDefs } from '@graphql/typedefs/userTypeDefs'


export const rootTypeDefs = gql`
	type Query {
		_: String
	}

	type Mutation {
		_: String
	}
`

export const typeDefs = [ rootTypeDefs, userTypeDefs ]
```

##### /graphql/typeDefs/userTypeDefs.ts
```
import { gql } from 'apollo-server-micro'

export const userTypeDefs = gql`
	extend type Query {
		user(userId: ID!): User
		users: [User]!
	}
	extend type Mutation {
		signup(input: userInput): User
	}

	input userInput {
		name: String!
		email: String!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		createdAt: String!
		updatedAt: String!
	}
`
```



##### /graphql/resolvers/index.ts
```
import { userResolvers } from '@graphql/resolvers/userResolvers'

const rootResolvers = {}

export const resolvers = [
	rootResolvers,
	userResolvers
]


```


##### /graphql/resolvers/userResolvers.ts
```
import User from '@server/models/userModel'

type InputProps = {
	name: string
	email: string
}
type ArgumentProps = {
	input: InputProps
}

export const userResolvers = {
	Query: {
		user: async (_: undefined, arg: { userId: string }) => {
			const user = await User.findById(arg.userId)
			// console.log(user)
			return user

			// return {
			// 	id: '1',
			// 	name: 'riajul',
			// 	email: 'riajul@gmail.com'
			// }
		},

		users: async () => {
			const users = await User.find()
			return users
		}

	}, 	// end of Query

	Mutation: {
		signup: async (_: undefined, arg: ArgumentProps ) => {
			const user = await User.create(arg.input)
			console.log( user.id )
			return user
		}
	}
}
```


##### Browser 	: http://localhost:3000/api/graphql
	. Operation:
```
query getUser {
  user(userId: "634835832a9d536d8845fe0b") {
    id
    email
    name
  }
}
query getUsers {
  users {
    id
    name
    email
    createdAt
    updatedAt
  }
}
mutation createUser($input: userInput) {
  signup(input: $input) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
```


	. Variables:
```
{
  "input": {
    "name": "ayan Hossain",
    "email": "ayan@gmail.com"
  }
}
```



### GraphQL Apollo Client
```
```

##### /pages/\__app.tsx
```
import type { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
	uri: 'http://localhost:3000/api/graphql',
	cache: new InMemoryCache()
})

const MyApp = ({ Component, pageProps }: AppProps ) => {

  return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}
export default MyApp
```


##### /pages/index.tsx
```
import { useQuery } from '@apollo/client'
import { UserDocument } from '@shared/types/user'
import { GET_USERS_QUERY } from '@graphql/queries'

/* /shared/types/user.ts
export type UserDocument = {
	id: string
	name: string
	email: string
}
*/

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type GetUsers = {
	users: UserDocument[]
}

const HomePage = () => {
	const { data } = useQuery<GetUsers>(GET_USERS_QUERY)
	if( !data ) return <>Loading</>

	return (
		<Box sx={{ minHeight: 300 }}>
			<Typography> Home Page with global Layout </Typography>
			<Typography> Abut About Page is component based Layout </Typography>

			<pre>
				{JSON.stringify(data.users, null, 2)}
			</pre>
		</Box>
	)
}
export default HomePage
```
