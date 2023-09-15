import "./styles.css";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
	return (
			<div>
				<DashboardSidebar />
				
				<div className={'outlet'}>
					<Outlet />
					<div className={'footer'}>
						Copyright © Georgina Banks {new Date().getFullYear()}
					</div>
				</div>
			</div>
	)
}