import styled from 'styled-components/native';

const Footer = styled.View`
  border-top-width: 1;
  border-color: ${(props) => {
    if (props.disabled && !props.invalid) {
      return '#ddd';
    }
    return '#ddd';
  }};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Footer;
