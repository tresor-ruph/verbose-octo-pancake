import React from 'react'
import renderer from 'react-test-renderer'
import ResetPasswordUI  from './../../components/Error/UI/ConfirmEmailUI.jsx'

it('renders correctly', () => {
    const ResetPasswordSnap = renderer.create(<ResetPasswordUI />).toJSON();
    expect(ResetPasswordSnap).toMatchSnapshot();

});