export default function OutletHeader({ newLink, newText, categoryLink, categoryText }) {
	return (
			<div className={'outlet-header row'}>
				<div className={'col-auto'}>
					<a href={ newLink }>
						<i className="fa-solid fa-circle-plus fa-xl"></i> &ensp; { newText }
					</a>
				</div>
				
				{ categoryLink && <div className={'col-auto'}>
					<a href={ categoryLink }>
						<i className="fa-solid fa-circle-plus fa-xl"></i> &ensp; { categoryText }
					</a>
				</div>}
			</div>
	)
}