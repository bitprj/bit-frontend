import { useEffect, useRef } from 'react'

export const useDidUpdateEffect = (fn, dependencies) => {
	useInitialConditionalDidUpdateEffect(true, fn, dependencies)
}

export const useInitialConditionalDidUpdateEffect = (conditional, fn, dependencies) => {
	const didMountRef = useRef(false)

	useEffect(() => {
		if (conditional) {
			if (didMountRef.current) fn()
			else didMountRef.current = true
		}
	}, dependencies) // eslint-disable-line react-hooks/exhaustive-deps
}
