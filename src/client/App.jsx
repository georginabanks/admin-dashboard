import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import DashboardSidebar from "./admin/DashboardSidebar";
import Dashboard from "./admin/Dashboard";
import Pages from "./admin/Pages";
import Posts from "./admin/Posts";

export default function App() {
    
    // Login State
    
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    
    function addHours (dt, h){
        const d = new Date(dt);
        d.setHours(d.getHours() + h);
        return d;
    }
    
    function handleLogin(user) {
        setCookie("user", {
            username: user,
            expires: addHours(new Date(), 4)
        }, {
            path: "/",
            maxAge: 4 * 60 * 60
        });
    }
    
    function handleLogout() {
        removeCookie("user");
        return <Navigate to="/login" replace state={{path: location.pathname}}/>
    }
    
    function timeout() {
        if (new Date(cookies.user.expires) < new Date()) {
            handleLogout()
        }
    }
    
    if (cookies.user) {
        setTimeout(timeout, 1000 * 60 * 15);
    }
    
    
    // Dashboard Layout
    
    const DashboardLayout = () => {
        return (
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <DashboardSidebar />
                    </div>
                    <div className={"col-md-9"}>
                        <Outlet />
                    </div>
                </div>
        )
    }
    
    return (
            <Routes >
                
                <Route path={"/"} element={<DashboardLayout />}>
                    <Route path={""} element={<Dashboard />} />
                    <Route path={"pages"} element={<Pages />} />
                    <Route path={"posts"} element={<Posts />} />
                </Route>
            
            </Routes>
    )
}
