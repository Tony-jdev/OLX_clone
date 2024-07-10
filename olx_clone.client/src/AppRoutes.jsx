import React from 'react';
import ProtectedRoute from "@/Helpers/ProtectedRoute.jsx";
import AdminPage from "@/components/Pages/AdminPage/Admin.jsx";
import RestrictAdminRoute from "@/Helpers/RestrictedAdminRoute.jsx";

const Home = React.lazy(() => import('./components/Pages/Home/Home'));
const SearchPage = React.lazy(() => import('@/components/Pages/SearchPage/SearchPage.jsx'));
const Product = React.lazy(() => import('@/components/Pages/Product/Product.jsx'));
const About = React.lazy(() => import('@/components/Pages/About/About.jsx'));
const UserProfileContainer = React.lazy(() => import('@/components/Pages/UserProfileContainer/UserProfileContainer.jsx'));
const CreatePost = React.lazy(() => import('@/components/Pages/CreatePost/CreatePost.jsx'));

const AppRoutes = [
    {
        index: true,
        path: '/',
        element: <RestrictAdminRoute component={Home}/>
    },
    {
        path: '/about',
        element: <RestrictAdminRoute component={About}/>
    },
    {
        path: '/search/:category?/:subCategory?',
        element: <RestrictAdminRoute component={SearchPage}/>
    },
    {
        path: 'post/:id',
        element: <RestrictAdminRoute component={Product}/>
    },
    {
        path: 'user/:miniPage?',
        element: <ProtectedRoute component={UserProfileContainer}/>
    },
    {
        path: '/create/:id?',
        element: <ProtectedRoute component={CreatePost}/>
    },
    {
        path: '/admin',
        element: <AdminPage/>
    },
];

export default AppRoutes;
