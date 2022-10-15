export type AllowledField = 'sun' | 'mon' | 'tues'

const objA = { name: 'riajul', age: 28 }
const objB = { profession: 'developer' }

// const newObj = Object.assign({}, objA, objB)
// newObj.name
// newObj.profession

const mergeObjects = <T1, T2>(a: T1, b: T2) => {
	return Object.assign({}, a, b)
}

const result = mergeObjects(objA, objB)
result.age
result.profession