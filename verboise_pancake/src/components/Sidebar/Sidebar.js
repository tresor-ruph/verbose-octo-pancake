import React, { useEffect } from 'react';
import  HomeIcon   from '@material-ui/icons/Home';
import {useHistory} from 'react-router'

const Sidebar = () => {
    const history = useHistory()
    useEffect(() => {

        const body = document.querySelector('body');
        document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

            el.addEventListener('mouseover', function () {
                if (body.classList.contains('sidebar-icon-only')) {
                    el.classList.add('hover-open');
                }
            });
            el.addEventListener('mouseout', function () {
                if (body.classList.contains('sidebar-icon-only')) {
                    el.classList.remove('hover-open');
                }
            });
        });
    }, [])
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
                <a className="sidebar-brand brand-logo" href=""><span>OCTO PANCAKE</span></a>
            </div>
            <hr />
            <ul className="nav">

                <li className={'nav-item'}>
                    <a  className="nav-link"  onClick={()=>history.push('/dashboard')}>
                        <HomeIcon />
                        <span className="menu-title">HOME PAGE</span>
                    </a>
                </li>
               

            </ul>
        </nav>
    );




}

export default Sidebar;









// import React from "react";
// import { useLocation, NavLink } from "react-router-dom";

// import { Nav } from "react-bootstrap";
// function Sidebar({ color, image, routes }) {
//   const location = useLocation();
//   const activeRoute = (routeName) => {
//     return location.pathname.indexOf(routeName) > -1 ? "active" : "";
//   };
//   return (
//     <div className="sidebar" data-image={image} data-color={color}>
//       <div
//         className="sidebar-background"

//       />
//       <div className="sidebar-wrapper">
//         <div className="logo d-flex align-items-center justify-content-start">

//           <h3>Octo-panc</h3>
//         </div>
//         <Nav>
//           {routes.map((prop, key) => {
//             if (!prop.redirect)
//               return (
//                 <li
//                   className={
//                     prop.upgrade
//                       ? "active active-pro"
//                       : activeRoute(prop.layout + prop.path)
//                   }
//                   key={key}
//                 >
//                   <NavLink
//                     to={prop.layout + prop.path}
//                     className="nav-link"
//                     activeClassName="active"
//                   >
//                     <i className={prop.icon} />
//                     <p>{prop.name}</p>
//                   </NavLink>
//                 </li>
//               );
//             return null;
//           })}
//         </Nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
