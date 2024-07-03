import React from 'react';
import ProtectedRoute from "@/Helpers/ProtectedRoute.jsx";

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
        element: <Home/>
    },
    {
        path: '/about',
        element: <About/>
    },
    {
        path: '/search/:category?/:subCategory?',
        element: <SearchPage/>
    },
    {
        path: 'post/:id',
        element: <Product/>
    },
    {
        path: 'user/:miniPage?',
        element: <ProtectedRoute component={UserProfileContainer}/>
    },
    {
        path: '/create/:id?',
        element: <ProtectedRoute component={CreatePost}/>
    },
];

export default AppRoutes;