"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  FileText, 
  Activity, 
  Brain,
  Download,
  Eye,
  Loader2,
  AlertCircle
} from "lucide-react"

interface Study {
  id: string
  studyNumber: number
  date: string
  filename: string
  processingMode: string
  bodyPart: string
  symptoms: string
  notes: string
  triage: {
    level: string
    bodyPart: string
    detections: Array<{
      label: string
      score: number
      bbox?: number[]
    }>
    recommendations: string[]
  }
  images: {
    original?: string
    annotated?: string
  }
  patientSummary?: string
  confidenceScore?: number
  processingTime?: number
  pdfReport?: {
    filename: string
    sizeBytes: number
  }
}

interface Patient {
  patientId: string
  name: string
  age?: number
  gender?: string
  mrn?: string
  phone?: string
  email?: string
  dob?: string
  additional?: string
}

export default function PatientDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.patientId as string
  
  const [patient, setPatient] = useState<Patient | null>(null)
  const [studies, setStudies] = useState<Study[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false)
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null)

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/patients/${patientId}`)
        const data = await response.json()
        
        if (data.success) {
          setPatient(data.patient)
          setStudies(data.studies)
        } else {
          setError(data.error || 'Failed to fetch patient details')
        }
      } catch (err) {
        setError('Failed to fetch patient details')
        console.error('Error fetching patient details:', err)
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      fetchPatientDetails()
    }
  }, [patientId])

  const getTriageBadge = (level: string) => {
    const variants = {
      RED: "bg-red-100 text-red-800 border-red-200",
      AMBER: "bg-yellow-100 text-yellow-800 border-yellow-200", 
      GREEN: "bg-green-100 text-green-800 border-green-200",
    }
    
    return (
      <Badge className={`${variants[level as keyof typeof variants]} border`}>
        {level} Priority
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleAIAnalysis = async () => {
    try {
      setAiAnalysisLoading(true)
      setAiAnalysisResult(null)
      
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId,
          studies: studies.map(study => ({
            id: study.id,
            date: study.date,
            bodyPart: study.bodyPart,
            symptoms: study.symptoms,
            triage: study.triage,
            patientSummary: study.patientSummary,
            recommendations: study.triage.recommendations
          }))
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setAiAnalysisResult(data.analysis)
      } else {
        setError('Failed to generate AI analysis')
      }
    } catch (err) {
      setError('Failed to generate AI analysis')
      console.error('Error generating AI analysis:', err)
    } finally {
      setAiAnalysisLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading patient details...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patient Records
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Patient #{patient?.patientId}
            </h1>
            <p className="text-gray-600 mt-2">
              Complete medical history and diagnostic studies
            </p>
          </div>
          
          <Button 
            onClick={handleAIAnalysis}
            disabled={aiAnalysisLoading || studies.length === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {aiAnalysisLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                AI Clinical Analysis
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <div className="lg:col-span-1">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{patient?.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  {patient?.age && <span>{patient.age} years</span>}
                  {patient?.gender && patient?.age && <span>•</span>}
                  {patient?.gender && <span className="capitalize">{patient.gender}</span>}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                {patient?.mrn && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">MRN:</span>
                    <span>{patient.mrn}</span>
                  </div>
                )}
                
                {patient?.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{patient.phone}</span>
                  </div>
                )}
                
                {patient?.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="break-all">{patient.email}</span>
                  </div>
                )}
                
                {patient?.dob && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>DOB: {new Date(patient.dob).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              {patient?.additional && (
                <>
                  <Separator />
                  <div>
                    <span className="font-medium text-sm">Additional Notes:</span>
                    <p className="text-sm text-gray-600 mt-1">{patient.additional}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* AI Analysis Results */}
          {aiAnalysisResult && (
            <Card className="rounded-2xl mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Clinical Analysis
                </CardTitle>
                <CardDescription>
                  Comprehensive analysis of all patient studies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {aiAnalysisResult}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Studies List */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Diagnostic Studies ({studies.length})
              </CardTitle>
              <CardDescription>
                Complete history of diagnostic studies and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {studies.map((study) => (
                  <Card key={study.id} className="border border-gray-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            Study #{study.studyNumber}
                          </CardTitle>
                          <CardDescription>
                            {formatDate(study.date)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTriageBadge(study.triage.level)}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Study Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Body Part:</span>
                          <p className="text-gray-600">{study.bodyPart}</p>
                        </div>
                        <div>
                          <span className="font-medium">Processing Mode:</span>
                          <p className="text-gray-600">{study.processingMode}</p>
                        </div>
                      </div>
                      
                      {study.symptoms && (
                        <div>
                          <span className="font-medium text-sm">Symptoms:</span>
                          <p className="text-sm text-gray-600 mt-1">{study.symptoms}</p>
                        </div>
                      )}
                      
                      {study.notes && (
                        <div>
                          <span className="font-medium text-sm">Notes:</span>
                          <p className="text-sm text-gray-600 mt-1">{study.notes}</p>
                        </div>
                      )}
                      
                      {/* Detections */}
                      {study.triage.detections.length > 0 && (
                        <div>
                          <span className="font-medium text-sm">Detections:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {study.triage.detections.map((detection, idx) => (
                              <Badge key={idx} variant="outline">
                                {detection.label} ({(detection.score * 100).toFixed(1)}%)
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Recommendations */}
                      {study.triage.recommendations.length > 0 && (
                        <div>
                          <span className="font-medium text-sm">Recommendations:</span>
                          <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                            {study.triage.recommendations.map((rec, idx) => (
                              <li key={idx}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Patient Summary */}
                      {study.patientSummary && (
                        <div>
                          <span className="font-medium text-sm">AI Summary:</span>
                          <p className="text-sm text-gray-600 mt-1">{study.patientSummary}</p>
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t">
                        {study.images.original && (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Images
                          </Button>
                        )}
                        
                        {study.pdfReport && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download Report
                          </Button>
                        )}
                        
                        <div className="ml-auto text-xs text-gray-500">
                          {study.confidenceScore && (
                            <span>Confidence: {(study.confidenceScore * 100).toFixed(1)}%</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {studies.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No studies found
                    </h3>
                    <p className="text-gray-600">
                      This patient doesn't have any completed diagnostic studies yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}