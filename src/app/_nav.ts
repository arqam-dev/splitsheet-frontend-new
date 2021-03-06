import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
  },
  {
    title: true,
    name: "Profile"
  },
  {
    name: "Personal Profile",
    url: '/profile',
    icon: "icon-user"
  },
  {
    title: true,
    name: "Project's Management"
  },
  {
    name: "Personal Projects",
    icon: "icon-envelope-open",
    children: [
      {
        name: "All Projects",
        url: "/collaborations",
        icon: "icon-drawer"
      },
    ]
  },
  {
    name: "Assigned Projects",
    icon: "icon-envelope-open",
    children: [
      {
        name: "New",
        url: "/collaborations/pending-collaborations",
        icon: "icon-drawer"
      },
      {
        name: "Accepted",
        url: "/collaborations/accepted-collaborations",
        icon: "icon-drawer"
      },
      {
        name: "Rejected",
        url: "/collaborations/rejected-collaborations",
        icon: "icon-drawer"
      },
      {
        name: "Completed",
        url: "/collaborations/done-collaborations",
        icon: "icon-drawer"
      },
    ]
  },
  {
    name: "Add Project",
    url: "/collaborations/add-collaboration",
    icon: "icon-plus"
  },
  {
    divider: true
  },
  // {
  //   title: true,
  //   name: "History"
  // },
  // {
  //   name: "Recent Activities",
  //   url: "/dashboard",
  //   icon: "icon-star",
  //   children: [
  //     {
  //       name: "Last Week",
  //       url: "/dashboard",
  //       icon: "icon-star"
  //     },
  //     {
  //       name: "Last Month",
  //       url: "/dashboard",
  //       icon: "icon-star"
  //     },
  //     {
  //       name: "Last Year",
  //       url: "/dashboard",
  //       icon: "icon-star"
  //     },
  //     {
  //       name: "Before Today",
  //       url: "/dashboard",
  //       icon: "icon-star"
  //     }
  //   ]
  // }
];
