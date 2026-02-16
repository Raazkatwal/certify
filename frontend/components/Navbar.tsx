import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-background/80 fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold uppercase tracking-widest">
          CertChain
        </Link>

        <div className="flex items-center gap-4">
					<ThemeToggle />
          <Link href="/issue">
            <Button variant="outline">Issue</Button>
          </Link>
          <Link href="/verify">
            <Button>Verify</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
