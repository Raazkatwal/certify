import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "./certify.json";

export const PROGRAM_ID = new PublicKey(
  "HEYaFCGw2M4W9xnrXxzoByfQhHr5uRMHiYGM5MoQPKq4",
);

export function getProgram(wallet: any, connection: any) {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });

  return new Program(idl as Idl, provider);
}
