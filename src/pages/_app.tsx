// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from "react";

/*
// EXAMPLE FROM NEXT-AUTH TRPC
const MyApp: AppType<{ session: Session | null }> = ({Component, pageProps: { session, ...pageProps },}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};
*/

const MyApp: AppType<{ initialSession: Session }> = ({ Component, pageProps }) => {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
};

export default trpc.withTRPC(MyApp);
