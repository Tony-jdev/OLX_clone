import React from 'react';
const Home = React.lazy(() => import('./components/Pages/Home/Home'));
const SearchPage = React.lazy(() => import('@/components/Pages/SearchPage/SearchPage.jsx'));
const Product = React.lazy(() => import('@/components/Pages/Product/Product.jsx'));
const About = React.lazy(() => import('@/components/Pages/About/About.jsx'));
const Auth = React.lazy(() => import('@/components/Pages/Auth/Auth.jsx'));
const UserProfileContainer = React.lazy(() => import('@/components/Pages/UserProfileContainer/UserProfileContainer.jsx'));
const ProtectedRoute = React.lazy(() => import('@/Helpers/ProtectedRoute.jsx'));


const AppRoutes = [
    {
        index: true,
        path: '/',
        element: <Home/>
    },
    {
        path: '/auth',
        element: <Auth/>
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
        element: <ProtectedRoute element={<UserProfileContainer/>} />
    },
];

export default AppRoutes;