import React from 'react'
import renderer from 'react-test-renderer'
import Header  from './../../layouts/header'

it('renders correctly', () => {
    const HeaderSnap = renderer.create(<Header />).toJSON();
    expect(HeaderSnap).toMatchSnapshot();

});