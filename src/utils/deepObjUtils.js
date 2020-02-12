import { cloneDeep } from 'lodash'

/**
 * Formats Contentful Data the way we want it
 * @param {*} root
 */
export const normalizeContentful = root => {
	const clone = cloneDeep(root) // necessary to override non-extensible. it hurts inside
	return iterateNodes(clone, node => {
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

// export const findNodeById

export const modifyNodeByContentfulId = (
	root,
	id,
	modification,
	options = {}
) => {
	if (!id) throw new Error('id not specified')

	return iterateNodes(root, node => {
		if (node.contentfulId === id) {
			if (options.overwrite)
				Object.getOwnPropertyNames(node).forEach(key => delete node[key])
			Object.assign(node, { ...modification })
		}
	})
}

export const iterateNodes = (obj, callback) => {
	if (!obj) return undefined

	for (let property in obj) {
		if (obj.hasOwnProperty(property) && obj[property] != null) {
			if (obj[property].constructor === Object) {
				iterateNodes(obj[property], callback)
				callback(obj[property])
			} else if (obj[property].constructor === Array) {
				for (let i = 0; i < obj[property].length; i++) {
					iterateNodes(obj[property][i], callback)
					callback(obj[property][i])
				}
			} else {
				// console.log(obj[property])
			}
		}
	}
	return obj
}
