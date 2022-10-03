import { render, screen } from '@testing-library/react'
import Login from '@/pages/login'
import userEvent from '@testing-library/user-event'

describe('Login', () => {
	test('render currectly', () => {
		render(<Login />)

		const email = screen.getByLabelText(/email/i) 					// <input type='text' />
		expect(email).toBeInTheDocument() 

		const password = screen.getByLabelText(/password/i) 		// <input type='password' />
		expect(password).toBeInTheDocument()

		const loginButton = screen.getByRole('button', { name: /login/i })
		expect(loginButton).toBeInTheDocument()

		const resetButton = screen.getByRole('button', { name: /reset/i })
		expect(resetButton).toBeInTheDocument()
	})

	test('passing value to inputs', async() => {
		render( <Login />)

		const email = screen.getByLabelText(/email/i) 					// <input type='text' />
		const password = screen.getByLabelText(/password/i) 		// <input type='password' />

		await userEvent.type(email, 'abc@gmail')
		expect(email).toHaveValue('abc@gmail')

		await userEvent.type(password, 'asdfasdf')
		expect(password).toHaveValue('asdfasdf')

	})

	test('test reset form by clicking reset buton ', async () => {
		render(<Login />)

		const email = screen.getByLabelText(/email/i) 					// <input type='text' />
		await userEvent.type(email, 'abc@gmail')

		const resetButton = screen.getByRole('button', { name: /reset/i })
		await userEvent.click(resetButton)

		expect( email ).toHaveValue('')
	})

	test('submit form by clicking submit button or pressing enter in keyboard', async () => {
		render(<Login />)

		// how to test form Submition

	})
})


