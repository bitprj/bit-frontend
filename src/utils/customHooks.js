import { useEffect, useRef } from 'react'

export const useDidUpdateEffect = (fn, dependencies, cleanup) => {
	const didMountRef = useRef(false)

	useEffect(() => {
		if (didMountRef.current) fn()
		else didMountRef.current = true
		return cleanup
	}, dependencies) // eslint-disable-line react-hooks/exhaustive-deps
}
