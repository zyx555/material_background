import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Nav from '../pages/Home/Nav';
import Commodity from '../pages/Home/Commodity';
import HomePage from '../pages/Home/Commodity/HomePage'
import BatchIncrease from '../pages/Home/Commodity/BatchIncrease';
import Increase from '../pages/Home/Commodity/Increase';
import Category from '../pages/Home/Category';
import HomePage2 from "../pages//Home/Category/HomePage";
import BatchIncrease2 from '../pages/Home/Category/BatchIncrease';
import Increase2 from '../pages/Home/Category/Increase';
import User from '../pages/Home/User';
import Increase4 from '../pages/Home/User/Increase';
import HomePage4 from '../pages/Home/User/HomePage'
import Price from '../pages/Home/Price';
import ServiceFee from '../pages/Home/ServiceFee';
import Increase3 from '../pages/Home/ServiceFee/Increase';
import HomePage3 from '../pages/Home/ServiceFee/HomePage'


export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children:[
      {
        path:'/home/nav',
        element:<Nav />
      },
      {
        path:'/home/commodity',
        element:<Commodity/>,
        children:[
          {
            path:'/home/commodity/homePage',
            element:<HomePage/>
          },
          {
            path:'/home/commodity/increase',
            element:<Increase/>
          },
          {
            path:'/home/commodity/batchIncrease',
            element:<BatchIncrease/>
          }
        ]
      },
      {
        path:'/home/category',
        element:<Category/>,
        children:[
          {
            path:'/home/category/homePage',
            element:<HomePage2/>
          },
          {
            path:'/home/category/increase',
            element:<Increase2/>
          },
          {
            path:'/home/category/batchIncrease',
            element:<BatchIncrease2/>
          }
        ]
      },
      {
        path:'/home/price',
        element:<Price/>
      },
      {
        path:'/home/user',
        element:<User/>,
        children:[
          {
            path:'/home/user/homePage',
            element:<HomePage4/>
          },
          {
            path:'/home/user/increase',
            element:<Increase4/>
          }
        ]
      },
      {
        path:'/home/serviceFee',
        element:<ServiceFee/>,
        children:[
          {
            path:'/home/serviceFee/increase',
            element:<Increase3/>
          },
          {
            path:'/home/serviceFee/homePage',
            element:<HomePage3/>
          }
        ]
      }
    ]
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },

];
