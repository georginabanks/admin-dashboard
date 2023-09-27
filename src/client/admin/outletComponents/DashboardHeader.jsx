import {avatars} from "../../api.jsx";
import {useState} from "react";
import {HandleChange} from "../functions/PostData.jsx";

export default function DashboardHeader({ cookies }) {
	
	let greeting = cookies.username;
	if ( cookies.name !== null ) { greeting = cookies.name }
	
	const [query, setQuery] = useState('');
	
	const handleChange = ( event ) => {
		HandleChange( event, query, setQuery );
	}
	
	return (
			<div className={'outlet-header dashboard-header'}>
				<div className={'row justify-content-between gy-3'}>
					<div className={'col-md-6'}>
						<div className={'greeting'}>
							<div className={'row'}>
								<div className={'col-3'}>
									<div className={'square'}>
										<img src={ cookies.filename !== null ? '/uploads/' + cookies.filename
												: '/uploads/' + avatars[ Math.floor(Math.random() * 10) ].filename }
											 alt={ cookies.alt } className={'round-image'} />
									</div>
								</div>
								
								<div className={'col-auto'}>
									<h6 className={'greeting-text'}>Hello, { greeting }!</h6>
								</div>
							</div>
						</div>
					</div>
					
					<div className={'col-auto'}>
						<div className={'col-auto'}>
							<div className={'row mb-3'}>
								<div className={'col-auto'}>
									<label htmlFor="query" className="form-label search-icon">
										<i className="fa-solid fa-magnifying-glass"></i>
									</label>
								</div>
								<div className={'col-auto'}>
									<input type="text" className="form-control" id="query" placeholder=" Search Posts"
										   onChange={ handleChange } />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	)
}