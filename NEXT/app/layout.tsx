import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "OrthoAssist - Modular Orthopedic AI Assistant",
  description:
    "Multi-agent workflow that validates imaging, detects fractures, triages severity, and generates clear, clinician-ready reports.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
    signInUrl="/login"
    signUpUrl="/signup"
    afterSignInUrl="/dashboard"
    afterSignUpUrl="/dashboard"
    >
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>

    </ClerkProvider>
    
  )
}