"use client";

import { useState } from "react";
import { getProgram } from "@/lib/anchor";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram } from "@solana/web3.js";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function IssuePage() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState("");
  const [metadata, setMetadata] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIssue = async () => {
    if (!wallet.publicKey || !connection || !wallet.connected) {
      toast.warning("Wallet not connected");
      return;
    }

    setLoading(true);
    try {
      const program = getProgram(wallet, connection);
      const certificateKeypair = Keypair.generate();

      await program.methods
        .issueCertificate(wallet.publicKey, metadata || "dummy-metadata-hash")
        .accounts({
          certificate: certificateKeypair.publicKey,
          issuer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([certificateKeypair])
        .rpc();

      toast.success("Certificate issued!", {
        description: `Recipient: ${recipient}`,
      });

      setRecipient("");
      setMetadata("");
    } catch (err: any) {
      console.error(err);
      toast.error("Error issuing certificate", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 pt-24">
      <h1 className="text-3xl font-bold">Issue Certificate</h1>
      <p className="text-muted-foreground">
        Enter recipient info and metadata, then issue a verifiable certificate
        on Solana.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Recipient Name / Email</Label>
          <Input
            placeholder="John Doe or john@example.com"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Certificate Metadata (optional)</Label>
          <Input
            placeholder="IPFS hash or description"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
          />
        </div>

        <Button
          onClick={handleIssue}
          disabled={loading}
          className="w-full cursor-pointer"
        >
          {loading ? "Issuing..." : "Issue Certificate"}
        </Button>
      </div>
    </main>
  );
}
