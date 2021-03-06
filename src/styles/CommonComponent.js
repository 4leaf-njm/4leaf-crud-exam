import styled from "styled-components";

export const Wrapper = styled.div`
  display: ${(props) => props.display || `flex`};
  justify-content: ${(props) => props.ju || `center`};
  align-items: ${(props) => props.al || `center`};
  flex-direction: ${(props) => props.dr || `column`};
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bgColor};
  border-bottom: ${(props) => props.borderBottom};
  cursor: ${(props) => props.cursor};
`;

export const RsWrapper = styled(Wrapper)`
  width: 1350px;
`;

export const Input = styled.input`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  outline: none;
  border: 1px solid #dedede;
`;

export const Textarea = styled.textarea`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  outline: none;
  border: 1px solid #dedede;
  resize: none;
`;

export const Button = styled.button`
  display: ${(props) => props.display || `flex`};
  justify-content: ${(props) => props.ju || `center`};
  align-items: ${(props) => props.al || `center`};
  flex-direction: ${(props) => props.dr || `column`};
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  outline: none;
`;

export const Select = styled.select`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  outline: none;
`;

export const SelectOption = styled.option``;
