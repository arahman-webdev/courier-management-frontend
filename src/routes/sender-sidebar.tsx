// import AddTour from "@/pages/admin/AddTour";
// import Analytics from "@/pages/admin/Analytics";




import CreateParcel from "@/pages/sender/CreateParcel";
import Sender from "@/pages/sender/Sender";
import ViewAll from "@/pages/sender/ViewAll";
import type { ISidebarItem } from "@/types";
import { House, Package, PackagePlus, PackageX } from "lucide-react";
import { lazy } from "react";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/admin/Analytics"))
// const AddTour = lazy(() => import("@/pages/admin/AddTour"))

const CancelParcel = lazy(() => import("@/pages/sender/CancelParcel"))

export const senderSidebarItems: ISidebarItem[] =

  [
    {
      title: "Dashboard",
      icon: House,
      items: [
        {
          title: "HOME",
          icon: House,
          url: "/sender/analytic",
          Component: Sender
        },
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

