import { Navigate, Routes, Route } from "react-router-dom";
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
import {getUsers} from "./api.jsx";
import Users from "./admin/pages/Users.jsx";
import EditUser from "./admin/pages/editing/EditUser.jsx";

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
                
                <Route path={'/'} element={<DashboardLayout handleLogin={ handleLogin } handleLogout={handleLogout}
                                                            cookies={cookies.user} />}>
                    
                    <Route path={''} element={<Dashboard cookies={cookies.user} />} />
                    
                    <Route path={'pages'} element={<Pages />} />
                    <Route path={'pages/:pageId/edit'} element={<EditPage showDelete={ true } />} />
                    <Route path={'pages/new'} element={<EditPage showDelete={ false } />} />
                    
                    <Route path={'posts'} element={<Posts />} />
                    <Route path={'posts/:postId/edit'} element={<EditPost showDelete={ true } />} />
                    <Route path={'posts/new'} element={<EditPost showDelete={ false } />} />
                    
                    <Route path={'images'} element={<Images />} />
                    <Route path={'images/upload'} element={<Upload />} />
                    <Route path={'images/:imageId/edit'} element={<EditImage />} />
                    
                    <Route path={'testimonials'} element={<Testimonials />} />
                    <Route path={'testimonials/:testimonialId/edit'} element={<EditTestimonial showDelete={ true } />} />
                    <Route path={'testimonials/new'} element={<EditTestimonial showDelete={ false } />} />
                    
                    <Route path={'users'} element={<Users cookies={ cookies.user } />} />
                    <Route path={'users/new'} element={<EditUser />} />
                    <Route path={'users/:username/edit'} element={<EditUser />} />
                    
                    <Route path={'settings'} element={<Settings cookies={ cookies.user } updateUser={ handleLogin } />} />
                </Route>
                
                <Route path={'login'} element={<Login handleLogin={handleLogin} />} />
            
            </Routes>
    )
}
