import React from 'react'
import renderer from 'react-test-renderer'
import ConfirmEmailUI  from './../../components/Error/UI/ConfirmEmailUI.jsx'

it('renders correctly', () => {
    const ConfirmSnap = renderer.create(<ConfirmEmailUI />).toJSON();
    expect(ConfirmSnap).toMatchSnapshot();

});