import App from "@/App";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FaqPage from "@/pages/Faq";
import Faq from "@/pages/Faq";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import { generateRoutes } from "@/utills/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./admin-sidebar";
import LoginPage from "@/pages/LoginPage";
import Register from "@/pages/Register";
import { receiverSidebarItems } from "./receiver-sidebar";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utills/withAuth";
import { role } from "@/constant/constant";
import type { TRole } from "@/types";
import PublicRoute from "./PublicRoute";
import { senderSidebarItems } from "./sender-sidebar";

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
                path: '/faq',
                Component: Faq
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
        ],


    },
    {
        Component: withAuth(DashboardLayout, role.admin as TRole),
        path: "/admin",
        children: [
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.receiver as TRole),
        path: "/receiver",
        children: [
            ...generateRoutes(receiverSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.sender as TRole),
        path: "/sender",
        children: [
            ...generateRoutes(senderSidebarItems)
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