"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { WalletButton } from "./WalletButton";

export default function Navbar() {
  return (
    <nav className="bg-background/80 fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-semibold tracking-widest uppercase"
        >
          Certify
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/issue"
            className="hover:text-primary transition-colors hover:underline"
          >
            Issue
          </Link>

          <Link
            href="/certificates"
            className="hover:text-primary transition-colors hover:underline"
          >
            My Certificates
          </Link>

          <Link
            href="/verify"
            className="hover:text-primary transition-colors hover:underline"
          >
            Verify
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <WalletButton />
        </div>
      </div>
    </nav>
  );
}
