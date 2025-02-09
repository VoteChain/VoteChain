#!/bin/bash

# Exit on error
set -e

# Ensure NEAR CLI is installed
if ! command -v near &> /dev/null; then
    echo "NEAR CLI not found, installing..."
    npm install -g near-cli
fi

# Set network (change to testnet or mainnet if needed)
NETWORK=testnet

# Define account and contract name
ACCOUNT_ID="your-account.testnet" # Change this to your testnet/mainnet account
CONTRACT_NAME="your-contract-name.testnet" # Change this to your deployed contract name

# Build the contract
echo "🚀 Building the smart contract..."
cargo build --target wasm32-unknown-unknown --release

# Deploy the contract
echo "📡 Deploying to NEAR..."
near deploy --accountId $ACCOUNT_ID --wasmFile target/wasm32-unknown-unknown/release/your_contract.wasm

echo "✅ Deployment successful!"
