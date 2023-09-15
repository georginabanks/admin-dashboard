import "./styles.css";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
	return (
			<div className={"row"}>
				<div className={"col-md-3"}>
					<DashboardSidebar />
				</div>
				<div className={"col-md-9 outlet"}>
					<Outlet />
				</div>
			</div>
	)
}