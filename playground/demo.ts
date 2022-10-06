export const name = ''

const fn = (): void => {
	console.log('Hello')
}

fn.handleWalk = (value: string) => {
	console.log(value)
}

fn.handleWalk('hello')