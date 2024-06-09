import Dashboard from "../pages/dashboard/Dashboard";
import PeriodList from "../pages/accreditationPeriod/PeriodList";
import CreateAccreditationPeriod from "../pages/accreditationPeriod/CreateAccreditationPeriod";
import EditAccreditationPeriod from "../pages/accreditationPeriod/EditAccreditationPeriod";
import Login from "../pages/authentication/Login";
import AxisList from "../pages/axis/AxisList";
import CreateAxis from "../pages/axis/CreateAxis";
import EditAxis from "../pages/axis/EditAxis";
import SubAxisList from "../pages/subAxis/SubAxisList";
import EditSubAxis from "../pages/subAxis/EditSubAxis";
import CreateSubAxis from "../pages/subAxis/CreateSubAxis";
import StandardList from "../pages/standard/StandardList";
import CreateStandard from "../pages/standard/CreateStandard";
import EditStandard from "../pages/standard/EditStandard";

let routes = [
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
    rtlName: "ایجاد دوره های اعتباربخشی",
    icon: " fa fa-pen",
    component: <CreateAccreditationPeriod />,
    isMenu: false
  },
  {
    path: "/edit-accreditation-period/:id",
    name: "accreditationPeriod",
    rtlName: "ویرایش دوره های اعتباربخشی",
    icon: " fa fa-pen",
    component: <EditAccreditationPeriod />,
    isMenu: false
  },
  {
    path: "/axises",
    name: "axisList",
    rtlName: "لیست محورها",
    icon: " fa fa-pen",
    component: <AxisList />,
    isMenu: false
  },
  {
    path: "/create-axis",
    name: "createAxis",
    rtlName: "ایجاد محور",
    icon: " fa fa-pen",
    component: <CreateAxis />,
    isMenu: false
  },
  {
    path: "/edit-axis/:id",
    name: "editAxis",
    rtlName: "ویرایش محور",
    icon: " fa fa-pen",
    component: <EditAxis />,
    isMenu: false
  },
  {
    path: "/sub-axises",
    name: "subAxis",
    rtlName: "زیر محور",
    icon: " fa fa-pen",
    component: <SubAxisList />,
    isMenu: false
  },
  {
    path: "/edit-sub-axis/:id",
    name: "editSubAxis",
    rtlName: "ویرایش زیر محور",
    icon: " fa fa-pen",
    component: <EditSubAxis />,
    isMenu: false
  },
  {
    path: "/create-sub-axis",
    name: "createSubAxis",
    rtlName: "ایجاد زیر محور",
    icon: " fa fa-pen",
    component: <CreateSubAxis />,
    isMenu: false
  },
  {
    path: "/standards",
    name: "standards",
    rtlName: "استاندارد",
    icon: " fa fa-pen",
    component: <StandardList />,
    isMenu: false
  },
  {
    path: "/create-standard",
    name: "createStandard",
    rtlName: "ایجاداستاندارد",
    icon: " fa fa-pen",
    component: <CreateStandard />,
    isMenu: false
  },
  {
    path: "/edit-standard/:id",
    name: "editStandard",
    rtlName: "ویرایش استاندارد",
    icon: " fa fa-pen",
    component: <EditStandard />,
    isMenu: false
  },
];
export default routes;
