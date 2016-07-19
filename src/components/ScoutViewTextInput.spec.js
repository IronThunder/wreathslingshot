import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ScoutViewTextInput from './ScoutViewTextInput';

chai.use(sinonChai);

describe('<ScoutViewTextInput />', () => {
  it('should be an input element', () => {
    const props = {
      name: 'testName',
      onChange: sinon.spy(),
      placeholder: 'Type Here',
      value: 100
    };

    const wrapper = shallow(<ScoutViewTextInput {...props} />);

    const actual = wrapper.type();
    const expected = 'input';

    expect(actual).to.equal(expected);
  });

  it('should handle change', () => {
    const props = {
      name: 'newMpg',
      onChange: sinon.spy(),
      placeholder: 'Type Here',
      value: 100
    };

    const wrapper = shallow(<ScoutViewTextInput {...props} />);

    const actual = wrapper.type();
    const expected = 'input';

    expect(actual).to.equal(expected);
    props.onChange.should.not.have.been.called;
    wrapper.simulate('change', {target: {value: 101}});
    expect(props.onChange).to.have.been.calledWith('newMpg', 101);
  });
});
