import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: ${(props) => {
    if (props.disabled && !props.invalid) {
      return '#ddd';
    }
    return props.invalid ? '#E53935' : props.backgroundColor;
  }};
  height: 50;
  width: 80;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  shadowColor: "#000",
  shadowOffset: {
  width: 0;
  height: 3;
};
 shadowOpacity: 0.29;
 shadowRadius: 4.65;

 elevation: 7;
`;

export default Button;
