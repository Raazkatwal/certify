"use client";

import { useEffect, useState } from "react";
import { getProgram } from "@/lib/anchor";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { WalletButton } from "@/components/WalletButton";
import { Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ParsedMetadata = {
  recipient: string;
  recipientName: string;
  courseName: string;
  description?: string;
  issuedAt: string;
};

type CertificateData = {
  issuer: string;
  metadata: ParsedMetadata;
};

export default function CertificatesPage() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!wallet.connected || !wallet.publicKey) {
      setCertificates([]);
      return;
    }

    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const program = getProgram(wallet, connection);

        const accounts = await program.account.certificate.all([
          {
            memcmp: {
              offset: 40,
              bytes: wallet.publicKey!.toBase58(),
            },
          },
        ]);

        const formatted = accounts.map((acc) => {
          const tx = localStorage.getItem(acc.publicKey.toBase58());
          let parsed: ParsedMetadata;

          try {
            parsed = JSON.parse(acc.account.metadataHash);
          } catch {
            parsed = {
              recipient: "",
              recipientName: "Unknown",
              courseName: "Unknown Course",
              description: "",
              issuedAt: "",
            };
          }

          return {
            issuer: acc.account.issuer.toBase58(),
            tx,
            metadata: parsed,
          };
        });

        setCertificates(formatted);
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to fetch certificates", {
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [wallet.connected, wallet.publicKey, connection]);

  if (!wallet.connected) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
        <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <Wallet className="text-primary h-8 w-8" />
        </div>

        <Badge variant="secondary" className="mb-4">
          Wallet Not Connected
        </Badge>

        <h2 className="mb-3 text-2xl font-semibold">
          Connect Your Wallet to View Certificates
        </h2>

        <p className="text-muted-foreground mb-8 max-w-md">
          Your verifiable certificates are securely stored on Solana.
        </p>

        <WalletButton />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-8 py-24">
      <h1 className="text-3xl font-bold">My Certificates</h1>
      <p className="text-muted-foreground">
        Certificates issued to your wallet.
      </p>

      {loading ? (
        <p>Loading certificates...</p>
      ) : certificates.length === 0 ? (
        <p>No certificates found for this wallet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {certificates.map((cert, i) => (
            <Card key={i} className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>
                  {cert.metadata.courseName || `Certificate #${i + 1}`}
                </CardTitle>
                <CardDescription>Issued by: {cert.issuer}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-sm">Awarded to</p>
                  <p className="text-lg font-semibold">
                    {cert.metadata.recipientName}
                  </p>
                </div>

                {cert.metadata.description && (
                  <p className="text-muted-foreground text-sm">
                    {cert.metadata.description}
                  </p>
                )}

                {cert.metadata.issuedAt && (
                  <p className="text-muted-foreground border-t pt-2 text-xs">
                    Issued on{" "}
                    {new Date(cert.metadata.issuedAt).toLocaleDateString()}
                  </p>
                )}

                {cert.tx && (
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(cert.tx!)}
                    >
                      Copy TX
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          `https://solscan.io/tx/${cert.tx}?cluster=devnet`,
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
          ))}
        </div>
      )}
    </div>
  );
}
