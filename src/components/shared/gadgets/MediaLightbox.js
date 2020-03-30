import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import Lightbox, { Modal, ModalGateway } from 'react-images'
import AspectRatio from 'react-aspect-ratio'
import 'react-aspect-ratio/aspect-ratio.css'

export const TYPE_IMAGE = 'image'
export const TYPE_VIDEO = 'video'

const Image = styled.img`
	max-height: 98%;
`

const Video = styled.video`
	max-height: 98%;
`

const MediaLightbox = ({
	type = TYPE_IMAGE,
	className,
	src,

	ratio
}) => {
	const [open, setOpen] = useState(false)

	const mediaRef = useRef(null)

	const [aspectRatioInfo, setAspectRatioInfo] = useState({
		mediaMaxWidth: undefined,
		mediaAspectRatio: 1
	})

	useEffect(() => {
		if (ratio === undefined) return

		if (type === TYPE_IMAGE) {
			const width = mediaRef.current.node.clientWidth
			const mediaMaxWidth = width / ratio

			const child = mediaRef.current.node.children[0]
			const { naturalWidth, naturalHeight } = child
			const mediaAspectRatio = naturalWidth / naturalHeight

			if (!aspectRatioInfo.mediaMaxWidth)
				setAspectRatioInfo({ mediaMaxWidth, mediaAspectRatio })
		} else {
			if (!aspectRatioInfo.mediaMaxWidth)
				setAspectRatioInfo({ mediaMaxWidth: '100%', mediaAspectRatio: ratio })
		}
	})

	const selectMedia = () => {
		switch (type) {
			case TYPE_VIDEO:
				return (
					<Video className={className} controls>
						<source src={src} type="video/mp4" />
					</Video>
				)

			case TYPE_IMAGE:
			default:
				return (
					<Image
						className={className}
						src={src}
						onClick={() => setOpen(true)}
					/>
				)
		}
	}

	return (
		<>
			{ratio ? (
				<AspectRatio
					ref={mediaRef}
					ratio={aspectRatioInfo.mediaAspectRatio}
					style={{
						margin: '0 auto',
						maxWidth: aspectRatioInfo.mediaMaxWidth + 'px'
					}}
				>
					{selectMedia()}
				</AspectRatio>
			) : (
				selectMedia()
			)}
			<ModalGateway>
				{open ? (
					<Modal onClose={() => setOpen(false)}>
						<Lightbox
							views={[{ src }]}
							frameProps={{ autoSize: 'height' }}
							components={{ Footer: null }}
						/>
					</Modal>
				) : null}
			</ModalGateway>
		</>
	)
}

export default MediaLightbox
