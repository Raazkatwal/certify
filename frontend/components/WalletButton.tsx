"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, LogOut, Wallet } from "lucide-react";

export function WalletButton() {
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  if (!publicKey) {
    return (
      <Button size="sm" onClick={() => setVisible(true)}>
        <Wallet className="mr-2 size-4" />
        Connect Wallet
      </Button>
    );
  }

  const shortAddress =
    publicKey.toBase58().slice(0, 4) + "..." + publicKey.toBase58().slice(-4);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          {shortAddress}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(publicKey.toBase58())}
        >
          <Copy className="mr-2 size-4" />
          Copy Address
        </DropdownMenuItem>

        <DropdownMenuItem onClick={disconnect}>
          <LogOut className="mr-2 size-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
