import React from 'react'
import renderer from 'react-test-renderer'
import LoginUI  from './../../components/Authentification/UI/LoginUI.jsx'

it('renders correctly', () => {
    const loginSnap = renderer.create(<LoginUI />).toJSON();
    expect(loginSnap).toMatchSnapshot();

});