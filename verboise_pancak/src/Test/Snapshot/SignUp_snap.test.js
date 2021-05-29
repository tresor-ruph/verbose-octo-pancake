import React from 'react'
import renderer from 'react-test-renderer'
import SignupUI  from './../../components/authentification/UI/SignupUI'

it('renders correctly', () => {
    const signSnap = renderer.create(<SignupUI />).toJSON();
    expect(signSnap).toMatchSnapshot();

});