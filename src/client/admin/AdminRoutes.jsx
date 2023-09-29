import {Route, Routes} from "react-router-dom";
import {DashboardLayout} from "./DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Pages from "./pages/Pages.jsx";
import EditPage from "./pages/editing/EditPage.jsx";
import Posts from "./pages/Posts.jsx";
import EditPost from "./pages/editing/EditPost.jsx";
import Images from "./pages/Images.jsx";
import Upload from "./pages/editing/Upload.jsx";
import EditImage from "./pages/editing/EditImage.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import EditTestimonial from "./pages/editing/EditTestimonial.jsx";
import Users from "./pages/Users.jsx";
import EditUser from "./pages/editing/EditUser.jsx";
import Settings from "./pages/Settings.jsx";
import './AdminRoutes.css';

export default function AdminRoutes({ cookies, handleLogin, handleLogout }) {
    return (
            <Routes>
                <Route path={''} element={<DashboardLayout handleLogin={handleLogin} handleLogout={handleLogout}
                                                           cookies={cookies.user}/>}>
                
                    <Route path={''} element={<Dashboard cookies={cookies.user}/>}/>
                
                    <Route path={'pages'} element={<Pages/>}/>
                    <Route path={'pages/:pageId/edit'} element={<EditPage showDelete={true} cookies={cookies.user}/>}/>
                    <Route path={'pages/new'} element={<EditPage showDelete={false} cookies={cookies.user}/>}/>
                
                    <Route path={'posts'} element={<Posts/>}/>
                    <Route path={'posts/:postId/edit'} element={<EditPost showDelete={true} cookies={cookies.user}/>}/>
                    <Route path={'posts/new'} element={<EditPost showDelete={false} cookies={cookies.user}/>}/>
                
                    <Route path={'images'} element={<Images/>}/>
                    <Route path={'images/upload'} element={<Upload/>}/>
                    <Route path={'images/:imageId/edit'} element={<EditImage/>}/>
                
                    <Route path={'testimonials'} element={<Testimonials/>}/>
                    <Route path={'testimonials/:testimonialId/edit'}
                           element={<EditTestimonial showDelete={true}/>}/>
                    <Route path={'testimonials/new'} element={<EditTestimonial showDelete={false}/>}/>
                
                    <Route path={'users'} element={<Users cookies={cookies.user}/>}/>
                    <Route path={'users/new'} element={<EditUser/>}/>
                    <Route path={'users/:username/edit'} element={<EditUser/>}/>
                
                    <Route path={'settings'} element={<Settings cookies={cookies.user} updateUser={handleLogin} />}/>
                </Route>
            </Routes>
    )
}