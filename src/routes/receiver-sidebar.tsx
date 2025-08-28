// import AddTour from "@/pages/admin/AddTour";
// import Analytics from "@/pages/admin/Analytics";

import ViewDetail from "@/pages/receiver/Detail";

import Receiver from "@/pages/receiver/Receiver";
import ViewParcels from "@/pages/receiver/ViewParcels";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/admin/Analytics"))
// const AddTour = lazy(() => import("@/pages/admin/AddTour"))



export const receiverSidebarItems: ISidebarItem[] = 

  [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/receiver/analytice",
          Component: Receiver
        },

        {
          title: "View Parcells",
          url: "/receiver/view-parcels",
          Component: ViewParcels
        },

      ],
      
    },

 
  ]

