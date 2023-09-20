function Thumbnail({ img }) {
	return (
			<div className={'col-auto thumbnail'}>
				<img src={ '/uploads/' + img.filename } alt={ img.alt } />
			</div>
	)
}

export default function ImageGrid({ images }) {
	return (
			<div className={'row image-grid'}>
				{ images.map( img => {
					return <Thumbnail img={ img } />
				}) }
			</div>
	)
}