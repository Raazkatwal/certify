"use client";

import { useState } from "react";
import { getProgram } from "@/lib/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";

type ParsedMetadata = {
  recipient: string;
  recipientName: string;
  courseName: string;
  description?: string;
  issuedAt?: string;
  verify?: boolean;
};

export default function VerifyPage() {
  const { connection } = useConnection();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<{
    metadata: ParsedMetadata;
    issuer: string;
    tx?: string;
  } | null>(null);

  const handleVerify = async () => {
    if (!input) return toast.warning("Enter a certificate public key or TX ID");

    setLoading(true);
    setCertificate(null);

    try {
      let isPublicKey = true;
      let pubkey: PublicKey | null = null;

      try {
        pubkey = new PublicKey(input);
      } catch {
        isPublicKey = false;
      }

      if (isPublicKey && pubkey) {
        const program = getProgram(null, connection) as any;
        const account = await program.account.certificate.fetch(pubkey);

        let parsed;
        try {
          parsed = JSON.parse(account.metadataHash);
        } catch {
          parsed = {
            recipient: "",
            recipientName: "Unknown",
            courseName: "Unknown Course",
            description: "",
            issuedAt: "",
          };
        }

        const tx = localStorage.getItem(pubkey.toBase58()) ?? undefined;

        setCertificate({
          metadata: parsed,
          issuer: account.issuer.toBase58(),
          tx,
        });
      } else {
        setCertificate({
          metadata: {
            recipient: "",
            recipientName: "Unknown",
            courseName: "Unknown",
            description: "Certificate not loaded, only TX available",
            issuedAt: "",
          },
          issuer: "Unknown",
          tx: input,
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Certificate not found", { description: err?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-8 py-24">
      <h1 className="text-3xl font-bold">Verify Certificate</h1>
      <p className="text-muted-foreground">
        Enter a certificate public key or transaction ID to verify its details.
      </p>

      <div className="flex gap-2">
        <Input
          placeholder="Paste certificate public key or TX"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </div>

      {certificate && (
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>{certificate.metadata.courseName}</CardTitle>
            <CardDescription>Issued by: {certificate.issuer}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground text-sm">Awarded to</p>
            <p className="text-lg font-semibold">
              {certificate.metadata.recipientName}
            </p>

            {certificate.metadata.description && (
              <p className="text-muted-foreground text-sm">
                {certificate.metadata.description}
              </p>
            )}

            {certificate.metadata.issuedAt && (
              <p className="text-muted-foreground text-xs">
                Issued on{" "}
                {new Date(certificate.metadata.issuedAt).toLocaleDateString()}
              </p>
            )}

            {certificate.tx && (
              <div className="mt-2 flex gap-2">
                <Button
									className="cursor-pointer"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://solscan.io/tx/${certificate.tx}?cluster=devnet`,
                      "_blank",
                    )
                  }
                >
                  View on Solscan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
