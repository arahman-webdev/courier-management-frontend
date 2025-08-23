// import { role } from "@/constant/constant";
// import { adminSidebarItems } from "@/routes/admin-sidebar";
// import { userSidebarItems } from "@/routes/user-sidebar";
// import type { TRole } from "@/types";

import { role } from "@/constant/constant";
import { adminSidebarItems } from "@/routes/admin-sidebar";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.admin:
            return [...adminSidebarItems]
        case role.sender:
            return [...adminSidebarItems]
        case role.receiver:
            return [...adminSidebarItems]

        default:
            return [];
    }
}