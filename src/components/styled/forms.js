import styled from 'styled-components';

export const StyledTextField = styled.input`
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 2px;
  font-size: ${props => props.type === 'primary' ? '14px' : '12px'};
`;

export const StyledCheckbox = styled.input.attrs({
  type: 'checkbox'
})`
  appearance: none;
  -webkit-appearance: none;

  &:before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 1px;
  }

  &:checked:after {
    content: '';
    width: 8px;
    height: 16px;
    position: absolute;
    left: 7px;
    bottom: 5px;
    transform: rotatez(45deg);
    border-bottom: 2px solid black;
    border-right: 2px solid black;
  }
`;

export const StyledLabel = styled.label`
  display: block;
  margin: 16px auto;
  position: relative;
  width: 256px;
  text-align: center;
`;