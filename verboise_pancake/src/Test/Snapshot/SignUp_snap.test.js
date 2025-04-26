import React from 'react'
import renderer from 'react-test-renderer'
import SignupUI  from './../../components/Authentification/UI/SignupUI'

it('renders correctly', () => {
    const signSnap = renderer.create(<SignupUI />).toJSON();
    expect(signSnap).toMatchSnapshot();

});