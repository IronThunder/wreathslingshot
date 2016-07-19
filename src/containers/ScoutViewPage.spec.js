import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {ScoutViewPage} from './ScoutViewPage';
import ScoutViewForm from '../components/ScoutViewForm';

describe('<ScoutViewPage />', () => {
  it('should contain <ScoutViewForm />', () => {
    const actions = {
      saveFuelSavings: () => { },
      calculateFuelSavings: () => { }
    };
    const appData = {};
    const wrapper = shallow(<ScoutViewPage actions={actions} appData={appData}/>);

    expect(wrapper.find(ScoutViewForm)).to.be.length(1);
  });
});
