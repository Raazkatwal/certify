# Certify - Blockchain Verified Certificates on Solana

Certify is a Solana-based application for issuing, viewing, and verifying blockchain-verified certificates. Users can issue certificates to any wallet, view all certificates issued to their own wallet, and verify certificates by their public key.

This project consists of two parts:

1. **Anchor Program (Rust / Solana)**: Handles certificate creation on-chain.
2. **Frontend (Next.js / React)**: Wallet-connected UI for issuing, listing, and verifying certificates.

---
## Why Certify?

🎓 **The Problem:**  
In colleges, participation and achievements are everywhere — workshops, hackathons, clubs, events — but proofs of these achievements are scattered, forgeable, or easy to lose. Most colleges still rely on PDFs, WhatsApp messages, Google Drive links, or printed certificates. These can be edited, duplicated, lost, or cannot be instantly verified.

**Pain Points:**

- Students lose certificates or can’t prove authenticity  
- Organizers manually re-issue proofs  
- Employers or event hosts cannot quickly verify claims  
- No single source of truth  

**Existing solutions fail** because they are centralized. If the data is modified or the issuer disappears, verification becomes impossible.

🚀 **The Solution:**  
Certify provides verifiable proofs of participation on-chain:

- Each certificate is stored immutably on Solana  
- Student wallet = digital identity  
- Anyone can verify authenticity in seconds  
- No central authority can modify or delete certificates  

> Instead of trusting a file or a website, verification is done by trusting the **blockchain**.

**Why Solana?**  
We needed immutability, public verification, and ownership — all provided by blockchain:

- **Immutable:** certificates cannot be changed  
- **Public:** anyone can verify authenticity  
- **Ownership:** the student truly owns their proof  

---


## Features

- **Issue Certificates**: Mint a verifiable certificate to a recipient wallet.
- **View My Certificates**: Display all certificates issued to your wallet with metadata (recipient name, course/event, description, issue date).
- **Copy Certificate Public Key**: Copy the certificate's public key for verification or record-keeping.
- **Verify Certificates**: Look up any certificate by its public key to confirm its metadata.
- Fully non-custodial; private keys never leave the wallet.
- Compatible with **Solana Devnet**.

---

## Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or npm
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor](https://project-serum.github.io/anchor/getting-started/installation.html)

---

## Project Structure

.
├── anchor                     # Anchor Solana program
│   ├── programs
│   │   └── certify
│   ├── tests
│   ├── migrations
│   ├── Anchor.toml
│   └── package.json
│
└── frontend                   # Next.js frontend
    ├── app
    │   ├── issue
    │   ├── certificates
    │   ├── verify
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── WalletButton.tsx
    │   └── ...
    ├── lib
    │   ├── anchor
    │   └── ...
    └── package.json



## Tech Stack

- Solana + Anchor (Rust)
- Next.js (App Router) + TypeScript
- @solana/wallet-adapter-react
- Tailwind CSS


## Setup Instructions

### 1. Prerequisites

- Node.js 18+
- Rust (stable)
- Solana CLI ≥ 1.18
- Anchor CLI ≥ 0.30


### 2. Solana & Anchor

Install Solana CLI

    sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

    # After install – restart terminal or run:
    export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

Install Anchor

    cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
    avm install latest
    avm use latest


### 3. Build & Deploy Program

    cd anchor
    anchor build

    # Deploy to local
    anchor deploy

    # OR deploy to devnet
    # anchor deploy --provider.cluster devnet


After deploy, copy the **Program ID** from the output.

Update it in the frontend:
- Usually in frontend/lib/anchor/certify.json (IDL)


### 4. Frontend

    cd frontend
    npm install
    # or yarn install
    # or pnpm install

    npm run dev
    # → http://localhost:3000


## Usage

### Issue Certificate

1. Connect wallet
2. Enter:
   - Recipient wallet address
   - Recipient name
   - Course/event name
   - Description (optional)
3. Click Issue → transaction confirms → certificate created on-chain


### View My Certificates

- Connect your wallet
- Go to /certificates page
- See all certificates issued to your address


### Verify Certificate

- Go to /verify
- Paste certificate account public key
- See metadata if valid (or error if not found)


## Quick Commands

    # Anchor
    cd anchor
    anchor build
    anchor deploy --provider.cluster devnet

    # Frontend
    cd frontend
    npm install 
    npm run dev

