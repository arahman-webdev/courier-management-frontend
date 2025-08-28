

import type { ISidebarItem } from "@/types";
import { Package, PackagePlus} from "lucide-react";
import { lazy } from "react";

// import { lazy } from "react";

const CreateParcel = lazy(() => import("@/pages/sender/CreateParcel"))
const ViewAll = lazy(() => import("@/pages/sender/ViewAll"))




export const senderSidebarItems: ISidebarItem[] =

  [
    {
      title: "Dashboard",
      items: [

      ],

    },

    {
      title: "Curier-Management",
      items: [
        {
          title: "Create Parcel",
          url: "/sender/create-parcel",
          Component: CreateParcel,
          icon: PackagePlus,   // 📦➕ create new package
        },
        {
          title: "View Parcels",
          url: "/sender/view-parcel",
          Component: ViewAll,
          icon: Package,      
        },


      ]
    },
  ]

