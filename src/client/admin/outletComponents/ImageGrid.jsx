function Thumbnail({ img }) {
	return (
			<div className={'col-md-3 thumbnail-image'}>
				<img src={ '/uploads/' + img.filename } alt={ img.alt } width={'100%'} />
			</div>
	)
}

export default function ImageGrid({ images }) {
	return (
			<div className={'row image-grid'}>
				{ images.map( img => {
					return <Thumbnail key={ img.imageId } img={ img } />
				}) }
			</div>
	)
}