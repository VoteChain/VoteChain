import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { WalletSelectorProvider } from "@near-wallet-selector/react-hook";

import {
  CONTRACT_NAME,
  NETWORK_ID,
  CONTRACT_CONFIG,
} from "../config/near-config";
import InnerNearProvider from "./NearContext";

export function NearProvider({ children }) {
  const walletSelectorConfig = {
    network: NETWORK_ID,
    // Optional: createAccessKeyFor: "hello.near-examples.testnet",
    modules: [setupMyNearWallet()],
  };

  return (
    <WalletSelectorProvider config={walletSelectorConfig}>
      <InnerNearProvider>{children}</InnerNearProvider>
      {/* <Component {...pageProps} /> */}
    </WalletSelectorProvider>
  );
}
