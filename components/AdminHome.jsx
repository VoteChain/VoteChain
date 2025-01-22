// Get the user's accountId
const accountId = context.accountId;

// Declaring variables
// !!!
const voteId = props.vote && parseFloat(props.vote);
// const voteId = 113225718;

// All the votes
const allVotes = Social.index("voteChainTest", "vote")
  ? Social.index("voteChainTest", "vote")
  : [];
const otherCandidates = Social.index("voteChainTest", "candidate")
  ? Social.index("voteChainTest", "candidate")
  : [];
const otherParties = Social.index("voteChainTest", "party")
  ? Social.index("voteChainTest", "party")
  : [];
const votes = Social.index("voteChainTest", "votes")
  ? Social.index("voteChainTest", "votes")
  : [];

// Set the value of votetorender by adding other parties and candidates to it
function getValue() {
  console.log(otherCandidates, "this");
  var temp = allVotes.find((vote) => vote.blockHeight === voteId);
  var votesOnThis = votes.filter((vote) => vote.value.voteId === voteId);
  return {
    ...temp,
    value: {
      ...temp.value,
      parties: temp.value.parties.concat(
        otherParties
          .filter(
            (party) =>
              party.value.voteId === voteId &&
              party.value.name &&
              party.value.acronym
          )
          .map((party) => ({
            name: party.value.name,
            acronym: party.value.acronym,
          }))
      ),
      candidates: temp.value.candidates
        .concat(
          // Add other candidates to the list of all candidates
          otherCandidates
            .filter(
              (candidate) =>
                // Get only the candidates of the vote and vreified
                candidate.value.voteId === voteId &&
                candidate.value.name &&
                candidate.value.party &&
                candidate.value.role
            )
            .map((c) => c.value)
        )
        .map(
          // This put the number of votes of the candidate
          (cand, i) => ({
            ...cand,
            votes: votesOnThis.filter((vote) => vote.value.party === cand.party)
              .length,
          })
        ),
      voters: votesOnThis.map((vote) => vote.value.by),
    },
  };
}
const [voteToRender, setVoteToRender] = useState(getValue());

// Get all the votes
useEffect(() => {
  // Set the vote to be rendered
  setVoteToRender(getValue());
  console.log(voteToRender, allVotes, "votesData");
}, [allVotes]);

// Pages that will be displayed in the aside
const [pages, setPages] = useState([]);

// Add admin pages if the user is the creator of the vote
useEffect(() => {
  if (voteToRender.value.creator === accountId) {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.social/abnakore.near/widget/App.jsx?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Result",
        link: `https://near.social/abnakore.near/widget/Result.jsx?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Admin Home",
        link: `https://near.social/abnakore.near/widget/AdminHome?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Manage Candidates",
        link: `https://near.social/abnakore.near/widget/ManageCandidates?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Mange Parties",
        link: `https://near.social/abnakore.near/widget/ManageParties?vote=${voteToRender.blockHeight}`,
      },
    ]);
  } else {
    setPages([
      {
        name: "Voting Page",
        link: `https://near.social/abnakore.near/widget/App.jsx?vote=${voteToRender.blockHeight}`,
      },
      {
        name: "Result",
        link: `https://near.social/abnakore.near/widget/Result.jsx?vote=${voteToRender.blockHeight}`,
      },
    ]);
  }
}, [voteToRender.value.creator === accountId]);

return (
  <>
    {accountId ? (
      <Widget
        src="abnakore.near/widget/Wrapper"
        props={{
          body: (
            <div className="main-body">
              {voteToRender ? (
                voteToRender.value.creator === accountId ? (
                  <div className="two-sides">
                    <Widget
                      src="abnakore.near/widget/Aside"
                      props={{ objs: pages, active: "/admin" }}
                    />
                    {voteToRender.value.creator === accountId ? (
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
                              voteToRender.value.candidates
                                .sort((a, b) => a.votes - b.votes)
                                .map((c, i) =>
                                  [i + 1].concat([
                                    c.name,
                                    c.party,
                                    c.role,
                                    c.votes,
                                  ])
                                )
                            ),
                          }}
                        />

                        <a
                          href={`https://near.social/abnakore.near/widget/ManageCandidates?vote=${voteToRender.blockHeight}`}
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
                              voteToRender.value.parties.map((p, i) =>
                                [i + 1].concat(Object.values(p))
                              )
                            ),
                          }}
                        />

                        <a
                          href={`https://near.social/abnakore.near/widget/ManageParties?vote=${voteToRender.blockHeight}`}
                        >
                          <button>Add Party</button>
                        </a>
                        <hr />
                      </div>
                    ) : (
                      <div className="body-contents">
                        <h1>Can not access this page</h1>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="body-contents">
                    <h1>You don't have access to this page</h1>
                    <a href="https://near.social/abnakore.near/widget/VoteChain">
                      Back to Home Page
                    </a>
                  </div>
                )
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
