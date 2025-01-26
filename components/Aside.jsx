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
  position: relative;
  z-index: 100;

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
    margin: 0 10px;
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
    color: var(--light_background);
    font-size: 30px;
    cursor: pointer;
  }

  /* Responsive (tab, mobile) */
  @media screen and (max-width: 1000px) {
    & {
      overflow: hidden;

      &.opened {
        border-radius: 25px 25px 0 0;
        overflow: visible;
      }

      .right,
      .tabs {
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .right {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: var(--faded_bg_color);
        backdrop-filter: blur(10px);
        border-radius: 0 0 25px 25px;
        padding-bottom: 20px;
        display: none;
        z-index: -1;
        animation: fall 0.2s forwards;
      }

      .right.opened {
        display: block;
      }

      .tabs .tab {
        margin: 5px 0;
        padding: 15px 0;
        width: 100%;
        text-align: center;
      }

      .toggle i {
        display: block;
        padding: 20px;
        cursor: pointer;
      }

      a button {
        width: -moz-available;
      }
    }
  }
`;

// const [opened, setOpened] = useState(false);
State.init({ opened: false, currentClass: "tab" });

// !!! TODO: Changge the style based on the element width instead od the windows width

return (
  <StyledAside
    id={"aside"}
    className={`aside ${state.currentClass} ${
      state.opened ? "opened" : "closed"
    }`}
  >
    <div className="logo">
      <Link to="/abnakore.near/widget/VoteChain">
        <h3>VoteChain</h3>
      </Link>
    </div>
    <div className={`right ${state.opened ? "opened" : "closed"}`}>
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
                scaleWhenHover: false,
              }}
            />
          </Link>
        ))}
    </div>
    <div
      onClick={() => State.update({ opened: !state.opened })}
      className="toggle"
    >
      {state.opened ? <i class="bi-x"></i> : <i class="bi-list"></i>}
    </div>
  </StyledAside>
);