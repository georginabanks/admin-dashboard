export default function OutletHeader({ newLink, newText, query, setQuery }) {
	return (
			<div className={'outlet-header row justify-content-between'}>
				<div className={'col-auto'}>
					<a href={ newLink }>
						<i className="fa-solid fa-circle-plus fa-xl"></i> &ensp; { newText }
					</a>
				</div>
				{ query !== undefined && <div className={'col-auto'}>
					2
				</div> }
			</div>
	)
}