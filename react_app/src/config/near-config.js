export const CONTRACT_NAME =
  // process.env.CONTRACT_NAME ||
  "test.testnet";
export const NETWORK_ID =
  // process.env.NETWORK_ID ||
  "testnet";

export const CONTRACT_CONFIG = {
  viewMethods: ["get_vote", "get_votes_list"], // your view methods
  changeMethods: ["create_vote", "cast_vote"], // your change methods
};
