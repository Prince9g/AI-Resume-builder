import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import Signin from './components/Signin.jsx'
import App from './App.jsx'
import Builder from './components/Builder.jsx'
import Templates from './components/Templates.jsx'
import Homepage from './components/Homepage.jsx'
import Dashboard from './components/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage/>,
      },
      {
        path: '/builder',
        element: <Builder />,
      },
      {
        path: '/templates',
        element: <Templates/>,
      },
      {
        path: '*',
        element: <div>Page not found</div>,
      },
      {
        path: '/sign-up',
        element: <SignUp/>
      },
      {
        path: '/sign-in',
        element: <Signin/>,
      },
      {
        path: 'dashboard',
        element: <Dashboard/>,
      }
    ],
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
