import {useNavigate} from "react-router-dom";

export default function Users({ cookies }) {
	const navigate = useNavigate();
	
	if ( cookies.permission === 'admin' ) {
	
	} else {
		return navigate('/');
	}
}