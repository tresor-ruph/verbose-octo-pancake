import React from 'react'
import renderer from 'react-test-renderer'
import AdminNavbarUI  from './../../components/Navbars/UI/AdminNavbarUI'

it('renders correctly', () => {
    const AdminNavbarSnap = renderer.create(<AdminNavbarUI />).toJSON();
    expect(AdminNavbarSnap).toMatchSnapshot();

});