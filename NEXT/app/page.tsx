"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  return (
    
    <div className="min-h-screen ">
      <Navbar />
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Modular Orthopedic Agent for Precise, Faster Diagnosis
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Multi-agent workflow that validates imaging, detects fractures, triages severity, and generates clear,
            clinician-ready reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/product/workflow">View Workflow</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
  <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Multi-Modal Inputs</h3>
              <p className="text-muted-foreground">X-ray, CT, MRI + text/audio</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Real-time Triage</h3>
              <p className="text-muted-foreground">Red/Amber/Green classification</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">MCP-driven Collaboration</h3>
              <p className="text-muted-foreground">Parallel agents for speed</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Scalable & Extensible</h3>
              <p className="text-muted-foreground">Modular architecture</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  Multi-Modal Inputs
                </CardTitle>
                <CardDescription>
                  Process X-ray, CT, MRI images along with text notes and audio descriptions for comprehensive analysis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  Real-Time Triage
                </CardTitle>
                <CardDescription>
                  Instant Red/Amber/Green classification system for immediate priority assessment and clinical decision
                  support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  MCP Collaboration
                </CardTitle>
                <CardDescription>
                  Parallel agent processing enables faster, more confident diagnosis through specialized body part
                  expertise.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  Clinician & Patient Output
                </CardTitle>
                <CardDescription>
                  Generate structured doctor reports and patient-friendly explanations from the same analysis.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Workflow Preview */}
  <section className="py-16 bg-muted px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Workflow Overview</h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
            {[
              { step: "Validate", desc: "Input verification" },
              { step: "Detect", desc: "Body part agents" },
              { step: "Review", desc: "Hairline analysis" },
              { step: "Triage", desc: "R/A/G classification" },
              { step: "Diagnose", desc: "LLM analysis" },
              { step: "Report", desc: "Generate outputs" },
              { step: "Locate", desc: "Hospital finder" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold mb-3">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-foreground">{item.step}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {index < 6 && (
                  <div className="hidden md:block w-8 h-0.5 bg-border mt-8 absolute translate-x-12"></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 px-4 py-2 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-blue-800 dark:text-blue-200 font-medium">Why MCP? Parallel agents = speed + confidence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Clinicians</CardTitle>
                <CardDescription>
                  Enhanced diagnostic confidence with AI-powered second opinions and detailed analysis reports.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Rural X-ray Centers</CardTitle>
                <CardDescription>
                  Bridge expertise gaps with instant specialist-level analysis for remote healthcare facilities.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Health Camps</CardTitle>
                <CardDescription>
                  Rapid triage and diagnosis capabilities for mobile healthcare and emergency response scenarios.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Telemedicine</CardTitle>
                <CardDescription>
                  Enable remote consultations with comprehensive imaging analysis and patient communication tools.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
  <section className="py-16 bg-muted px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Essential features for small practices</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Up to 100 studies/month</li>
                  <li>• Basic triage system</li>
                  <li>• Standard reports</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-blue-200">
              <CardHeader>
                <Badge className="w-fit mb-2">Popular</Badge>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Advanced features for growing practices</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Unlimited studies</li>
                  <li>• Advanced AI agents</li>
                  <li>• Custom reports</li>
                  <li>• API access</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Full-scale deployment solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Custom deployment</li>
                  <li>• Dedicated support</li>
                  <li>• Integration assistance</li>
                  <li>• SLA guarantees</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/pricing">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What imaging modalities does OrthoAssist support?
              </h3>
              <p className="text-muted-foreground">
                OrthoAssist supports X-ray, CT, and MRI images, along with text notes and audio descriptions for
                comprehensive analysis.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">How accurate is the AI diagnosis?</h3>
              <p className="text-muted-foreground">
                Our multi-agent system provides specialist-level accuracy with built-in validation and confidence
                scoring for reliable clinical decision support.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Is OrthoAssist HIPAA compliant?</h3>
              <p className="text-muted-foreground">
                Yes, OrthoAssist is fully HIPAA compliant with end-to-end encryption and secure data handling protocols.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can I integrate OrthoAssist with my existing PACS system?
              </h3>
              <p className="text-muted-foreground">
                Yes, we provide API integration capabilities and work with most major PACS systems for seamless workflow
                integration.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What kind of support do you provide?</h3>
              <p className="text-muted-foreground">
                We offer comprehensive support including training, technical assistance, and dedicated account
                management for enterprise customers.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
