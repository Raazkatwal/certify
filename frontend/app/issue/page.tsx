"use client";

import { useEffect } from "react";
import { getProgram } from "@/lib/anchor";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram } from "@solana/web3.js";

export default function IssuePage() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleIssue = async () => {
    if (!wallet.publicKey || !connection) {
      console.log("Wallet or connection not ready yet");
      return;
    }

    const program = getProgram(wallet, connection);

    const certificateKeypair = Keypair.generate();

    await program.methods
      .issueCertificate(wallet.publicKey, "dummy-metadata-hash")
      .accounts({
        certificate: certificateKeypair.publicKey,
        issuer: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([certificateKeypair])
      .rpc();

    console.log("Certificate issued!");
  };

  useEffect(() => {
    if (wallet.connected && wallet.publicKey && connection) {
      const program = getProgram(wallet, connection);
      console.log("Program loaded:", program.programId.toString());
    }
  }, [wallet.connected, connection]);

  return (
    <main className="px-6 pt-24">
      <h1 className="text-2xl font-semibold">Issue Certificate</h1>

      <button
        onClick={handleIssue}
        className="mt-6 rounded bg-black px-4 py-2 text-white"
      >
        Issue Test Certificate
      </button>
    </main>
  );
}
