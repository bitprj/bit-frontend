import { useEffect, useRef } from 'react'

export const useDidUpdateEffect = (fn, dependencies) => {
	const didMountRef = useRef(false)

	useEffect(() => {
		if (didMountRef.current) fn()
		else didMountRef.current = true
	}, dependencies) // eslint-disable-line react-hooks/exhaustive-deps
}
