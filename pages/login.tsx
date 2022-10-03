import Link from 'next/link'
import { useState } from 'react'
import isEmail from 'validator/lib/isEmail'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MuiLink from '@mui/material/Link'

type InputObject = {
	label: string
	placeholder: string
	type?: string
	name: string
}

type FieldsType = {
	[key: string]: string
}

const formValidator = (fields: FieldsType, setFieldsError: React.Dispatch<React.SetStateAction<FieldsType>>) => {
	const tempObj: FieldsType = {}

	if( !isEmail(fields.email) ) tempObj.email = `invalid Email: ${fields.email} `
	if( fields.password.length < 4 )  tempObj.password = 'Password must have minimum length 4'

	Object.keys(fields).forEach(field => {
		if( !fields[field] ) tempObj[field] = `<${field}> field is empty`
	})

	setFieldsError(tempObj)
	return Object.keys(tempObj).every( field => tempObj[field] === '')
}


const inputItems: InputObject[] = [
	{ label: 'Email', placeholder: 'abc@gmail.com', type: 'email', name: 'email' },
	{ label: 'Password', placeholder: '********', type: 'password', name: 'password' },
]
const fieldObject: FieldsType = {}
inputItems.forEach( item => fieldObject[item.name] =  '' )


const Login = () => {
	const [ fields, setFields ] = useState<FieldsType>(fieldObject)
	const [ fieldsError, setFieldsError ] = useState<FieldsType>(fieldObject)

	const changeHandler = ( name: string ) => (evt: React.ChangeEvent<HTMLInputElement>) => {
		setFields({ ...fields, [name]: evt.target.value })
	}
	const resetHandler = () => {
		setFields(fieldObject)
	}

	const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault()

		if( !formValidator(fields, setFieldsError) ) return

		console.log(fields)
		setFields(fieldObject)
	}

	return (
		<>

			<Link href='/' passHref>
				<MuiLink> Home </MuiLink>
			</Link>

			<Typography variant='h4' align='center' paragraph color='primary' >Login</Typography>

			<Container maxWidth='sm'>
				<form noValidate onSubmit={submitHandler}>
					{inputItems.map(({ label, placeholder, type, name }) => (
						<TextField key={name}
							margin='dense'
							fullWidth

							label={label}
							placeholder={placeholder}
							type={type}

							value={fields[name]}
							onChange={changeHandler(name)}

							error={!fields[name] || !!fieldsError[name]}
							helperText={fieldsError[name]}
						/>
					))}

					<Box sx={{ my: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
						<Button variant='outlined' onClick={resetHandler} >Reset</Button>
						<Button variant='contained' type='submit' >Login</Button>
					</Box>
				</form>
			</Container>

		</>
	)
}
export default Login
