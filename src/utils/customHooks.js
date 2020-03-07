import { useEffect, useRef } from 'react'

export const useDidUpdateEffect = (fn, dependencies, cleanup) => {
	const didMountRef = useRef(false)

	useEffect(() => {
		if (didMountRef.current) fn()
		else didMountRef.current = true
		return cleanup
	}, dependencies) // eslint-disable-line react-hooks/exhaustive-deps
}

// https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering
export const useTraceUpdate = props => {
	const prev = useRef(props)
	useEffect(() => {
		const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
			if (prev.current[k] !== v) {
				ps[k] = [prev.current[k], v]
			}
			return ps
		}, {})
		if (Object.keys(changedProps).length > 0) {
			console.log('Changed props:', changedProps)
		}
		prev.current = props
	})
}
