import React from 'react'
import renderer from 'react-test-renderer'
import NotFoundUI  from './../../components/Error/UI/ConfirmEmailUI.jsx'

it('renders correctly', () => {
    const NotFoundSnap = renderer.create(<NotFoundUI />).toJSON();
    expect(NotFoundSnap).toMatchSnapshot();

});