"use client";

import { useMemo, useState } from "react";
import { getProgram } from "@/lib/anchor";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function IssuePage() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const shortWallet = useMemo(() => {
    if (!wallet.publicKey) return "";
    const key = wallet.publicKey.toBase58();
    return key.slice(0, 4) + "..." + key.slice(-4);
  }, [wallet.publicKey]);

  const handleIssue = async () => {
    if (!wallet.publicKey || !connection || !wallet.connected) {
      toast.warning("Wallet not connected");
      return;
    }

    if (!recipient || !recipientName || !courseName) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      new PublicKey(recipient);
    } catch {
      toast.error("Invalid recipient wallet address");
      return;
    }

    setLoading(true);

    try {
      const program = getProgram(wallet, connection);
      const certificateKeypair = Keypair.generate();

      const metadata = JSON.stringify({
        recipient,
        recipientName,
        courseName,
        description,
        issuedAt: new Date().toISOString(),
      });

      const tx = await program.methods
        .issueCertificate(new PublicKey(recipient), metadata)
        .accounts({
          certificate: certificateKeypair.publicKey,
          issuer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([certificateKeypair])
        .rpc();

			localStorage.setItem(certificateKeypair.publicKey.toBase58(), tx);

      toast.success("Certificate issued successfully!");

      setRecipient("");
      setRecipientName("");
      setCourseName("");
      setDescription("");
    } catch (err: any) {
      console.error(err);
      toast.error("Error issuing certificate", {
        description: err?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-8 pt-24 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Issue Certificate</h1>
        <p className="text-muted-foreground">
          Mint a blockchain-verified certificate to a recipient wallet.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant={wallet.connected ? "default" : "destructive"}>
          {wallet.connected ? "Wallet Connected" : "Wallet Not Connected"}
        </Badge>

        {wallet.connected && (
          <p className="text-muted-foreground text-sm">{shortWallet}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
            <CardDescription>
              Fill in the details below to issue a certificate.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Recipient Wallet *</Label>
              <Input
                placeholder="Enter recipient wallet address"
                value={recipient ?? ""}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Recipient Name *</Label>
              <Input
                placeholder="John Doe"
                value={recipientName ?? ""}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Course / Event Name *</Label>
              <Input
                placeholder="Solana Bootcamp 2026"
                value={courseName ?? ""}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="Completed 3-day intensive workshop"
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button
              onClick={handleIssue}
              disabled={loading || !wallet.connected}
              className="w-full rounded-2xl"
            >
              {loading ? "Issuing..." : "Issue Certificate"}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>
              This is how your certificate metadata will look.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="bg-muted/20 space-y-4 rounded-xl border p-8 text-center">
              <h3 className="text-lg font-semibold">
                Certificate of Completion
              </h3>

              <p>This certifies that</p>

              <p className="text-2xl font-bold">
                {recipientName || "Recipient Name"}
              </p>

              <p>has successfully completed</p>

              <p className="font-semibold">{courseName || "Course Name"}</p>

              {description && (
                <p className="text-muted-foreground mt-4 text-sm">
                  {description}
                </p>
              )}

              <p className="text-muted-foreground mt-6 text-xs">
                Issued by {shortWallet || "Issuer Wallet"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
