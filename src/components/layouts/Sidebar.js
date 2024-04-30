import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Nav } from "reactstrap";

function Sidebar(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const { routes } = props;

  return (
     <div id="sidebar" className="sidebar">
          <div className="sidebar-wrapper" ref={sidebarRef}>
            <Nav>
              {routes.filter(item => item.isMenu).map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li
                    className={
                      activeRoute(prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      onClick={props.toggleSidebar}
                    >
                      <i className={prop.icon} />
                      <p>{ prop.rtlName }</p>
                    </NavLink>
                  </li>
                );
              })}
            </Nav>
          </div>
        </div>
  );
}

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default Sidebar;
