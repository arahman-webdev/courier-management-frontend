import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Faq from "@/pages/Faq";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path:'/',
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
                path: '/contact',
                Component: Contact
            },
            {
                path: '/features',
                Component: Features
            }
        ]
    }
])


export default router