const StyledButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 12px 20px;
  border: none;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin: 10px;
  transition: all 0.3s ease-in-out;
  border-radius: 50px;
  text-wrap: nowrap;

  &:hover {
    background-color: #5cbf40;
    transform: scale(1.04);
  }

  &:after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background-color: #fff;
    transition: width 0.3s ease-in-out;
  }

  &:hover:after {
    width: 100%;
  }
`;

return (
  <StyledButton className={`button ${props.theme}`} onClick={props.handleClick}>
    {props.title}
  </StyledButton>
);
