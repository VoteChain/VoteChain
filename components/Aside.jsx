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

  .tabs a {
    margin: 0 15px;
    font-weight: 400;
    font-size: 16px;
    color: var(--light_background);
    text-decoration: none;
  }

  .tabs a:hover,
  .tabs a.active {
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
      <a href="/">
        <h3>VoteChain</h3>
      </a>
    </div>
    <div className={`right ${opened ? "opened" : "closed"}`}>
      <div className="tabs" id="tabs">
        {props.objs.map((obj) => (
          <a
            key={obj.link}
            href={obj.link}
            className={`tab ${props.active === obj.link ? "active" : ""}`}
          >
            {obj.name}
          </a>
        ))}
      </div>
      {props.button ? (
        <Widget
          src="abnakore.near/widget/Button"
          props={{
            title: props.button.name,
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

// return (
//   <Wrapper>
//     <div className="card text-center">
//       <div id="tabs" className="card-header">
//         <ul className="nav nav-tabs card-header-tabs">
//           <a
//             href="https://near.social/abnakore.near/widget/VoteChain"
//             className={`nav-item  ${
//               active === "https://near.social/abnakore.near/widget/VoteChain"
//                 ? "active"
//                 : ""
//             }`}
//           >
//             <i class="bi bi-house-fill fs-4"></i>
//           </a>
//           {/* Render the objs as links */}
//           {props.objs.map((obj) =>
//             obj.type === "button" ? (
//               <a
//                 class={`nav-link tab ${active === obj.link ? "active" : ""}`}
//                 aria-current={active === obj.link}
//                 href={obj.link}
//               >
//                 <button>{obj.name}</button>
//               </a>
//             ) : (
//               <li key={obj.link} class="nav-item">
//                 <a
//                   class={`nav-link tab ${active === obj.link ? "active" : ""}`}
//                   aria-current={active === obj.link}
//                   href={obj.link}
//                 >
//                   {obj.name}
//                 </a>
//               </li>
//             )
//           )}
//         </ul>

//         {/* <Link to='/' className="tab">Vote Page</Link>
//                     <Link to='/result' className="tab">Results</Link>
//                     <Link to='/' className="tab">Login/Logout</Link> */}
//       </div>
//     </div>
//   </Wrapper>
// );
// //

// // .aside {
// //   position: fixed;
// //   background-color: #333;
// //   padding: 20px;
// //   height: 50px;
// //   width: 100vw;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: space-between;
// //   top: 0;
// //   left: 0;
// //   z-index: 100;
// // }
// // .aside #tabs {
// //   display: flex;
// //   flex-direction: row;
// //   gap: 20px;
// // }
// // .aside #tabs .tab {
// //   padding: 10px;
// //   font-size: 16px;
// //   color: #fff;
// //   text-align: center;
// //   cursor: pointer;
// //   transition: background-color 0.3s ease;
// // }

// // .aside #tabs .tab:hover, .aside #tabs .active {
// //   background-color: #555;
// // }

// // <a href="#">Home</a>
// // <a href="#">About</a>
// // <a href="#">Services</a>
// // <a href="#">Contact</a>
