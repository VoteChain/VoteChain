# Use a Rust image for building NEAR smart contracts
# FROM nearprotocol/contract-builder

# # Set working directory
# WORKDIR /contract

# # Copy smart contract files
# COPY . .
# chmod +x smart_contracts/deploy.sh

# # Install dependencies (if needed)
# RUN cargo build --target wasm32-unknown-unknown --release

# # Expose necessary ports (if any)
# EXPOSE 3030

# Define the default command (replace with your contract's deployment steps)
# CMD ["./deploy.sh"]
FROM  --platform=linux/amd64 node:22

# RUN apk add --no-cache python3 make g++

WORKDIR /contract


# Install dependencies including curl
# RUN apt-get update && apt-get install -y curl

COPY package*.json ./

# RUN npm install -g -f near-cli-rs@latest
RUN npm install -g npm@latest
RUN npm install --ignore-script

COPY . .

EXPOSE 3030
# CMD npm run test


    # "ava": "^6.1.3",
    # "near-workspaces": "^4.0.0",
    # "typescript": "^5.4.5"