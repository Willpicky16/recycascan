import React, { Text, TouchableHighlight } from "react-native";
import { shallow } from "enzyme";
import sinon from "sinon";
import TestButton from "../app/components/TestButton";

describe("<TestButton/>", () => {
  it("should capitalise text", () => {
    const button = shallow(<TestButton text="recycle" />);
    expect(button.find(Text).props().children).to.equal("RECYCLE");
  });
  it("should handle button presses", () => {
    const onPress = sinon.spy();
    const button = shallow(<TestButton text="yo" onPress={onPress}/>);
    button.simulate('press');
    expect(onPress.calledOnce).to.equal(true);
  });
});