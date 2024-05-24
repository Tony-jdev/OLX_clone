import Home  from "./components/Pages/Home/Home";
import SearchPage from "@/components/Pages/SearchPage/SearchPage.jsx";
import About from "@/components/Pages/About/About.jsx";
import Product from "@/components/Pages/Product/Product.jsx";

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
];

export default AppRoutes;