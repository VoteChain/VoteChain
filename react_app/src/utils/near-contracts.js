export async function createVote(
  contract,
  { title, description, options, endTime }
) {
  return await contract.create_vote({
    args: {
      title,
      description,
      options,
      end_time: endTime,
    },
    gas: "300000000000000",
  });
}

export async function getVote(contract, voteId) {
  return await contract.get_vote({ vote_id: voteId });
}

export async function castVote(contract, { voteId, optionIndex }) {
  return await contract.cast_vote({
    args: {
      vote_id: voteId,
      option_index: optionIndex,
    },
    gas: "300000000000000",
  });
}
