import { useEffect, useRef } from 'react'

export const useDidUpdateEffect = (fn, dependencies, cleanup) => {
	const didMountRef = useRef(false)

	useEffect(() => {
		if (didMountRef.current) fn()
		else didMountRef.current = true
		return cleanup
	}, dependencies) // eslint-disable-line react-hooks/exhaustive-deps
}

// modified from https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering
export const useTraceUpdate = props => {
	const prev = usePreviousSafe(props)
	useEffect(() => {
		const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
			if (prev[k] !== v) {
				ps[k] = [prev[k], v]
			}
			return ps
		}, {})
		if (Object.keys(changedProps).length > 0) {
			console.log('Changed props:', changedProps)
		}
	})
}

export const usePrevious = value => {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}

export const usePreviousSafe = value => {
	const ref = useRef(value)
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}
