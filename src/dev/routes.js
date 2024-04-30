import Dashboard from "../pages/dashboard/Dashboard";
import PeriodList from "../pages/accreditationPeriod/PeriodList";
import CreateAccreditationPeriod from "../pages/accreditationPeriod/CreateAccreditationPeriod";
import EditAccreditationPeriod from "../pages/accreditationPeriod/EditAccreditationPeriod";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "داشبورد",
    icon: " fa fa-dashboard",
    component: <Dashboard />,
    isMenu: true
  },
  {
    path: "/accreditation-period",
    name: "accreditationPeriod",
    rtlName: "دوره های اعتباربخشی",
    icon: " fa fa-pen",
    component: <PeriodList />,
    isMenu: true
  },
  {
    path: "/create-accreditation-period",
    name: "accreditationPeriod",
    rtlName: "دوره های اعتباربخشی",
    icon: " fa fa-pen",
    component: <CreateAccreditationPeriod />,
    isMenu: false
  },
  {
    path: "/edit-accreditation-period/:id",
    name: "accreditationPeriod",
    rtlName: "دوره های اعتباربخشی",
    icon: " fa fa-pen",
    component: <EditAccreditationPeriod />,
    isMenu: false
  },
];
export default routes;
