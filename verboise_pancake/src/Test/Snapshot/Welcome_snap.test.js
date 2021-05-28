import React from 'react'
import renderer from 'react-test-renderer'
import Welcome  from './../../components/Home/WelcomeMessage'

it('renders correctly', () => {
    const WelcomeSanp = renderer.create(<Welcome />).toJSON();
    expect(WelcomeSanp).toMatchSnapshot();

});