import { useEffect, useRef } from 'react'

export const useDidUpdateEffect = (fn, dependencies) => {
	useConditionalDidUpdateEffect(true, fn, dependencies)
}

export const useConditionalDidUpdateEffect = (conditional, fn, dependencies) => {
	const didMountRef = useRef(false)

	useEffect(() => {
		if (conditional) {
			if (didMountRef.current) fn()
			else didMountRef.current = true
		}
	}, dependencies) // eslint-disable-line react-hooks/exhaustive-deps
}

export const useAntiAlternatingUpdateEffect = (fn, dependencies) => {
	const alternateRef = useRef(true)

	useEffect(() => {
		if (alternateRef.current) {
      fn()
      alternateRef.current = false
		} else alternateRef.current = true
	}, dependencies)
}

export const useAlternatingUpdateEffect = (fn, dependencies) => {
	const alternateRef = useRef(false)

	useEffect(() => {
		if (alternateRef.current) {
      fn()
      alternateRef.current = false
		} else alternateRef.current = true
	}, dependencies)
}
