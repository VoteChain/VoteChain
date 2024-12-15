// Get accountId
const accountId = context.accountId;

// All the votes
const [allVotes, setAllVotes] = useState([]);

// Tabs
const [tab, setTab] = useState(props.tab ? props.tab : "all");

// The user's watchlist
const [watchlist, setWatchlist] = useState([]);

// Votes to be rendered on the screen
const [votesToRender, setVotesToRender] = useState(allVotes);

// Get all the votes
const votesData = Social.get(`abnakore.near/votes`);

useEffect(() => {
  //   console.log(votesData);
  if (votesData === undefined) {
    // Set the candidate to an empty list if there is no candidate
    setAllVotes([]);
  } else {
    setAllVotes(JSON.parse(votesData));
  }
  setVotesToRender(allVotes);
  //   console.log(votesData, "");
}, [votesData === null]);

// Get The watchlist of the user
const watchlistData = Social.get(`${accountId}/voteChain_watchlist`);

useEffect(() => {
  if (watchlistData === undefined) {
    // Set the watchlist to an empty array
    setWatchlist([]);
  } else {
    setWatchlist(JSON.parse(watchlistData));
  }
}, [watchlistData === null]);

useEffect(() => {
  console.log(tab, allVotes);
  // Get the only votes the user created
  if (tab === "my_votes") {
    setVotesToRender(allVotes.filter((vote) => vote.creator === accountId));
  } else if (tab === "watchlist") {
    setVotesToRender(allVotes.filter((vote) => watchlist.includes(vote.id)));
  } else {
    setVotesToRender(allVotes);
  }
}, [allVotes, tab, watchlist]);

// Pages that can be reached via the aside tab
const [pages, setPage] = useState([
  {
    name: "All Votes",
    link: "https://near.org/abnakore.near/widget/VoteChain",
  },
  {
    name: "My Votes",
    link: "https://near.org/abnakore.near/widget/VoteChain?tab=my_votes",
  },
  {
    name: "Watchlist",
    link: "https://near.org/abnakore.near/widget/VoteChain?tab=watchlist",
  },
  {
    name: "Create New Vote",
    type: "button",
    link: "https://near.org/abnakore.near/widget/CreateVote",
  },
]);

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

const List = styled.div`
width: calc(100vw - 20px);
height: 100%;
padding: 20px 10px;

@media screen and (min-width: 1200px) {
  width: calc(100vw - 20%);
}
`;
return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              <div className="body-contents">
                <div className="two-sides">
                  <Widget
                    src="abnakore.near/widget/Aside"
                    props={{ objs: pages, active: "/admin/manage_candidates" }}
                  />
                  {votesToRender.length > 0 ? (
                    <List>
                      {votesToRender.map((vote) => (
                        <a
                          href={`https://near.org/abnakore.near/widget/App.jsx?vote=${vote.id}`}
                        >
                          <Widget
                            src="abnakore.near/widget/VoteCard"
                            props={{
                              name: vote.name,
                              desc: vote.desc,
                              open: formatDateTime(vote.openTime),
                              close: formatDateTime(vote.closeTime),
                              voted: vote.voters.includes(accountId),
                              locked: vote.passcode && true,
                              no_of_candidates: vote.candidates.length,
                              style: {},
                            }}
                          />
                        </a>
                      ))}
                    </List>
                  ) : (
                    <div className="body-contents">
                      <h1>No Votes</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ),
        }}
      />
    ) : (
      <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />
    )}
  </>
);

// // Get accountId
// const accountId = context.accountId;

// // Pages that can be reached via the aside tab
// const [pages, setPage] = useState([
//   {
//     name: "Home",
//     link: "https://near.org/sandbox#/abnakore.near/widget/AdminHome",
//   },
//   {
//     name: "Manage Candidates",
//     link: "https://near.org/sandbox#/abnakore.near/widget/ManageCandidates",
//   },
//   {
//     name: "Mange Parties",
//     link: "https://near.org/sandbox#/abnakore.near/widget/ManageParties",
//   },
// ]);
// return (
//   <>
//     {accountId ? (
//       <Widget
//         src="abnakore.near/widget/Wrapper"
//         props={{
//           body: (
//             <div className="main-body">
//               <div className="body-contents">
//                 <div className="two-sides"></div>
//                 <Widget
//                   src="abnakore.near/widget/Aside"
//                   props={{ objs: pages, active: "/admin/manage_candidates" }}
//                 />
//                 <div className="body-contents">
//                   <h1>...</h1>
//                 </div>
//               </div>
//             </div>
//           ),
//         }}
//       />
//     ) : (
//       <Widget src="abnakore.near/widget/SignIn.jsx" props={props} />
//     )}
//   </>
// );

//
// <Widget
//   src="abnakore.near/widget/VoteCard"
//   props={{
//     name: "Name",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit obcaecati iure rem nulla deleniti accusamus, qui, aut recusandae ut fugiat molestiae dicta asperiores, est aspernatur. Aliquid porro sed neque molestiae!",
//     open: "27-03-2024 2:30PM",
//     close: "27-03-2024 2:30PM",
//     no_of_candidates: 10,
//     voted: true,
//     locked: false,
//   }}
// />
// <Widget
//   src="abnakore.near/widget/VoteCard"
//   props={{
//     name: "Name",
//     desc: "You can use the slice method along with the spread operator (...) to create a new array containing the first two items.",
//     open: "27-03-2024 2:30PM",
//     close: "27-03-2024 2:30PM",
//     no_of_candidates: 10,
//     voted: false,
//     locked: true,
//   }}
// />
