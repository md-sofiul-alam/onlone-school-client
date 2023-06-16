import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import Classes from '../pages/Classes/Classes'
import SelectedClass from '../pages/Student/SelectedClass'
import EnrolledClass from '../pages/Student/EnrolledClass'
import Payment from '../pages/Student/Payment'
import AddClass from '../pages/Instructor/AddClass'
import MyClasses from '../pages/Instructor/MyClasses'
import ManageClass from '../pages/Admin/ManageClass'
import ManageUsers from '../pages/Admin/ManageUsers'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import Dashboard from '../Dashboard/Dashboard'
import SignUp from '../pages/SignUp/SignUp'
import Login from '../pages/Login/Login'
import Instructors from '../pages/Instructor/Instructors'
import ClassDetails from '../components/ClassDetails'
import PrivateRoute from './PrivateRoute'
import PaymentHistory from '../pages/Student/PaymentHistory'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/instructors',
        element: <Instructors />,
        loader: () => fetch('https://eee-school.vercel.app/users')
      },
      {
        path: '/classes',
        element: <Classes />,
        loader: () => fetch('https://eee-school.vercel.app/classes')
      },
      {
        path: '/classDetails/:id',
        element: <PrivateRoute><ClassDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://eee-school.vercel.app/classes/${params.id}`)
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          {
            path: 'selectedClass',
            element: <SelectedClass />
          },
          {
            path: 'enrolledClass',
            element: <EnrolledClass />
          },
          {
            path: 'payment',
            element: <Payment />
          },
          {
            path: 'paymentHistory',
            element: <PaymentHistory />
          },
          {
            path: 'addClass',
            element: <AddClass />
          },
          {
            path: 'myClass',
            element: <MyClasses />
          },
          {
            path: 'manageClass',
            element: <ManageClass />,
            loader: () => fetch('https://eee-school.vercel.app/classes')
          },
          {
            path: 'manageUsers',
            element: <ManageUsers />,
            loader: () => fetch('https://eee-school.vercel.app/users')
          }
        ]
      }
    ]
  },
])
