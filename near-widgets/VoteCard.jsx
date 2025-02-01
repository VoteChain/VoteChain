const accountId = context.accountId;
// const props = {
//   name: "Vote tenent",
//   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   role: "part",
//   creator: "abnakore.near",
//   openTime: "2024-02-20T15:45",
//   closeTime: "2024-03-20T15:45",
//   createdOn: "2024-03-20T15:45",
//   limit: 3,
//   opened: true,
//   passcode: "null",
//   candidates: [1, 2, 3, 4, 5, 6, 6, 6],
//   parties: [1, 2, 3, 4, 5, 6],
//   voters: [],
//   style: {},
// };

//  Format the date and time (January 7, 2024 at 5:57 PM)
function formatDateTime(dateTimeString) {
  // Assuming you have a date-time input with the format "YYYY-MM-DDTHH:mm" as a string
  const dateTime = new Date(dateTimeString);

  // Formatting the date and time in 12-hour format
  const formattedDateTime = dateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Set to true for 12-hour format
  });

  return formattedDateTime;
}

// Get the current date and time
function getDateTime() {
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

// check if the vote is ongoing
function isOngoing() {
  return props.closeTime !== ""
    ? Date.parse(props.openTime) <= Date.parse(getDateTime()) &&
        Date.parse(props.closeTime) > Date.parse(getDateTime())
    : Date.parse(props.openTime) <= Date.parse(getDateTime());
}

function shortText(text) {
  const words = text.split("");
  return words.slice(0, 70).join("") + "...";
}

useEffect(() => console.log(props), []);

// Styles
const Card = styled.div`
  .card-div {
    width: 100%;
    background-color: ${isOngoing() ? "#333" : "#444"};
    color: white;
    padding: 20px;
    margin: 5px;
    border-radius: 10px;
    box-shadow: 0 0 0px rgba(0, 0, 0, 0.5);
    position: relative;
    align-items: left;
    min-height: auto;
    transition: 0.5s ease;
  }

  .card-div:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    background-color: #555;
    transform: scale(1.01);
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
    bottom: 5px;
    right: 5px;
  }
`;

return (
  <Card>
    <div className="card-div" style={{ ...props.style }}>
      {props.voters.includes(accountId) && (
        <svg
          fill="#009a70"
          width="20px"
          height="20px"
          viewBox="-3.2 -3.2 38.40 38.40"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#009a70"
          stroke-width="0.5"
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
        <div className="time">Open on: {formatDateTime(props.openTime)}</div>
        {props.closeTime !== "" && (
          <div className="time">
            Close on: {formatDateTime(props.closeTime)}
          </div>
        )}
        <div className="time">
          Created By:{" "}
          <a
            href={`https://near.org/near/widget/ProfilePage?accountId=${accountId}`}
            target="_blank"
          >
            {props.creator}
          </a>
        </div>
        <div className="time">No of Candidates: {props.candidates.length}</div>
      </div>
      {props.passcode !== "" ? <div className="lock-icon">🔐</div> : ""}
    </div>
  </Card>
);
