const Card = styled.div`
.card-div {
  width: 100%;
  ${{ backgroundColor: props.voted ? "#444" : "#333" }}
  color: white;
  padding: 20px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.5);
  position: relative;
  align-items: left;
  min-height: auto;
}

.card-div:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: #555;
}

.big-name {
  font-size: 36px;
  margin-bottom: 10px;
}

.time {
  font-size: 14px;
}

.description {
  font-size: 16px;
  margin-top: 10px;
}

.details {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 10px;
}

.lock-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}
.tick-icon {
  position: absolute;
  margin-bottom: 10px;
  top: 5px;
  left: 5px;
}
`;

function shortText(text) {
  const words = text.split(" ");
  return words.slice(0, 15).join(" ") + "...";
}

return (
  <Card>
    <div className="card-div" style={{ ...props.style }}>
      {props.voted && (
        <svg
          fill="#009a70"
          width="25px"
          height="25px"
          viewBox="-3.2 -3.2 38.40 38.40"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#009a70"
          stroke-width="1.44"
          className="tick-icon"
          transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#000000"
            stroke-width="1.7920000000000003"
          >
            <path d="M0 26.016v-20q0-2.496 1.76-4.256t4.256-1.76h20q2.464 0 4.224 1.76t1.76 4.256v20q0 2.496-1.76 4.224t-4.224 1.76h-20q-2.496 0-4.256-1.76t-1.76-4.224zM4 26.016q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-20q0-0.832-0.576-1.408t-1.408-0.608h-20q-0.832 0-1.44 0.608t-0.576 1.408v20zM7.584 16q0-0.832 0.608-1.408t1.408-0.576 1.408 0.576l2.848 2.816 7.072-7.040q0.576-0.608 1.408-0.608t1.408 0.608 0.608 1.408-0.608 1.408l-8.48 8.48q-0.576 0.608-1.408 0.608t-1.408-0.608l-4.256-4.256q-0.608-0.576-0.608-1.408z"></path>{" "}
          </g>
          <g id="SVGRepo_iconCarrier">
            <path d="M0 26.016v-20q0-2.496 1.76-4.256t4.256-1.76h20q2.464 0 4.224 1.76t1.76 4.256v20q0 2.496-1.76 4.224t-4.224 1.76h-20q-2.496 0-4.256-1.76t-1.76-4.224zM4 26.016q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-20q0-0.832-0.576-1.408t-1.408-0.608h-20q-0.832 0-1.44 0.608t-0.576 1.408v20zM7.584 16q0-0.832 0.608-1.408t1.408-0.576 1.408 0.576l2.848 2.816 7.072-7.040q0.576-0.608 1.408-0.608t1.408 0.608 0.608 1.408-0.608 1.408l-8.48 8.48q-0.576 0.608-1.408 0.608t-1.408-0.608l-4.256-4.256q-0.608-0.576-0.608-1.408z"></path>{" "}
          </g>
        </svg>
      )}
      <div className="big-name">{props.name}</div>
      <div className="description">{shortText(props.desc)}</div>
      <div className="details">
        <div className="time">Open on: {props.open}</div>
        <div className="time">Close on: {props.close}</div>
        <div className="time">No of Candidates: {props.no_of_candidates}</div>
      </div>
      {props.locked ? <div className="lock-icon">🔐</div> : ""}
    </div>
  </Card>
);
