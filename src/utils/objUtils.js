import { cloneDeep } from 'lodash'

export const objectArrayToObject = array =>
	array.reduce((obj, item) => ({ ...obj, ...item }), {})

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

// not working
export const objWithNestLevel = (root, nestLevel = 1) => {
	const objWithNestLevelRecurse = (obj, nestLevel) => {
		if (!obj) return undefined

		for (let property in obj) {
			if (obj.hasOwnProperty(property) && obj[property] != null) {
				console.log(obj, nestLevel)
				if (nestLevel === 0) return delete obj[property]
				if (obj[property].constructor === Object) {
					objWithNestLevelRecurse(obj[property], nestLevel - 1)
				} else if (obj[property].constructor === Array) {
					for (let i = 0; i < obj[property].length; i++) {
						objWithNestLevelRecurse(obj[property][i], nestLevel - 1)
					}
				}
			}
		}
		return obj
	}
	const clone = cloneDeep(root)
	return objWithNestLevelRecurse(clone, nestLevel)
}

export const iterateNodes = (obj, callback, nestLevel = Infinity) => {
	if (!obj) return undefined
	if (nestLevel === 0) return

	for (let property in obj) {
		if (obj.hasOwnProperty(property) && obj[property] != null) {
			if (obj[property].constructor === Object) {
				iterateNodes(obj[property], callback, nestLevel - 1)
				callback(obj[property])
			} else if (obj[property].constructor === Array) {
				for (let i = 0; i < obj[property].length; i++) {
					iterateNodes(obj[property][i], callback, nestLevel - 1)
					callback(obj[property][i])
				}
			} else {
				// console.log(obj[property])
			}
		}
	}
	return obj
}

// export const iterateNodesWithPath = (obj, callback, path, nextLevel = Infinity)
