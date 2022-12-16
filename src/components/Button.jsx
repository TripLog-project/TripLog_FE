import styled from 'styled-components';

const BtnModule = styled.a`
  width: inherit;
  border-radius: 5px;
  padding: 0.9rem;
  margin: 4px;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.hoverColor};
    background: ${(props) => props.hoverBackgroundColor};
  }
`;

export default function Btn({
  href,
  text,
  onClick,
  textColor,
  backgroundColor,
  hoverColor,
  hoverBackgroundColor,
}) {
  return (
    <BtnModule
      href={href}
      type="submit"
      onClick={onClick}
      textColor={textColor}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      hoverBackgroundColor={hoverBackgroundColor}
    >
      {text}
    </BtnModule>
  );
}
