import Login from '../pages/Login'
import Home from "../pages/Home";
import HomeAdmin from "../pages/HomeAdmin";
import GoodControl from "../pages/goods/GoodControl";
import GoodsAssort from "../pages/goods/GoodsAssort";

import Redirect from "../hooks/useRouter"
import WaresAdd from "../pages/goods/WaresAdd"
import User from "../pages/User"
import Role from "../pages/Role";
import Cake from "../pages/graphical/Cake"
import Line from "../pages/graphical/Line";
import Cylinder from "../pages/graphical/Cylinder";
const route = [
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/home',
        element: <Home/>,
        children: [
            {
                path: 'admin',
                element: <HomeAdmin/>
            },

            {
                path: 'goodsAssort',
                element: <GoodsAssort/>
            },
            {
                path: 'goodsControl',
                element: <GoodControl/>
            },
            {
                path:'waresAdd',
                element: <WaresAdd/>
            },
            {
                path:'user',
                element: <User/>
            },
            {
                path:'role',
                element: <Role/>
            },
            {
                path:'cylinder',
                element: <Cylinder/>
            },
            {
                path:'line',
                element: <Line/>
            },
            {
                path:'cake',
                element: <Cake/>
            }
        ]
    },
    {
        path: "*",
        element: <Redirect to="/home"/>
    }
]
export default route
