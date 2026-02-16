import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-24">
      <section className="grid items-center gap-16 py-28 md:grid-cols-2">
        <div>
          <h1 className="mb-6 text-5xl leading-tight font-bold">
            Verifiable Certificates
            <br />
            Powered by Solana
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            CertChain enables organizations to issue tamper-proof, on-chain
            certificates that are instantly verifiable and globally accessible.
          </p>
          <div className="flex gap-4">
            <Link href="/issue">
              <Button size="lg">Issue Certificates</Button>
            </Link>
            <Link href="/verify">
              <Button size="lg" variant="outline">
                Verify Certificate
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-sm border p-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Example Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                Issuer: CertChain Organization
              </p>
              <p className="text-muted-foreground mb-4 text-sm">
                Recipient: Jane Doe
              </p>
              <p className="text-muted-foreground mb-4 text-sm">
                Event: Hackathon 2026
              </p>
              <p className="text-muted-foreground text-sm">
                Issued on: 14 Feb 2026
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-24">
        <h2 className="mb-16 text-center text-3xl font-semibold">Built For</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Workshops",
              desc: "Issue verified attendance certificates at scale.",
            },
            {
              title: "Hackathons",
              desc: "Provide immutable participation and winner credentials.",
            },
            {
              title: "Clubs & Organizations",
              desc: "Confirm membership and leadership roles.",
            },
            {
              title: "Academic Programs",
              desc: "Document course completion with on-chain records.",
            },
          ].map((useCase, idx) => (
            <Card
              key={idx}
              className="bg-card rounded-lg border p-6 transition hover:shadow-sm"
            >
              <CardHeader>
                <CardTitle>{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{useCase.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-24">
        <h2 className="mb-16 text-center text-3xl font-semibold">
          Core Advantages
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Tamper-Proof Records",
              desc: "Certificates are stored on Solana, ensuring immutability and security.",
            },
            {
              title: "Instant Verification",
              desc: "Anyone can verify a certificate in seconds using a wallet address.",
            },
            {
              title: "Low Transaction Costs",
              desc: "Solana’s efficient architecture ensures minimal issuance fees.",
            },
            {
              title: "Real-Time Issuance",
              desc: "Certificates are minted and confirmed within seconds.",
            },
            {
              title: "Portable Credentials",
              desc: "Recipients can share credentials across platforms and profiles.",
            },
            {
              title: "Wallet-Based Authentication",
              desc: "Secure issuance and validation using Web3 wallet connections.",
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-card rounded-lg border p-6">
              <h4 className="mb-3 text-lg font-medium">{feature.title}</h4>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <div className="bg-primary text-primary-foreground rounded-xl p-14 text-center">
          <h3 className="mb-4 text-3xl font-semibold">
            Start Issuing Verifiable Credentials
          </h3>
          <p className="mb-8 text-lg opacity-90">
            Connect your Solana wallet and begin issuing certificates securely.
          </p>
          <Link href="/issue">
            <Button size="lg" variant="secondary">
              Launch Organizer Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-border text-muted-foreground border-t py-8 text-center text-sm">
        <p>CertChain - Blockchain Certificates on Solana</p>
      </footer>
    </main>
  );
}
