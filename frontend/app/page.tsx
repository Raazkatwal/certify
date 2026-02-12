import Link from "next/link";
export default function Home() {
  return (
    <main className="p-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold">Certify</h1>
      <p className="mt-4 text-lg text-gray-600">
        Verificable college paritcipation proofs build on Solana.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/issue" className="px-4 py-2 bg-black text-white rounded">
          Issue Certificate
        </Link>
        <Link href="/verify" className="px-4 py-2 bg-black text-white rounded">
          Verify Certificate
        </Link>
      </div>
    </main>
  );
}
