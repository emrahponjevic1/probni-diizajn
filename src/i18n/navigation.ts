import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// ---------------------------------------------------------------------------
// POVEZAVE, KI POZNAJO JEZIK
//
// Od tod uvažaj Link, ne iz "next/link". Razlika:
//
//   next/link      <Link href="/meni">   ->  /meni            (vedno)
//   ta Link        <Link href="/meni">   ->  /meni            v slovenščini
//                                            /de/speisekarte  v nemščini
//
// Pot pišeš vedno v notranji obliki ("/meni"), prevod naredi next-intl sam
// po tabeli v routing.ts.
// ---------------------------------------------------------------------------

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
