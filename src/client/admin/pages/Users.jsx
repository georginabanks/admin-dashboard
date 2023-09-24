import {useNavigate} from "react-router-dom";
import OutletHeader from "../outletComponents/OutletHeader.jsx";
import {useEffect, useState} from "react";
import {getUsers} from "../../api.jsx";
import _ from 'lodash';

function UsersTable({ users }) {
	return (
			<div>
				<table className={'table computer'}>
					<thead>
						<tr>
							<th scope={'col'}></th>
							<th scope={'col'}>Name</th>
							<th scope={'col'}>Username</th>
							<th scope={'col'}>Email</th>
							<th scope={'col'}>Permissions</th>
						</tr>
					</thead>
					
					<tbody>
						{ users.map( user => {
							return (
									<tr key={ users.indexOf(user) }>
										<td>
											<div className={'square'} style={{ minWidth: '12px' }}>
												<img src={ user.filename !== null ? '/uploads/' + user.filename : '/uploads/default.jpeg'}
													 alt={ user.alt } className={'round-image'} />
											</div>
										</td>
										<td>{ user.name }</td>
										<td>{ user.username }</td>
										<td>{ user.email }</td>
										<td>{ _.startCase(user.permission )}</td>
									</tr>
							)
						})}
					</tbody>
				</table>
				
				<p className={'mobile'}>Please view this page on a bigger screen.</p>
			</div>
	)
}

export default function Users({ cookies }) {
	const navigate = useNavigate();
	
	if ( cookies.permission === 'admin' ) {
		
		const [users, setUsers] = useState([]);
		const [query, setQuery] = useState('');
		
		useEffect(() => {
			getUsers('', query).then( res => setUsers( res ) );
		}, [ query ]);
		
		return (
				<div>
					<OutletHeader newLink={'/users/new'} newText={'Add User'} query={ query } setQuery={ setQuery } />
					
					{ users.length > 0 && <UsersTable users={users} /> }
				</div>
		)
	} else {
		return navigate('/');
	}
}