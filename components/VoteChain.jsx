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
}, [watchlist]);

// Pages that can be reached via the aside tab
const [pages, setPage] = useState([
  {
    name: "All Votes",
    link: "https://near.social/abnakore.near/widget/VoteChain",
  },
  {
    name: "My Votes",
    link: "https://near.social/abnakore.near/widget/VoteChain?tab=my_votes",
  },
  {
    name: "Watchlist",
    link: "https://near.social/abnakore.near/widget/VoteChain?tab=watchlist",
  },
  {
    name: "Create New Vote",
    type: "button",
    link: "https://near.social/abnakore.near/widget/CreateVote",
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
                <Widget src="abnakore.near/widget/Hero" props={{}} />
                <div id="votes" className="two-sides">
                  <Widget
                    src="abnakore.near/widget/Aside"
                    props={{ objs: pages, active: "/admin/manage_candidates" }}
                  />
                  {votesToRender.length > 0 ? (
                    <List>
                      {votesToRender.map((vote) => (
                        <a
                          href={`https://near.social/abnakore.near/widget/App.jsx?vote=${vote.blockHeight}`}
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
