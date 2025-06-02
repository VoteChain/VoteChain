import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./aside.css";

// Components
import Button from "../Button/Button";
import { IoClose } from "react-icons/io5";
import { RiMenu4Fill } from "react-icons/ri";

function Aside({ objs, showLogo = true, active, buttonConf }) {
  const [opened, setOpened] = useState(false);

  const [currentClass, setCurrentClass] = useState("");
  const asideRef = useRef(null);

  // Check the width and update the className
  useEffect(() => {
    const div = asideRef.current;

    const updateClassBasedOnWidth = () => {
      const width = div.offsetWidth;

      if (width < 500) {
        setCurrentClass("mobile");
      } else if (width >= 500 && width < 570) {
        setCurrentClass("tab");
      } else {
        setCurrentClass("desktop");
      }
    };

    // Use ResizeObserver to watch for element size changes
    const resizeObserver = new ResizeObserver(updateClassBasedOnWidth);
    resizeObserver.observe(div);

    // Initial call to set class
    updateClassBasedOnWidth();

    // Cleanup
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={asideRef}
      className={`aside ${currentClass} ${opened ? "opened" : "closed"}`}
    >
      {showLogo && (
        <div className="logo">
          <Link to="/">
            <h3>VoteChain</h3>
          </Link>
        </div>
      )}
      <div className={`right ${opened ? "opened" : "closed"}`}>
        <div className="tabs" id="tabs">
          {objs.map((obj) =>
            obj.type === "button" ? (
              <Link
                key={obj.link}
                to={obj.link}
                className={`tab ${active === obj.link ? "active" : ""}`}
              >
                <button>{obj.name}</button>
              </Link>
            ) : (
              <Link
                key={obj.link}
                to={obj.link}
                className={`tab ${active === obj.link ? "active" : ""}`}
              >
                {obj.name}
              </Link>
            )
          )}
        </div>
        {buttonConf && (
          <div className="others">
            <Button
              title={buttonConf.title}
              handleClick={buttonConf.handleClick}
              theme={"primary"}
            />
          </div>
        )}
      </div>
      <div onClick={() => setOpened(!opened)} className="toggle">
        {opened ? (
          <i>
            <IoClose />
          </i>
        ) : (
          <i>
            <RiMenu4Fill />
          </i>
        )}
      </div>
    </div>
  );
}

export default Aside;

// return (
//   <StyledAside className={`aside ${opened ? "opened" : "closed"}`}>
//     <div className="logo">
//       <a href="/">
//         <h3>VoteChain</h3>
//       </a>
//     </div>
//     <div className={`right ${opened ? "opened" : "closed"}`}>
//       <div className="tabs" id="tabs">
//         {props.objs.map((obj) => (
//           <a
//             key={obj.link}
//             href={obj.link}
//             className={`tab ${props.active === obj.link ? "active" : ""}`}
//           >
//             {obj.name}
//           </a>
//         ))}
//       </div>
//       {props.button ? (
//         <Widget
//           src="abnakore.near/widget/Button"
//           props={{
//             title: props.button.name,
//             handleClick: () => (location.href = props.button.link),
//             theme: "primary",
//           }}
//         />
//       ) : null}
//     </div>
//     <div onClick={() => setOpened(!opened)} className="toggle">
//       <i>X</i>
//     </div>
//   </StyledAside>
// );
