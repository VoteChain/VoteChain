FROM --platform=linux/amd64 node:20-bullseye

# Install near-sdk-js dependencies
WORKDIR /contract
COPY package*.json ./
# RUN npm install -g npm

# Download binaryen manually
# RUN curl -LOf https://github.com/WebAssembly/binaryen/releases/download/version_123/binaryen-version_123-aarch64-linux.tar.gz \
#     && mkdir -p /contract/node_modules/near-sdk-js/.wasi \
#     && tar -xzf binaryen-Linux-X64.tar.gz -C /contract/node_modules/near-sdk-js/.wasi \
#     && rm binaryen-Linux-X64.tar.gz
# ENV WASI_STUB_PATH=/tmp/wasi-stub
# RUN curl -l https://github.com
ENV npm_config_ignore_scripts=true
RUN npm install near-sdk-js --force
ENV npm_config_ignore_scripts=false
RUN npm install --force # Required for near-sdk-js

# Copy and build contract
COPY . .
RUN npm run build
# RUN npm test

# 1. Install Rust with environment setup
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
#     echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc && \
#     . ~/.bashrc && \
#     rustup target add wasm32-unknown-unknown


# Install Rust (required for wasm builds)
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# ENV PATH="/root/.cargo/bin:${PATH}"
# RUN rustup target add wasm32-unknown-unknown

# RUN npx tsc --noEmit --skipLibCheck --experimentalDecorators --target es2020