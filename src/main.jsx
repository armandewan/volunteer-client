import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider} from "react-router-dom";
import { router } from './routs/router.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import VolunteerContext from './context/VolunteerContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <VolunteerContext><RouterProvider router={router} /></VolunteerContext>
  </StrictMode>,
)
