
// const delayPromise = () => {
// 	return new Promise((resulve, reject) => {
// 		setTimeout(() => {
// 			resulve('Hello timeout')
// 		}, 1000)
// 	})
// }
// delayPromise() 					// Promise<unknown>
// 	.then(console.log)


// const delayPromise = (): Promise<string> => {
// 	return new Promise((resulve: (value: string) => void, reject) => { 		
// 		setTimeout(() => {
// 			resulve('Hello timeout')
// 		}, 1000)
// 	})
// }

// delayPromise() 					// Promise<string>
// 	.then(console.log)


// const delayPromise = (): Promise<string> => {
// 	return new Promise((resulve: (value: string) => void, reject: (value: Error) => void) => { 		
// 		setTimeout(() => {
// 			// resulve('Hello timeout')
// 			reject(new Error('Hello Error'))

// 			// reject('Hello Error') 					// => Throw Error: 
// 		}, 10)
// 	})
// }

// delayPromise() 					// Promise<string>
// 	.then(console.log)
// 	.catch(console.log)

export type AllowledField = 'sun' | 'mon' | 'tues'
const days: AllowledField = 'sun'
console.log( days )
