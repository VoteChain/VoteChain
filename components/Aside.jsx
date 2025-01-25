const StyledAside = styled.div`
  --faded_bg_color: #8889;
  // Light theme colors
  --light_background: #ffffff;
  --light_text_primary: #333333;
  --light_text_secondary: #666666;
  --light_button_primary: #4caf50;
  --light_button_secondary: #66b2ff;
  --light_link: #66b2ff;
  --light_status_success: #4caf50;
  --light_status_error: #ff5b5b;
  --light_status_warning: #ff8c00;
  --light_status_info: #66b2ff;
  --light_highlight: #ffd700;

  // Dark theme colors
  --dark_background: #333333;
  --dark_text_primary: #ffffff;
  --dark_text_secondary: #b0b0b0;
  --dark_button_primary: #4caf50;
  --dark_button_secondary: #66b2ff;
  --dark_link: #66b2ff;
  --dark_status_success: #4caf50;
  --dark_status_error: #ff5b5b;
  --dark_status_warning: #ff8c00;
  --dark_status_info: #66b2ff;
  --dark_highlight: #ffd700;

  @keyframes fall {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(0);
    }
  }

  width: calc(100% - 40px);
  padding: 5px 20px;
  background-color: var(--faded_bg_color);
  backdrop-filter: blur(10px);
  border-radius: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;

  .logo {
    font-size: 20px;
    font-weight: 300;

    a {
      text-decoration: none;
      color: var(--light_background);
    }

    h3 {
      margin: 15px;
    }
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .tabs .tab {
    margin: 0 15px;
    font-weight: 400;
    font-size: 16px;
    color: var(--light_background);
    text-decoration: none;
    cursor: pointer;
  }

  .tabs .tab:hover,
  .tabs .tab.active {
    color: var(--light_button_primary);
  }

  .others {
    width: auto;
  }

  .toggle i {
    display: none;
  }
`;

const [opened, setOpened] = useState(false);
return (
  <StyledAside className={`aside ${opened ? "opened" : "closed"}`}>
    <div className="logo">
      <Link to="/abnakore.near/widget/VoteChain">
        <h3>VoteChain</h3>
      </Link>
    </div>
    <div className={`right ${opened ? "opened" : "closed"}`}>
      <div className="tabs" id="tabs">
        {props.objs.map((obj) =>
          !obj.handleClick ? (
            <Link
              key={obj.link}
              to={obj.link}
              className={`tab ${props.active === obj.link ? "active" : ""}`}
            >
              {obj.name}
            </Link>
          ) : (
            <p
              key={obj.link}
              href={obj.link}
              className={`tab ${props.active === obj.link ? "active" : ""}`}
              onClick={obj.handleClick}
            >
              {obj.name}
            </p>
          )
        )}
      </div>
      
      {props.button &&
        (props.button.handleClick ? (
          <Widget
            src="abnakore.near/widget/Button"
            props={{
              title: props.button.title,
              handleClick: props.button.handleClick,
              theme: "primary",
            }}
          />
        ) : (
          <Link to={props.button.link}>
            <Widget
              src="abnakore.near/widget/Button"
              props={{
                title: props.button.title,
                handleClick: () =>
                  console.log(`${props.button.title} Button Clicked!!`),
                theme: "primary",
              }}
            />
          </Link>
        ))}
    </div>
    <div onClick={() => setOpened(!opened)} className="toggle">
      <i>X</i>
    </div>
  </StyledAside>
);
