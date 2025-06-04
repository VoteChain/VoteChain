// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import "./aside.css";

// // Components
// import Button from "../Button/Button";
// import { IoClose } from "react-icons/io5";
// import { RiMenu4Fill } from "react-icons/ri";

// function Aside({ objs, showLogo = true, active, buttonConf }) {
//   const [opened, setOpened] = useState(false);

//   const [currentClass, setCurrentClass] = useState("");
//   const asideRef = useRef(null);

//   // Check the width and update the className
//   useEffect(() => {
//     const div = asideRef.current;

//     const updateClassBasedOnWidth = () => {
//       const width = div.offsetWidth;

//       if (width < 500) {
//         setCurrentClass("mobile");
//       } else if (width >= 500 && width < 570) {
//         setCurrentClass("tab");
//       } else {
//         setCurrentClass("desktop");
//       }
//     };

//     // Use ResizeObserver to watch for element size changes
//     const resizeObserver = new ResizeObserver(updateClassBasedOnWidth);
//     resizeObserver.observe(div);

//     // Initial call to set class
//     updateClassBasedOnWidth();

//     // Cleanup
//     return () => resizeObserver.disconnect();
//   }, []);

//   return (
//     <div
//       ref={asideRef}
//       className={`aside ${currentClass} ${opened ? "opened" : "closed"}`}
//     >
//       {showLogo && (
//         <div className="logo">
//           <Link to="/">
//             <h3>VoteChain</h3>
//           </Link>
//         </div>
//       )}
//       <div className={`right ${opened ? "opened" : "closed"}`}>
//         <div className="tabs" id="tabs">
//           {objs.map((obj) =>
//             obj.type === "button" ? (
//               <Link
//                 key={obj.link}
//                 to={obj.link}
//                 className={`tab ${active === obj.link ? "active" : ""}`}
//               >
//                 <button>{obj.name}</button>
//               </Link>
//             ) : (
//               <Link
//                 key={obj.link}
//                 to={obj.link}
//                 className={`tab ${active === obj.link ? "active" : ""}`}
//               >
//                 {obj.name}
//               </Link>
//             )
//           )}
//         </div>
//         {buttonConf && (
//           <div className="others">
//             <Button
//               title={buttonConf.title}
//               handleClick={buttonConf.handleClick}
//               theme={"primary"}
//             />
//           </div>
//         )}
//       </div>
//       <div onClick={() => setOpened(!opened)} className="toggle">
//         {opened ? (
//           <i>
//             <IoClose />
//           </i>
//         ) : (
//           <i>
//             <RiMenu4Fill />
//           </i>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Aside;

// // return (
// //   <StyledAside className={`aside ${opened ? "opened" : "closed"}`}>
// //     <div className="logo">
// //       <a href="/">
// //         <h3>VoteChain</h3>
// //       </a>
// //     </div>
// //     <div className={`right ${opened ? "opened" : "closed"}`}>
// //       <div className="tabs" id="tabs">
// //         {props.objs.map((obj) => (
// //           <a
// //             key={obj.link}
// //             href={obj.link}
// //             className={`tab ${props.active === obj.link ? "active" : ""}`}
// //           >
// //             {obj.name}
// //           </a>
// //         ))}
// //       </div>
// //       {props.button ? (
// //         <Widget
// //           src="abnakore.near/widget/Button"
// //           props={{
// //             title: props.button.name,
// //             handleClick: () => (location.href = props.button.link),
// //             theme: "primary",
// //           }}
// //         />
// //       ) : null}
// //     </div>
// //     <div onClick={() => setOpened(!opened)} className="toggle">
// //       <i>X</i>
// //     </div>
// //   </StyledAside>
// // );

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaVoteYea,
  FaUser,
  FaBell,
  FaSearch,
  FaBars,
  FaTimes,
  FaChartBar,
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";

import "./aside.css";

const Aside = ({
  navLinks = [
    { path: "/", name: "Home", icon: <RiDashboardFill /> },
    // { path: "/votes", name: "All Votes", icon: <FaVoteYea /> },
    { path: "/create", name: "Create Vote", icon: <IoCreateOutline /> },
    { path: "/results", name: "Results", icon: <FaChartBar /> },
  ],
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          {/* <FaVoteYea className="logo-icon" /> */}
          <img src="/images/_logo0.png" className="logo-icon" />
          {/* <img src="/images/logo0_nbg.png" className="logo-icon" /> */}
          <span>VoteChain</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* User Controls (Desktop) */}
        <div className="navbar-controls">
          <button className="notification-btn">
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
          <div className="user-profile" onClick={() => navigation("/profile")}>
            <FaUser />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {/* Mobile Navigation Links */}
          <div className="mobile-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-link ${
                  location.pathname === link.path ? "active" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile User Controls */}
          <div className="mobile-controls">
            <button className="notification-btn">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <button
              className="user-profile-btn"
              onClick={() => navigation("/profile")}
            >
              <FaUser /> My Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Aside;
