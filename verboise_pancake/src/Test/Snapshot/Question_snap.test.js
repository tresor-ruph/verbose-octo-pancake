import React from 'react'
import renderer from 'react-test-renderer'
import Questions  from './../../components/Questions'

it('renders correctly', () => {
    const QuestionsSnap = renderer.create(<Questions />).toJSON();
    expect(QuestionsSnap).toMatchSnapshot();

});