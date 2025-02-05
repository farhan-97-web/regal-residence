import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import AuthProvider from './AuthProvider/AuthProvider';
import { ToastContainer } from 'react-toastify';

import AllProperty from './pages/AllProperty.jsx';
import AddProperty from './components/Dashboard/Agent/AddProperty.jsx';
import Dashboard from './Layout/Dashboard.jsx';
import AgentProfile from './components/Dashboard/Agent/AgentProfile.jsx';
import MyAdded from './components/Dashboard/Agent/MyAdded.jsx';
import Mysold from './components/Dashboard/Agent/Mysold.jsx';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Details from './pages/Details.jsx';
import UserReview from './components/Dashboard/User/UserReview.jsx';
import PropBought from './components/Dashboard/User/PropBought.jsx';
import Wishlist from './components/Dashboard/User/Wishlist.jsx';
import UserProfile from './components/Dashboard/User/UserProfile.jsx';
import BuyForm from './components/Dashboard/User/BuyForm.jsx';
import ReqProperty from './components/Dashboard/Agent/ReqProperty.jsx';
import AdminProfile from './components/Dashboard/Admin/AdminProfile.jsx';
import ManageProperty from './components/Dashboard/Admin/ManageProperty.jsx';
import ManageReview from './components/Dashboard/Admin/ManageReview.jsx';
import ManageUsers from './components/Dashboard/Admin/ManageUsers.jsx';
import Update from './pages/Update.jsx';
import Payment from './components/Dashboard/payment/Payment.jsx';
import Error from './components/ErrorPage/Error.jsx';
import PrivetRoute from './PrivetRoute/PrivetRoute.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<Error></Error>,
    children:[{
      path:'/',
      element: <Home></Home>,
    },
    {
      
        path:'/login',
        element: <Login></Login>,
       
    },
    {
      
        path:'/register',
        element: <Registration></Registration>,
       
    },
    {
      
        path:'/all-property',
        element: <PrivetRoute><AllProperty></AllProperty></PrivetRoute>,
       
    },
    {
      
        path:'/properties/:id',
        element: <PrivetRoute><Details></Details></PrivetRoute>,
       
       
    },
   
    
  ]
  },
  {
    path:'/dashboard',
    element:<Dashboard></Dashboard>,
    errorElement: <Error></Error>,
    children:[
      {
      path:'/dashboard/add-property',
      element:<AddProperty></AddProperty>
    },
    {
      path:'/dashboard/agent-profile',
      element:<AgentProfile></AgentProfile>
    },
    {
      path:'/dashboard/my-added',
      element:<MyAdded></MyAdded>
      
    },
    {
      path:'/dashboard/my-sold',
      element:<Mysold></Mysold>
    },
    {
      path:'/dashboard/req-property',
      element:<ReqProperty></ReqProperty>
    },
    {
      path:'/dashboard/user-profile',
      element:<UserProfile></UserProfile>
    },
    {
      path:'/dashboard/user-wishlist',
      element:<Wishlist></Wishlist>
    },
    {
      path:'/dashboard/buy/:id',
      element:<BuyForm></BuyForm>
    },
    {
      path:'/dashboard/property-bought',
      element:<PropBought></PropBought>
    },
    {
      path:'/dashboard/user-review',
      element:<UserReview></UserReview>
    },
    {
      path:'/dashboard/admin-profile',
      element:<AdminProfile></AdminProfile>
    },
    {
      path:'/dashboard/admin-manage-user',
      element:<ManageUsers></ManageUsers>
    },
    {
      path:'/dashboard/admin-manage-property',
      element:<ManageProperty></ManageProperty>
    },
    {
      path:'/dashboard/admin-manage-review',
      element:<ManageReview></ManageReview>
    },
    {
      path:'/dashboard/update/:id',
      element:<Update></Update>
    },
    {
      path:'/dashboard/payment/:id',
      element:<Payment></Payment>
    },
  ]
  }
]);
// Create a client
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <QueryClientProvider client={queryClient}>
   <RouterProvider router={router} />
   </QueryClientProvider>
   <ToastContainer></ToastContainer>
   </AuthProvider>
  </StrictMode>,
)
