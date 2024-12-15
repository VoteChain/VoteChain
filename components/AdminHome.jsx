// Get the user's accountId
const accountId = context.accountId;

// Declaring variables
// !!!
const voteId = props.vote && props.vote;
// const voteId = 0;

// All the votes
const [allVotes, setAllVotes] = useState([]);
const [voteToRender, setVoteToRender] = useState([]);

// Get all the votes
const votesData = Social.get(`abnakore.near/votes`);
useEffect(() => {
  if (votesData === undefined) {
    // Set the votes to an empty list if there is no votes
    setAllVotes([]);
  } else {
    setAllVotes(JSON.parse(votesData));
  }
  setVoteToRender(allVotes[voteId]);
}, [votesData === null]);

// Set the vote to be rendered
useEffect(() => {
  setVoteToRender(allVotes[voteId]);
}, [allVotes]);

// Pages that can be reached via the aside tab
const [pages, setPages] = useState([
  {
    name: "Voting Page",
    link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
  },
  {
    name: "Result",
    link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
  },
]);

// Add admin pages if the user is the creator of the vote
useEffect(() => {
  if (voteToRender.creator === accountId) {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Result",
        link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Admin Home",
        link: `https://near.org/abnakore.near/widget/AdminHome?vote=${voteToRender.id}`,
      },
      {
        name: "Manage Candidates",
        link: `https://near.org/abnakore.near/widget/ManageCandidates?vote=${voteToRender.id}`,
      },
      {
        name: "Mange Parties",
        link: `https://near.org/abnakore.near/widget/ManageParties?vote=${voteToRender.id}`,
      },
    ]);
  } else {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.org/abnakore.near/widget/App.jsx?vote=${voteToRender.id}`,
      },
      {
        name: "Result",
        link: `https://near.org/abnakore.near/widget/Result.jsx?vote=${voteToRender.id}`,
      },
    ]);
  }
}, [voteToRender.creator === accountId]);

return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              {voteToRender ? (
                <div className="two-sides">
                  <Widget
                    src="abnakore.near/widget/Aside"
                    props={{ objs: pages, active: "/admin" }}
                  />
                  <div className="body-contents">
                    <h1>Admin Home</h1>
                    <h4>Candidates Details</h4>
                    <Widget
                      src="abnakore.near/widget/Table"
                      props={{
                        headings: [
                          "S/N",
                          "Candidate's Name",
                          "Party",
                          "Role",
                          "Number of votes",
                        ],
                        data: Object.values(
                          voteToRender.candidates
                            .sort((a, b) => a.votes - b.votes)
                            .map((c, i) => [i + 1].concat(Object.values(c)))
                        ),
                      }}
                    />

                    <a
                      href={`https://near.org/abnakore.near/widget/ManageCandidates?vote=${voteToRender.id}`}
                    >
                      <button>Add Candidate</button>
                    </a>
                    <hr />
                    <h4>Parties Details</h4>
                    <Widget
                      src="abnakore.near/widget/Table"
                      props={{
                        headings: ["S/N", "Party Name", "Acronym"],
                        data: Object.values(
                          voteToRender.parties.map((c, i) =>
                            [i + 1].concat(Object.values(c))
                          )
                        ),
                      }}
                    />

                    <a
                      href={`https://near.org/abnakore.near/widget/ManageParties?vote=${voteToRender.id}`}
                    >
                      <button>Add Party</button>
                    </a>
                    <hr />
                  </div>
                </div>
              ) : (
                <div className="body-contents">
                  <h1>Vote Doesn't exist</h1>
                </div>
              )}
            </div>
          ),
        }}
      />
    ) : (
      <Widget src="abnakore.near/widget/SignIn.jsx" />
    )}
  </>
);
