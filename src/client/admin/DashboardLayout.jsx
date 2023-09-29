import "./AdminRoutes.css";
import DashboardSidebar from "./outletComponents/DashboardSidebar.jsx";
import { Outlet } from "react-router-dom";
import Login from "./pages/Login.jsx";

export const DashboardLayout = ({ handleLogin, handleLogout, cookies }) => {
	if ( cookies ) {
		return (
				<div className={'admin'}>
					<DashboardSidebar logout={handleLogout} cookies={ cookies } />
					
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