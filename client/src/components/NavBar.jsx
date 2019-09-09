import React, { Fragment } from "react";
import Upload from "./Upload.jsx";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

// import DownloadButton from './DownloadButton.jsx';

function NavBar() {
  return (
    <div id="navbar">
      <img
        id="navBarQL"
        src="https://cqlimage.s3-us-west-1.amazonaws.com/AngryKoala2.png"
      />
      <div id="rightnav">
        <NavLink id="navbarupload" to="/upload">
          Upload Results{" "}
        </NavLink>
        <a id="navbardownload" href="https://www.npmjs.com/" target="blank">
          Download ChaosQoaLa
        </a>
      </div>
    </div>
  );
}

export default NavBar;
