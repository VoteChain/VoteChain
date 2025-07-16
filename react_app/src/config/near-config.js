const CONTRACT_PER_NETWORK = {
  mainnet: "vote_chain.aaanakore.near",
  testnet: "vote_chain.aaanakore.testnet",
};

export const NETWORK_ID =
  // process.env.NETWORK_ID ||
  "testnet";

export const CONTRACT_NAME = CONTRACT_PER_NETWORK[NETWORK_ID];

export const CONTRACT_CONFIG = {
  viewMethods: {
    getUser: "get_user",
  },
  changeMethods: {
    addUser: "add_user",
    updateUser: "update_user",
  },
};

// export const CONTRACT_CONFIG = {
//   viewMethods: ["get_greeting", "get_vote", "get_votes_list"], // your view methods
//   changeMethods: ["set_greeting", "create_vote", "cast_vote"], // your change methods
// };
