import "./styles.css";
import DashboardSidebar from "./outletComponents/DashboardSidebar.jsx";
import { Outlet } from "react-router-dom";
import Login from "./pages/Login.jsx";

export const DashboardLayout = ({ handleLogin, handleLogout, cookies }) => {
	if ( cookies.user ) {
		return (
				<div>
					<DashboardSidebar logout={handleLogout}/>
					
					<div className={'outlet'}>
						<Outlet/>
						<div className={'footer'}>
							Copyright © Georgina Banks {new Date().getFullYear()}
						</div>
					</div>
				</div>
		)
	} else {
		return <Login handleLogin={ handleLogin } />
	}
}