import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function DashboardOverview() {
  // Mock data for demonstration
  const triageData = {
    red: { today: 2, week: 8 },
    amber: { today: 5, week: 23 },
    green: { today: 12, week: 67 },
  }

  const recentActivity = [
    {
      id: "ST-001",
      date: "2024-01-15",
      patient: "Patient #1234",
      modality: "X-ray",
      bodyPart: "Hand",
      status: "red",
    },
    {
      id: "ST-002",
      date: "2024-01-15",
      patient: "Patient #1235",
      modality: "CT",
      bodyPart: "Leg",
      status: "green",
    },
    {
      id: "ST-003",
      date: "2024-01-14",
      patient: "Patient #1236",
      modality: "MRI",
      bodyPart: "Spine",
      status: "amber",
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

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Monitor your diagnostic workflow and recent activity</p>
      </div>

      {/* Triage Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Red Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-red-600">{triageData.red.today}</span>
              <span className="text-sm text-gray-500">today</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{triageData.red.week} this week</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Amber Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-yellow-600">{triageData.amber.today}</span>
              <span className="text-sm text-gray-500">today</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{triageData.amber.week} this week</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Green Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-green-600">{triageData.green.today}</span>
              <span className="text-sm text-gray-500">today</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{triageData.green.week} this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest diagnostic studies and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Patient/ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Modality</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Body Part</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{activity.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{activity.patient}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{activity.modality}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{activity.bodyPart}</td>
                      <td className="py-3 px-4">{getStatusBadge(activity.status)}</td>
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
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No studies yet</h3>
              <p className="text-gray-600 mb-4">Upload an image to get started with your first diagnostic study.</p>
              <Button>Upload Study</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
