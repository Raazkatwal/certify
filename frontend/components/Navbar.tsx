import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-8 py-4 flex justify-between">
      <Link href="/" className="font-semibold">
        Certify
      </Link>
      <div className="flex gap-4">
        <Link href="/issue">Issue</Link>
        <Link href="/verify">Verify</Link>
      </div>
    </nav>
  );
}
