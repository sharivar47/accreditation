import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import RTLNavbar from "./Navbar";
import routes from "../../dev/routes";
function Layout(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
    // const [sidebarOpened, setsidebarOpened] = React.useState(
    //     document.documentElement.className.indexOf("nav-open") !== -1
    // );
    let btnSt = true
    const toggleSidebar = () => {
        if(btnSt === true) {
            document.querySelector('.toggle span').classList.add('toggle');
            document.getElementById('sidebar').classList.add('sidebar-show');
            document.getElementById('content').classList.add('content-close');
            btnSt = false;
        } else if(btnSt === false) {
            document.querySelector('.toggle span').classList.remove('toggle');
            document.getElementById('sidebar').classList.remove('sidebar-show');
            document.getElementById('content').classList.remove('content-close');
            btnSt = true;
        }
    };
    // const toggleSidebar = () => {
    //     document.documentElement.classList.toggle("nav-open");
    //     setsidebarOpened(!sidebarOpened);
    // };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
      <div className="wrapper">
              <RTLNavbar
                  brandText={getBrandText(location.pathname)}
                  toggleSidebar={toggleSidebar}
              />

              <Sidebar
                  routes={routes}
                  toggleSidebar={toggleSidebar}
              />
              <div className="main-panel" ref={mainPanelRef} >
                  <div id="content" className="content">
                      <Routes>
                          {getRoutes(routes)}
                          <Route
                              path="/"
                              element={<Navigate to="/dashboard" replace />}
                          />
                      </Routes>
                  </div>
              </div>
          </div>
  );
}
export default Layout;

