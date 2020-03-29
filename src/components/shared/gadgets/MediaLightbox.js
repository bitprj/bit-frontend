import React, { useState } from 'react'
import styled from 'styled-components'
import Lightbox, { Modal, ModalGateway } from 'react-images'

export const TYPE_IMAGE = 'image'
export const TYPE_VIDEO = 'video'

const Image = styled.img`
	max-width: 100%;
	max-height: 100%;
`

const Video = styled.video`
	max-width: 100%;
	max-height: 100%;
`

const MediaLightbox = ({ type = TYPE_IMAGE, className, src }) => {
	const [open, setOpen] = useState(false)

	const selectMedia = () => {
		switch (type) {
			case TYPE_IMAGE:
				return (
					<Image
						className={`strong-lift ${className || ''}`}
						src={src}
						onClick={() => setOpen(true)}
					/>
				)

			case TYPE_VIDEO:
				return (
					<Video className="strong-lift" controls>
						<source src={src} type="video/mp4" />
					</Video>
				)

			default:
				return (
					<Image
						className={`strong-lift ${className || ''}`}
						src={src}
						onClick={() => setOpen(true)}
					/>
				)
		}
	}

	return (
		<>
			{selectMedia()}
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
