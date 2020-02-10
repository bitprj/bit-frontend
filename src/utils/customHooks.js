import { useEffect, useRef } from 'react'

export const useDidUpdateEffect = (fn, inputs) => {
	useConditionalDidUpdateEffect(true, fn, inputs)
}

export const useConditionalDidUpdateEffect = (conditional, fn, inputs) => {
	const didMountRef = useRef(false)

	useEffect(() => {
		if (conditional) {
			if (didMountRef.current) fn()
			else didMountRef.current = true
		}
	}, inputs) // eslint-disable-line react-hooks/exhaustive-deps
}
