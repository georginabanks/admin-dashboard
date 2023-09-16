import { Navigate, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { DashboardLayout } from "./admin/DashboardLayout";
import Dashboard from "./admin/pages/Dashboard";
import Pages from "./admin/pages/Pages";
import Posts from "./admin/pages/Posts";
import Upload from "./admin/Upload";
import Settings from "./admin/pages/Settings";
import Login from "./admin/pages/Login";

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
            ...user,
            expires: addHours(new Date(), 4)
        }, {
            path: "/",
            maxAge: 4 * 60 * 60
        });
    }
    
    function handleLogout() {
        removeCookie("user");
        return <Navigate to='/login' replace state={{path: location.pathname}}/>
    }
    
    function timeout() {
        if (new Date(cookies.user.expires) < new Date()) {
            handleLogout()
        }
    }
    
    if (cookies.user) {
        setTimeout(timeout, 1000 * 60 * 15);
    }
    
    return (
            <Routes >
                
                <Route path={'/'} element={<DashboardLayout handleLogout={handleLogout} cookies={cookies} />}>
                    <Route path={''} element={<Dashboard />} />
                    <Route path={'pages'} element={<Pages />} />
                    <Route path={'posts'} element={<Posts />} />
                    <Route path={'upload'} element={<Upload />} />
                    <Route path={'settings'} element={<Settings />} />
                    <Route path={'login'} element={<Login handleLogin={handleLogin} />} />
                </Route>
            
            </Routes>
    )
}
