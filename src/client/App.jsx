import {Navigate, Routes, Route, Outlet} from "react-router-dom";
import { useCookies } from "react-cookie";
import { DashboardLayout } from "./admin/DashboardLayout";
import Dashboard from "./admin/pages/Dashboard";
import Pages from "./admin/pages/Pages";
import Posts from "./admin/pages/Posts";
import Upload from "./admin/pages/editing/Upload.jsx";
import Settings from "./admin/pages/Settings";
import Login from "./admin/pages/Login";
import Images from "./admin/pages/Images";
import Testimonials from "./admin/pages/Testimonials";
import EditTestimonial from "./admin/pages/editing/EditTestimonial.jsx";
import EditPage from "./admin/pages/editing/EditPage.jsx";
import EditPost from "./admin/pages/editing/EditPost.jsx";
import EditImage from "./admin/pages/editing/EditImage.jsx";
import {getUsers} from "./admin/api.jsx";
import Users from "./admin/pages/Users.jsx";
import EditUser from "./admin/pages/editing/EditUser.jsx";
import AdminRoutes from "./admin/AdminRoutes.jsx";
import ErrorPage from "./admin/ErrorPage.jsx";

export default function App() {
    
    // Login State
    
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    
    function addHours (dt, h){
        const d = new Date(dt);
        d.setHours(d.getHours() + h);
        return d;
    }
    
    async function handleLogin( username ) {
        const user = await getUsers( username );
        
        setCookie("user", {
            ...user[0],
            expires: addHours(new Date(), 4)
        }, {
            path: "/",
            maxAge: 4 * 60 * 60
        });
    }
    
    function handleLogout() {
        removeCookie("user", { path: '/' });
        return <Navigate to='/' replace state={{path: location.pathname}}/>
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
            <Routes>
                <Route path={'/admin//*'} element={<AdminRoutes cookies={ cookies.user } handleLogin={ handleLogin } handleLogout={ handleLogout} />} />
                <Route path={'/admin/login'} element={<Login handleLogin={ handleLogin } />} />
                
                <Route path={'*'} element={<ErrorPage />} />
            </Routes>
    )
}
