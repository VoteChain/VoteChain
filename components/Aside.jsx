const StyledAside = styled.div`

    --faded_bg_color: #8889;
    // Light theme colors
    --light_background: #FFFFFF;
    --light_text_primary: #333333;
    --light_text_secondary: #666666;
    --light_button_primary: #4CAF50;
    --light_button_secondary: #66B2FF;
    --light_link: #66B2FF;
    --light_status_success: #4CAF50;
    --light_status_error: #FF5B5B;
    --light_status_warning: #FF8C00;
    --light_status_info: #66B2FF;
    --light_highlight: #FFD700;

    // Dark theme colors
    --dark_background: #333333;
    --dark_text_primary: #FFFFFF;
    --dark_text_secondary: #B0B0B0;
    --dark_button_primary: #4CAF50;
    --dark_button_secondary: #66B2FF;
    --dark_link: #66B2FF;
    --dark_status_success: #4CAF50;
    --dark_status_error: #FF5B5B;
    --dark_status_warning: #FF8C00;
    --dark_status_info: #66B2FF;
    --dark_highlight: #FFD700;

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
      <a href="https://near.social/abnakore.near/widget/VoteChain">
        <h3>VoteChain</h3>
      </a>
    </div>
    <div className={`right ${opened ? "opened" : "closed"}`}>
      <div className="tabs" id="tabs">
        {props.objs.map((obj) =>
          !obj.handleClick ? (
            <a
              key={obj.link}
              href={obj.link}
              className={`tab ${props.active === obj.link ? "active" : ""}`}
            >
              {obj.name}
            </a>
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
      {/* !!! Fix handle Click */}
      {props.button ? (
        <Widget
          src="abnakore.near/widget/Button"
          props={{
            title: props.button.title,
            handleClick: () => (location.href = props.button.link),
            theme: "primary",
          }}
        />
      ) : null}
    </div>
    <div onClick={() => setOpened(!opened)} className="toggle">
      <i>X</i>
    </div>
  </StyledAside>
);
