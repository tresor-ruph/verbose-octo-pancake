import React from 'react'
import renderer from 'react-test-renderer'
import MainHeader  from '../../components/Error/UI/ConfirmEmailUI.jsx'

it('renders correctly', () => {
    const MainHeaderSnap = renderer.create(<MainHeader />).toJSON();
    expect(MainHeaderSnap).toMatchSnapshot();

});