import React from 'react'
import renderer from 'react-test-renderer'
import Sidebar  from './../../components/Sidebar/Sidebar'

it('renders correctly', () => {
    const SidebarSnap = renderer.create(<Sidebar />).toJSON();
    expect(SidebarSnap).toMatchSnapshot();

});