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
    url: '/profile/about',
    icon: "icon-user"
  },
  {
    title: true,
    name: "Project's Management"
  },
  {
    name: "Personal Collabs",
    icon: "icon-star",
    children: [
      {
        name: "All Collaborations",
        url: "/collaborations",
        icon: "icon-puzzle"
      },
    ]
  },
  {
    name: "Assigned Collabs",
    icon: "icon-star",
    children: [
      {
        name: "New",
        url: "/collaborations/pending-collaborations",
        icon: "icon-puzzle"
      },
      {
        name: "Accepted",
        url: "/collaborations/accepted-collaborations",
        icon: "icon-puzzle"
      },
      {
        name: "Rejected",
        url: "/collaborations/rejected-collaborations",
        icon: "icon-puzzle"
      },
    ]
  },
  {
    name: "Add Collaboration",
    url: "/collaborations/add-collaboration",
    icon: "icon-puzzle"
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
