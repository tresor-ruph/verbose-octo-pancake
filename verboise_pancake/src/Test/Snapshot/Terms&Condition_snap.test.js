import React from 'react'
import renderer from 'react-test-renderer'
import TermsAndCondition  from './../../components/Error/UI/ConfirmEmailUI.jsx'

it('renders correctly', () => {
    const TermsAndConditionSnap = renderer.create(<TermsAndCondition />).toJSON();
    expect(TermsAndConditionSnap).toMatchSnapshot();

});