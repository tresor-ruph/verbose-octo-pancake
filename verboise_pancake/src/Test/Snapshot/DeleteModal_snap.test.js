import React from 'react'
import renderer from 'react-test-renderer'
import DeleteModal  from './../../components/Home/DeleteModal'

it('renders correctly', () => {
    const DeleteModalSnap = renderer.create(<DeleteModal />).toJSON();
    expect(DeleteModalSnap).toMatchSnapshot();

});