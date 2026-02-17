"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Navbar() {
  return (
    <nav className="bg-background/80 fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold uppercase tracking-widest">
          Certify
        </Link>

        <div className="flex items-center gap-4">
					<WalletMultiButton />
					<ThemeToggle />
          <Link href="/issue">
            <Button variant="outline" className="cursor-pointer">Issue</Button>
          </Link>
          <Link href="/verify">
            <Button className="cursor-pointer">Verify</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
