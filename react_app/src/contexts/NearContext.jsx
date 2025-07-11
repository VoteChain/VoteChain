/**
 * NearContext.jsx
 *
 * Provides NEAR Protocol integration for React applications. This context:
 * 1. Manages connection to the NEAR blockchain
 * 2. Handles wallet authentication (sign in/sign out)
 * 3. Provides access to NEAR wallet and contract instances
 * 4. Manages account state and loading status
 *
 * This implementation is optimized for browser environments and Vite.
 */

import { createContext, useContext, useEffect, useState } from "react";

// Wallet Selector
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
// Near api js
import * as nearAPI from "near-api-js";

// Config
import {
  CONTRACT_NAME,
  NETWORK_ID,
  CONTRACT_CONFIG,
} from "../config/near-config";

// Create React Context for NEAR integration
const NearContext = createContext();

export default function NearProvider({ children }) {
  // Get modules
  const { connect, keyStores, Signer } = nearAPI;

  // State management for NEAR connection
  const [near, setNear] = useState(null);
  const [selector, setSelector] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize NEAR connection
  useEffect(() => {
    async function initNear() {
      try {
        // Configure NEAR connection (testnet or mainnet)
        const prefix = NETWORK_ID === "testnet" ? "testnet" : "www";
        // Create keystore
        const keyStore = new keyStores.BrowserLocalStorageKeyStore();
        // create signer (prevents signer error)
        const signer = new Signer(keyStore);

        // configuration used to connect to NEAR
        const nearConfig = {
          networkId: NETWORK_ID,
          // Use browser's local storage for keys
          keyStore: keyStore,
          nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
          walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
          helperUrl: `https://helper.${NETWORK_ID}.near.org`,
          explorerUrl: `https://${prefix}.nearblocks.io`,
          signer,
        };

        // Create connection to NEAR blockchain
        // connect to NEAR! :)
        const nearConnection = await connect(nearConfig);

        // Initialize wallet connection
        const selectorCon = await setupWalletSelector({
          network: NETWORK_ID,
          modules: [setupMyNearWallet()],
        });

        const walletConnection = await selectorCon.wallet("my-near-wallet");

        // !!! Initialize contract if user is signed in
        let contractInstance = null;
        // if (selector.store.getState().accounts.length > 0) {
        //   // Create contract instance
        //   contractInstance = new nearAPI.Contract(
        //     walletConnection.account(),
        //     CONTRACT_NAME,
        //     CONTRACT_CONFIG
        //   );
        // }

        // Update state with initialized objects
        setNear(nearConnection);
        setSelector(selectorCon);
        setWallet(walletConnection);
        setContract(contractInstance);
        getAccount(selectorCon);
      } catch (error) {
        console.error("NEAR initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initNear();
  }, []);

  const getAccount = (selectorCon = selector) => {
    const accounts = selectorCon.store.getState().accounts;

    // ✅ Return the first account if signed in, else null
    const acc = accounts.length > 0 ? accounts[0] : null;
    setAccount(acc);
    setAccountId(acc?.accountId);
    return accounts.length > 0 ? accounts[0].accountId : null;
  };

  // Handle user sign in
  const signIn = () => {
    try {
      // 🚀 Request sign-in
      wallet.signIn({
        contractId: CONTRACT_NAME,
        // methodNames: ["vote", "getVotes"], // Optional: restrict access to these methods
        successUrl: window.location.href, // Redirect here after login success
        failureUrl: window.location.href, // Redirect here if login fails
      });
    } catch (error) {
      console.error("❌ Sign-in failed:", error);

      // 🧠 Optional: user feedback
      // alert("Something went wrong during sign-in. Please try again.");
    } finally {
      getAccount();
    }
  };

  // Handle user sign out
  const signOut = () => {
    try {
      if (wallet) {
        // 🔓 Sign the user out
        wallet.signOut();
        setAccountId(null);
        setContract(null);
        setAccount(null);
      }
    } catch (error) {
      console.error("❌ Sign-out failed:", error);

      // 🧠 Optional: show user feedback
      // alert("Something went wrong while signing out. Please try again.");
    }
  };

  // Value provided to context consumers
  const value = {
    near, // NEAR connection instance
    wallet, // Wallet connection instance
    contract, // Contract instance (if signed in)
    accountId, // Current account ID (null if not signed in)
    account, // NEAR account object (if signed in)
    isLoading, // Loading state
    signIn, // Function to initiate sign in
    signOut, // Function to sign out
  };

  return (
    <NearContext.Provider value={value}>
      {/* Only render children after NEAR is initialized */}
      {!isLoading && children}
    </NearContext.Provider>
  );
}

/**
 * Custom hook to access NEAR context
 * @returns {Object} NEAR context values
 * @throws {Error} If used outside NearProvider
 */
export function useNear() {
  const context = useContext(NearContext);
  if (!context) {
    throw new Error("useNear must be used within a NearProvider");
  }
  return context;
}

// import { createContext, useContext, useEffect, useState } from "react";
// import { connect, keyStores, WalletConnection, Contract } from "near-api-js";
// // import * as nearAPI from "near-api-js";
// import {
//   CONTRACT_NAME,
//   NETWORK_ID,
//   CONTRACT_CONFIG,
// } from "../config/near-config";
// // import Cookies from "js-cookie";

// const NearContext = createContext();

// export default function NearProvider({ children }) {
//   // Get the modules
//   // const { connect, keyStores, WalletConnection, Contract } = nearAPI;

//   const [near, setNear] = useState(null);
//   // Creating a new wallet instance
//   const [wallet, setWallet] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [accountId, setAccountId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // creates keyStore using private key in local storage
//   //   const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

//   // Connecting to NEAR
//   useEffect(() => {
//     async function initNear() {
//       const nearConfig = {
//         networkId: NETWORK_ID, // "testnet"
//         keyStore: new keyStores.BrowserLocalStorageKeyStore(),
//         nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
//         walletUrl: `https://wallet.${NETWORK_ID}.near.org`, // "https://testnet.mynearwallet.com/"(testnet) || "https://app.mynearwallet.com"(mainnet)
//         helperUrl: `https://helper.${NETWORK_ID}.near.org`,
//         explorerUrl: `https://explorer.${NETWORK_ID}.near.org`, // "https://testnet.nearblocks.io"(testnet) || "https://nearblocks.io"(mainnet)
//         deps: {
//           keyStore: new keyStores.BrowserLocalStorageKeyStore(), // 🔥 THIS LINE IS THE KEY
//         },
//       };

//       // Creating a near connection
//       // console.log(nearConfig);

//       const nearConnection = await connect(nearConfig);
//       console.log("nearConfig");
//       const walletConnection = new WalletConnection(nearConnection); // , NETWORK_ID);

//       let contract = null;
//       if (walletConnection.isSignedIn()) {
//         contract = await new nearApi.Contract(
//           walletConnection.account(),
//           CONTRACT_NAME,
//           CONTRACT_CONFIG
//         );
//       }

//       setNear(nearConnection);
//       setWallet(walletConnection);
//       setContract(contract);
//       setAccountId(walletConnection.getAccountId());
//       setAccount(nearConnection.account(walletConnection.getAccountId()));
//       setIsLoading(false);
//     }

//     initNear();
//   }, []);

//   const signIn = () => {
//     // wallet.requestSignIn(CONTRACT_NAME);
//     wallet.requestSignIn();
//   };

//   const signOut = () => {
//     wallet.signOut();
//     setAccountId(null);
//     setContract(null);
//   };

//   const value = {
//     near,
//     wallet,
//     contract,
//     accountId,
//     account,
//     isLoading,
//     signIn,
//     signOut,
//   };

//   return (
//     <NearContext.Provider value={value}>
//       {!isLoading && children}
//     </NearContext.Provider>
//   );
// }

// export function useNear() {
//   return useContext(NearContext);
// }
