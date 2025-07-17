import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FileIcon, Globe, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <Image
            className="dark:invert mx-auto mb-6"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold mb-4">Ultimate Next.js Starter Kit</h1>
          <p className="text-lg text-muted-foreground">
            A comprehensive starter kit combining Next.js, Supabase, and ShadCN to help you build modern web applications faster.
          </p>
        </div>

        {/* Features Card */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Core Technologies</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Frontend</h3>
              <ul className="space-y-2 text-sm">
                <li>• Next.js 14</li>
                <li>• ShadCN UI Components</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Backend</h3>
              <ul className="space-y-2 text-sm">
                <li>• Supabase Authentication</li>
                <li>• Supabase Database</li>
                <li>• Supabase Blob Storage</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>🏁 Getting Started</CardTitle>
            <CardDescription>Follow these steps to set up your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">1. Clone and Install</h3>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <div>git clone https://github.com/apensotti/ultimate-next-starter.git</div>
                <div>cd ultimate-next-starter</div>
                <div>npm install</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">2. Supabase Setup</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Create a Supabase account at <a href="https://supabase.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
                <li>Create a new organization (Personal/Free Plan works fine)</li>
                <li className="ml-4">Create a new project:
                  <ul className="list-disc ml-8 mt-2 space-y-1">
                    <li>Choose your organization</li>
                    <li>Name your project</li>
                    <li>Set a secure database password</li>
                    <li>Choose a region closest to your users</li>
                  </ul>
                </li>
                <li>Copy <code className="bg-muted px-1 rounded">.env.example</code> to <code className="bg-muted px-1 rounded">.env.local</code></li>
                <li className="ml-4">Get your API credentials:
                  <ul className="list-disc ml-8 mt-2 space-y-1">
                    <li>Go to Project Settings {'>'}API in dashboard</li>
                    <li>Copy Project URL to <code className="bg-muted px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
                    <li>Copy anon/public key to <code className="bg-muted px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                  </ul>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold mb-3">3. Google OAuth Setup</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li className="ml-4">Create Google OAuth Credentials:
                  <ul className="list-disc ml-8 mt-2 space-y-1">
                    <li>Go to <a href="https://console.cloud.google.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
                    <li>Create/select a project</li>
                    <li>Navigate to APIs & Services {'>'}Credentials</li>
                    <li>Create OAuth client ID for Web application</li>
                  </ul>
                </li>
                <li className="ml-4">Add authorized URIs:
                  <div className="bg-muted p-2 rounded-lg mt-2 space-y-1">
                    <div className="font-mono text-xs">Origins:</div>
                    <div className="font-mono text-xs ml-4">http://localhost:3000</div>
                    <div className="font-mono text-xs ml-4">https://YOUR_PRODUCTION_URL.com</div>
                    <div className="font-mono text-xs mt-2">Redirect URIs:</div>
                    <div className="font-mono text-xs ml-4">http://localhost:3000/auth/callback</div>
                    <div className="font-mono text-xs ml-4">https://YOUR_PRODUCTION_URL.com/auth/callback</div>
                  </div>
                </li>
                <li className="ml-4">Configure Supabase Auth:
                  <ul className="list-disc ml-8 mt-2 space-y-1">
                    <li>Go to Authentication {'>'}Providers in Supabase</li>
                    <li>Enable Google provider</li>
                    <li>Enter your Google Client ID and Secret</li>
                    <li>Save the configuration</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold mb-3">4. Start Development</h3>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <div>npm run dev</div>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">Visit <code className="bg-muted px-1 rounded">http://localhost:3000</code> to see your app</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                  <FileIcon className="mr-2 h-4 w-4" />
                  Documentation
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="https://github.com/apensotti/ultimate-next-starter" target="_blank" rel="noopener noreferrer">
                  <Terminal className="mr-2 h-4 w-4" />
                  Source Code
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Deploy
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Deploy Section */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Deploy</CardTitle>
            <CardDescription>Deploy your application with one click</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button size="lg" asChild>
              <a
                href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fapensotti%2Fultimate-next-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/vercel.svg"
                  alt="Vercel"
                  width={20}
                  height={20}
                  className="mr-2 dark:invert"
                />
                Deploy to Vercel
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground">
          <p>MIT License • Built with Next.js, Supabase, and ShadCN</p>
        </footer>
      </div>
    </div>
  );
}
