import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./aside.css";
import Button from "../Button/Button";

function Aside({ objs, active }) {
  const [opened, setOpened] = useState(false);

  const [currentClass, setCurrentClass] = useState("");
  const asideRef = useRef(null);

  // Check the width and update the className
  useEffect(() => {
    const div = asideRef.current;

    const updateClassBasedOnWidth = () => {
      const width = div.offsetWidth;

      if (width < 600) {
        setCurrentClass("mobile");
      } else if (width >= 600 && width < 970) {
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
      <div className="logo">
        <a href="/">
          <h3>VoteChain</h3>
        </a>
      </div>
      <div className={`right ${opened ? "opened" : "closed"}`}>
        <div className="tabs" id="tabs">
          {objs.map((obj) =>
            obj.type === "button" ? (
              <a
                key={obj.link}
                href={obj.link}
                className={`tab ${active === obj.link ? "active" : ""}`}
              >
                <button>{obj.name}</button>
              </a>
            ) : (
              <a
                key={obj.link}
                href={obj.link}
                className={`tab ${active === obj.link ? "active" : ""}`}
              >
                {obj.name}
              </a>
            )
          )}
        </div>
        <div className="others">
          <Button
            title={"Get Started"}
            handleClick={() => console.log("Get started")}
            theme={"primary"}
          />
        </div>
      </div>
      <div onClick={() => setOpened(!opened)} className="toggle">
        {/* Upd */}
        {opened ? <i class="bi-x"></i> : <i class="bi-list"></i>}
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
