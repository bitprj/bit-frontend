export const objectArrayToObject = array =>
	array.reduce((acc, item) => ({ ...acc, ...item }), {})

export const objArrayClone = objArray => {
	return objArray.map((_, i) => {
		return { ...objArray[i] }
	})
}

// export const iterateNodes = (obj, callback, nestLevel = Infinity) => {
// 	if (!obj) return undefined
// 	if (nestLevel === 0) return

// 	for (let property in obj) {
// 		if (obj.hasOwnProperty(property) && obj[property] != null) {
// 			if (obj[property].constructor === Object) {
// 				iterateNodes(obj[property], callback, nestLevel - 1)
// 				callback(obj[property])
// 			} else if (obj[property].constructor === Array) {
// 				for (let i = 0; i < obj[property].length; i++) {
// 					iterateNodes(obj[property][i], callback, nestLevel - 1)
// 					callback(obj[property][i])
// 				}
// 			} else {
// 				// console.log(obj[property])
// 			}
// 		}
// 	}
// 	return obj
// }
