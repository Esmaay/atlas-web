/// <reference types="vite/client" />
import * as React from "react";

import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { Toaster } from "@/components/ui/sonner";
import { authQueryOptions } from "@/features/auth/services/auth.query";
import appCss from "@/styles/globals.css?url";
import { seo } from "@/utils/seo";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");
        </style>
      </head>
      <body className="min-h-screen min-w-full antialiased">
        <ThemeProvider
          defaultTheme="system"
          enableColorScheme
          enableSystem
          attribute="class"
        >
          <Toaster richColors />
          {children}
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </ThemeProvider>

        <Scripts />
      </body>
    </html>
  );
};

const RootComponent = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ context }) => {
    const auth = await context.queryClient.ensureQueryData(authQueryOptions());

    return {
      auth,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Atlas | Game Server Management Dashboard",
        description:
          "Atlas is a comprehensive game server management platform providing real-time monitoring, auto-scaling, and administration capabilities for gaming networks and server infrastructure.",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootLayout>
        <DefaultCatchBoundary {...props} />
      </RootLayout>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});
