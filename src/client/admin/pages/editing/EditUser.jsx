import {useEffect, useState} from "react";
import PostData, {HandleChange} from "../../functions/PostData.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {getPermissions, getUsers} from "../../../api.jsx";
import _ from 'lodash';

export default function EditUser() {
	
	const navigate = useNavigate();
	const { username } = useParams();
	
	const [user, setUser] = useState({});
	const [permissions, setPermissions] = useState([]);
	const [buttons, setButtons] = useState({ saveButton: 'Save User' });
	
	useEffect(() => {
		username !== undefined && getUsers( username, '').then( res => setUser( res[0] ) );
		getPermissions().then( res => setPermissions( res ) );
	}, []);
	
	const handleChange = ( event ) => {
		HandleChange( event, user, setUser );
	}
	
	const handleSubmit = async ( event ) => {
		let data;
		
		if ( user.userId ) {
			data = await PostData( event, setButtons, buttons, 'saveButton', 'Save User',
					'Waiting...', 'User Saved', 'users/' + user.username, user,
					'userId', setUser);
		} else {
			data = await PostData( event, setButtons, buttons, 'saveButton', 'Save User',
					'Waiting...', 'User Created', 'users/new', user, 'userId',
					setUser);
		}
		
		data === 'success' && navigate('/admin/users');
	}
	
	return (
			<div>
				<a href={'/admin/users'}><i className="fa-solid fa-arrow-left fa-2xl"></i></a>
				
				<form onSubmit={ handleSubmit }>
					<div className={'row'}>
						<div className={'col-md-6'}>
							<div className="row mb-3">
								<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="name" name={'name'} onChange={ handleChange }
										   value={ user.name || '' } />
								</div>
							</div>
						</div>
						
						<div className={'col-md-6'}>
							<div className="row mb-3">
								<label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="email" name={'email'} onChange={ handleChange }
										   value={ user.email || '' } />
								</div>
							</div>
						</div>
					</div>
					
					<div className={'row'}>
						<div className={'col-md-6'}>
							<div className="row mb-3">
								<label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="username" name={'username'}
										   onChange={ handleChange } value={ user.username || '' } />
								</div>
							</div>
						</div>
						
						<div className={'col-md-6'}>
							<div className="row mb-3">
								<label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
								<div className="col-sm-10">
									<input type="password" className="form-control" id="password" name={'password'}
										   onChange={ handleChange } value={ user.password || '' } />
								</div>
							</div>
						</div>
					</div>
					
					<div className={'row'}>
						<div className={'col-md-6'}>
							<div className="row mb-3">
								<label htmlFor="permission" className="col-sm-3 col-form-label">Permissions</label>
								<div className="col-sm-9">
									<select className="form-select" aria-label="Select user permissions" name={'PermissionPermissionId'}
											onChange={ handleChange } value={ user.permissionId }>
										<option value={''}>--</option>
										{ permissions.length > 0 && permissions.map( p => {
											return <option value={ p.permissionId } key={ permissions.indexOf(p) }>
												{ _.startCase(p.permission) }
											</option>
										})}
									</select>
								</div>
							</div>
						</div>
						
						<div className={'col-md-6'}>
						
						</div>
					</div>
					
					<button type="submit" className="btn publish-button" style={{ marginTop: '1rem' }}>
						{ buttons.saveButton }
					</button>
				</form>
			</div>
	)
}