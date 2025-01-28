// Get accountId
const accountId = context.accountId;

// All the votes
// Get all the votes
const allVotes = Social.index("voteChainTest", "vote");
const otherCandidates = Social.index("voteChainTest", "candidate");

// Tabs
const [tab, setTab] = useState(props.tab ? props.tab : "all");

// The user's watchlist
const [watchlist, setWatchlist] = useState([]);

// Votes to be rendered on the screen
const [votesToRender, setVotesToRender] = useState(allVotes);

// Get The watchlist of the user
const watchlistData = Social.get(`${accountId}/voteChain_watchlist`);

useEffect(() => {
  setVotesToRender(allVotes);
  console.log(votesToRender, allVotes, "votesData");
}, [allVotes]);

useEffect(() => {
  if (watchlistData === undefined) {
    // Set the watchlist to an empty array
    setWatchlist([]);
  } else {
    setWatchlist(JSON.parse(watchlistData));
  }
}, [watchlistData === null]);

useEffect(() => {
  // Get the only votes the user created
  if (tab === "my_votes") {
    setVotesToRender(
      allVotes.filter((vote) => vote.value.creator === accountId)
    );
  } else if (tab === "watchlist") {
    setVotesToRender(
      allVotes.filter((vote) => watchlist.includes(vote.blockHeight))
    );
  } else {
    setVotesToRender(allVotes);
  }
}, [watchlist, tab]);

// Pages that can be reached via the aside tab
const [pages, setPage] = useState([
  {
    name: "All Votes",
    link: "/abnakore.near/widget/VoteChain",
    handleClick: () => setTab("all"),
    tag: "all",
  },
  {
    name: "My Votes",
    link: "/abnakore.near/widget/VoteChain?tab=my_votes",
    handleClick: () => setTab("my_votes"),
    tag: "my_votes",
  },
  {
    name: "Watchlist",
    link: "/abnakore.near/widget/VoteChain?tab=watchlist",
    handleClick: () => setTab("watchlist"),
    tag: "watchlist",
  },
  // {
  //   name: "Create New Vote",
  //   type: "button",
  //   link: "/abnakore.near/widget/CreateVote",
  // },
]);

// State to save the active page
const activePage = useMemo(
  () => pages.find((page) => page.tag === tab).link,
  [tab]
);

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
  width: calc(100% - 20px);
  height: 100%;
  padding: 20px 10px;
  margin: 0 auto;

  @media screen and (min-width: 1200px) {
    width: calc(100% - 20px);
  }
`;

const Wrapper = styled.div`
  .main-body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    width: -moz-available;

    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .two-sides .main-body {
    display: flex;
    flex-direction: column;
    place-items: center;
  }

  .body-contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
    margin: 0;
    min-width: 100%;
    min-height: 100vh;
  }

  .two-sides {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    place-items: center;
    margin: 0;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    width: 100%;
  }
  .two-sides aside {
    position: fixed;
    background-color: #333;
    padding: 20px;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
  }
  .two-sides aside #tabs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .two-sides aside #tabs .tab {
    padding: 10px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .two-sides aside #tabs .tab:hover,
  .two-sides aside #tabs .active {
    background-color: #555;
  }
`;

return (
  <>
    {accountId ? (
      //   <Widget
      //     src="abnakore.near/widget/Wrapper"
      //     props={{
      //       body: (
      <Wrapper>
        <div className="main-body">
          <div className="body-contents">
            <Widget src="abnakore.near/widget/Hero" props={{}} />
            <div id="votes" className="two-sides">
              <Widget
                src="abnakore.near/widget/Aside"
                props={{
                  objs: pages,
                  active: activePage,
                  button: {
                    title: "Create New Vote",
                    link: "https://near.social/abnakore.near/widget/CreateVote",
                  },
                }}
              />
              {votesToRender.length > 0 ? (
                <List>
                  {votesToRender.map((vote) => (
                    <Link
                      to={`/abnakore.near/widget/App.jsx?vote=${vote.blockHeight}`}
                    >
                      <Widget
                        src="abnakore.near/widget/VoteCard"
                        props={{
                          ...vote.value,
                          candidates: vote.value.candidates.concat(
                            otherCandidates.filter(
                              (candidate) =>
                                parseFloat(candidate.value.voteId) ===
                                parseFloat(vote.blockHeight)
                            )
                          ),
                          style: {},
                        }}
                      />
                    </Link>
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
      </Wrapper>
    ) : (
      //       ),
      //     }}
      //   />
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
//     link: "https://near.social/sandbox#/abnakore.near/widget/AdminHome",
//   },
//   {
//     name: "Manage Candidates",
//     link: "https://near.social/sandbox#/abnakore.near/widget/ManageCandidates",
//   },
//   {
//     name: "Mange Parties",
//     link: "https://near.social/sandbox#/abnakore.near/widget/ManageParties",
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
