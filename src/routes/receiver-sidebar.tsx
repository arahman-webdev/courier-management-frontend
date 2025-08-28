
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
// import { lazy } from "react";

const ViewParcels = lazy(() => import("@/pages/receiver/ViewParcels"))




export const receiverSidebarItems: ISidebarItem[] = 

  [
    {
      title: "My Dashboard",
      items: [

        {
          title: "View Parcells",
          url: "/receiver/view-parcels",
          Component: ViewParcels
        },


      ],
      
    },

 
  ]

