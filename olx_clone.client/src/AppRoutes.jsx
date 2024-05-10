import Home  from "./components/Pages/Home/Home";
import SearchPage from "@/components/Pages/SearchPage/SearchPage.jsx";
import About from "@/components/Pages/About/About.jsx";
import ProductInfo from "@/components/Tools/ProductInfo/ProductInfo.jsx";

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
        element: <ProductInfo/>
    },
];

export default AppRoutes;