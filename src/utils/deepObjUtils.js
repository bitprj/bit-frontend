import { cloneDeep } from 'lodash'

/**
 * Formats Contentful Data the way we want it
 * @param {*} root
 */
export const normalizeContentful = root => {
	const clone = cloneDeep(root)
	return iterate(clone, node => {
		if (node.sys) {
			node.contentfulId = node.sys.id
			delete node.sys
		}
		if (node.fields) {
			Object.assign(node, { ...node.fields })
			delete node.fields
		}
	})
}

export const objArrayClone = objArray => {
	return objArray.map((obj, i) => {
		return { ...objArray[i] }
	})
}

export const modifyNodeByContentfulId = (root, id, modification, options = {}) => {
	if (!id) throw new Error('id not specified')

	return iterate(root, node => {
		if (node.contentfulId === id) {
			if (options.overwrite)
				Object.getOwnPropertyNames(node).forEach(key => delete node[key])
			Object.assign(node, { ...modification })
		}
	})
}

const iterate = (obj, callback) => {
	if (!obj) return undefined

	const clone = { ...obj }
	for (let property in clone) {
		if (clone.hasOwnProperty(property) && clone[property] != null) {
			if (clone[property].constructor === Object) {
				iterate(clone[property], callback)
				callback(clone[property])
			} else if (clone[property].constructor === Array) {
				for (let i = 0; i < clone[property].length; i++) {
					iterate(clone[property][i], callback)
					callback(clone[property][i])
				}
			} else {
				// console.log(clone[property])
			}
		}
	}
	return clone
}
