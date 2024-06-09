import React from "react";

import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  InputGroup,
  Navbar,
  NavLink,
  Nav,
  Container,
  NavbarToggler, NavItem,
} from "reactstrap";
import {useDispatch} from "react-redux";
import {setToken} from "../../dev/redux/userInfoSlice";

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const dispatch = useDispatch();
  const toggleCollapse = () => {
    setcollapseOpen(!collapseOpen);
  };
  const logout = () => {
    dispatch(setToken(""))
  }
  return (
    <>
      <Navbar className="default-header"  expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <button onClick={props.toggleSidebar} type="button" className="toggle" id="toggle">
              <span></span>
            </button>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto nav-right">
              <NavItem className="w-100">
              </NavItem>
            </Nav>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav>
                {/*<DropdownToggle*/}
                {/*  caret*/}
                {/*  color="default"*/}
                {/*  data-toggle="dropdown"*/}
                {/*  nav*/}
                {/*>*/}
                {/*  <div className="notification d-none d-lg-block d-xl-block" />*/}
                {/*  <i className="tim-icons icon-sound-wave" />*/}
                {/*  <p className="d-lg-none">Notifications</p>*/}
                {/*</DropdownToggle>*/}
                <DropdownMenu className="dropdown-navbar" tag="ul" right>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Mike John responded to your email
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      You have 5 more tasks
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Your friend Michael is in town
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another notification
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another one
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require("../../assets/img/anime3.png")} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" tag="ul">
                  {/*<NavLink tag="li">*/}
                  {/*  <DropdownItem className="nav-item">Profile</DropdownItem>*/}
                  {/*</NavLink>*/}
                  {/*<NavLink tag="li">*/}
                  {/*  <DropdownItem className="nav-item">Settings</DropdownItem>*/}
                  {/*</NavLink>*/}
                  {/*<DropdownItem divider tag="li" />*/}
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={logout}>خروج</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      {/*<div className="breadcrumb-container"><Breadcrumb/></div>*/}
    </>
  );
}

export default AdminNavbar;
