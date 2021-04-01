


import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";


const dashboardRoutes = [
 
  {
    path: "/home/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "",
  },
  {
    path: "/home/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "",
  },
  {
    path: "/home/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "",
  },
  {
    path: "/home/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "",
  },
  {
    path: "/home/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "",
  },
  
];

export default dashboardRoutes;
