"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function HistoryPage() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [severityFilter, setSeverityFilter] = useState("")

  // Mock data for demonstration
  const historyData = [
    {
      id: "ST-001",
      date: "2024-01-15",
      patient: "Patient #1234",
      modality: "X-ray",
      bodyPart: "Hand",
      status: "red",
      processed: "2024-01-15 14:35:22",
    },
    {
      id: "ST-002",
      date: "2024-01-15",
      patient: "Patient #1235",
      modality: "CT",
      bodyPart: "Leg",
      status: "green",
      processed: "2024-01-15 13:22:15",
    },
    {
      id: "ST-003",
      date: "2024-01-14",
      patient: "Patient #1236",
      modality: "MRI",
      bodyPart: "Spine",
      status: "amber",
      processed: "2024-01-14 16:45:33",
    },
    {
      id: "ST-004",
      date: "2024-01-14",
      patient: "Patient #1237",
      modality: "X-ray",
      bodyPart: "Ribs",
      status: "green",
      processed: "2024-01-14 11:20:44",
    },
    {
      id: "ST-005",
      date: "2024-01-13",
      patient: "Patient #1238",
      modality: "CT",
      bodyPart: "Hand",
      status: "amber",
      processed: "2024-01-13 09:15:22",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      red: "bg-red-100 text-red-800",
      amber: "bg-yellow-100 text-yellow-800",
      green: "bg-green-100 text-green-800",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status.toUpperCase()}</Badge>
  }

  const filteredData = historyData.filter((item) => {
    if (severityFilter && item.status !== severityFilter) return false
    if (dateFrom && item.date < dateFrom) return false
    if (dateTo && item.date > dateTo) return false
    return true
  })

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Study History</h1>
        <p className="text-gray-600 mt-2">View and filter your past diagnostic studies</p>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter studies by date range and severity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="date-from">From Date</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="date-to">To Date</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="severity">Severity</Label>
              <select
                id="severity"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Severities</option>
                <option value="red">Red Priority</option>
                <option value="amber">Amber Priority</option>
                <option value="green">Green Priority</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setDateFrom("")
                  setDateTo("")
                  setSeverityFilter("")
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Study History ({filteredData.length} studies)</CardTitle>
          <CardDescription>Complete history of processed diagnostic studies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Study ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Patient</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Modality</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Body Part</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Processed</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((study) => (
                  <tr key={study.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{study.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{study.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{study.patient}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{study.modality}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{study.bodyPart}</td>
                    <td className="py-3 px-4">{getStatusBadge(study.status)}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{study.processed}</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
