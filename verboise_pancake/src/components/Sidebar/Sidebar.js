import React, { useEffect } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router'

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
                    <a className="nav-link" onClick={() => history.push('/dashboard/event')}>
                        <HomeIcon />
                        <span className="menu-title">HOME PAGE</span>
                    </a>
                </li>
                <li className={'nav-item'}>
                    <a className="nav-link" onClick={() => history.push('/dashboard/poll')}>
                        <HomeIcon />
                        <span className="menu-title">POLL </span>
                    </a>
                </li>


            </ul>
        </nav>
    );

}

export default Sidebar;





