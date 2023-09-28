import {HandleChange} from "../functions/PostData.jsx";

export default function OutletHeader({ newLink, newText, query, setQuery }) {
	
	const handleChange = ( event ) => {
		HandleChange( event, query, setQuery );
	}
	
	return (
			<div className={'outlet-header row gy-3 justify-content-between'}>
				<div className={'col-auto'}>
					<a href={ '/admin' + newLink }>
						<i className="fa-solid fa-circle-plus fa-xl"></i> &ensp; { newText }
					</a>
				</div>
				{ query !== undefined && <div className={'col-auto'}>
					<div className={'row mb-3'}>
						<div className={'col-auto'}>
							<label htmlFor="query" className="form-label search-icon">
								<i className="fa-solid fa-magnifying-glass"></i>
							</label>
						</div>
						<div className={'col-auto'}>
							<input type="text" className="form-control" id="query" placeholder=" Search" onChange={ handleChange } />
						</div>
					</div>
				</div> }
			</div>
	)
}