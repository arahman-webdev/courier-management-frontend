import App from "@/App";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import { generateRoutes } from "@/utills/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./admin-sidebar";
import { receiverSidebarItems } from "./receiver-sidebar";
import { withAuth } from "@/utills/withAuth";
import { role } from "@/constant/constant";
import type { TRole } from "@/types";
import PublicRoute from "./PublicRoute";
import { senderSidebarItems } from "./sender-sidebar";
import ParcelDetails from "@/pages/admin/ParcelDetails";
import ViewStatusLog from "@/pages/sender/ViewStatusLog";
import ViewDetail from "@/pages/receiver/Detail";

// const Analytics = lazy(() => import("@/pages/admin/Analytics"))
// const AddTour = lazy(() => import("@/pages/admin/AddTour"))

import { lazy } from "react";

const Home = lazy(()=> import("@/pages/Home"))
const About = lazy(()=> import("@/pages/About"))
const FaqPage = lazy(()=> import("@/pages/Faq"))
const Features = lazy(()=> import("@/pages/Features"))
const Contact = lazy(()=> import("@/pages/Contact"))
const LoginPage = lazy(()=> import("@/pages/LoginPage"))
const Register = lazy(()=> import("@/pages/Register"))
const Unauthorized = lazy(()=> import("@/pages/Unauthorized"))
const ParcelTracking = lazy(()=> import("@/pages/tracking/ParcelTracking"))


const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/about',
                Component: About
            },

            {
                path: '/features',
                Component: Features
            },
            {
                path: '/faq',
                Component: FaqPage
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path: '/tracking',
                Component: ParcelTracking
            },
        ],


    },
    {
        Component: withAuth(DashboardLayout, role.admin as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to='/admin/analytics' /> },
            ...generateRoutes(adminSidebarItems),
            {
                path: "parcels/:id",
                Component: ParcelDetails
            }

        ]
    },
    {
        Component: withAuth(DashboardLayout, role.receiver as TRole),
        path: "/receiver",
        children: [
             { index: true, element: <Navigate to='/receiver/view-parcels' /> },
            ...generateRoutes(receiverSidebarItems),
            {
                path: "/receiver/view-histroy/:id",
                Component: ViewDetail
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.sender as TRole),
        path: "/sender",
        children: [
            { index: true, element: <Navigate to='/sender/create-parcel' /> },
            ...generateRoutes(senderSidebarItems),
            {
                 path: '/sender/view-status-log/:id',
                Component: ViewStatusLog
            }
        ]
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        )
    },
    {
        path: '/register',
        element: (
            <PublicRoute>
                <Register />
            </PublicRoute>
        )
    },

    {
        path: '/unauthorized',
        Component: Unauthorized
    },
])


export default router


/**
* What to do to split router for admin, user and guider
* 
* at first: create generate route in the utills and map it to look dashboard layout
* create types for generate route in the type in the index.ts
* create admin sidebar in the route folder and take everithing that is in this from app-sidebar.tsx 
* 
*/