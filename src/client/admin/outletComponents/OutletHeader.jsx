export default function OutletHeader({ newLink, newText }) {
	return (
			<div className={'outlet-header row'}>
				<div className={'col-auto'}>
					<a href={ newLink }>
						<i className="fa-solid fa-circle-plus fa-xl"></i> &ensp; { newText }
					</a>
				</div>
			</div>
	)
}