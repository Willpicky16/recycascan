import React, { Text, TouchableHighlight } from "react-native";
import TestButton from "../../app/components/TestButton";
import '../testutils/mocha';

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