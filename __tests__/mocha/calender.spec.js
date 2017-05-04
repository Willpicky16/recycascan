import '../testUtils/mocha';
import { ScrollView, Text, View, Image } from 'react-native';
import Calender from "../../app/components/Calendar";
import { shallow } from "enzyme";

describe('Calender component test', () => {
    let component;
    let initialState = {
      collections: [],
      userDetails: {}
    }

    beforeEach(function () {
        component = shallow(<Calender />);
    });
    it('should render 1 scrollview component', () => {
        expect(component.find(ScrollView)).to.have.length(1);
    });
    it('should render 1 view components', () => {
        expect(component.find(View)).to.have.length(1);
    });
    it('calender has initial state', function () {
    expect(component.state()).to.eql(initialState);
  });
});
