import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Users, ClipboardCheck, DollarSign, BookOpen, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const stats = [
  {
    title: "Total Students",
    value: "2,845",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "bg-[#176b63]",
  },
  {
    title: "Today's Attendance",
    value: "92.5%",
    change: "+2.3%",
    trend: "up",
    icon: ClipboardCheck,
    color: "bg-[#3b8f77]",
  },
  {
    title: "Pending Fees",
    value: "₹45,230",
    change: "-8%",
    trend: "down",
    icon: DollarSign,
    color: "bg-[#e5a94f]",
  },
  {
    title: "Library Books",
    value: "12,450",
    change: "+5%",
    trend: "up",
    icon: BookOpen,
    color: "bg-[#7d78b8]",
  },
];

const attendanceData = [
  { month: "Jan", percentage: 88 },
  { month: "Feb", percentage: 90 },
  { month: "Mar", percentage: 87 },
  { month: "Apr", percentage: 91 },
  { month: "May", percentage: 89 },
  { month: "Jun", percentage: 93 },
];

const studentsByDepartment = [
  { name: "Computer Science", value: 850, color: "#3b82f6" },
  { name: "Mechanical", value: 620, color: "#8b5cf6" },
  { name: "Civil", value: 540, color: "#10b981" },
  { name: "Electrical", value: 485, color: "#f59e0b" },
  { name: "Others", value: 350, color: "#6b7280" },
];

const feeCollectionData = [
  { month: "Jan", collected: 85000, pending: 15000 },
  { month: "Feb", collected: 92000, pending: 12000 },
  { month: "Mar", collected: 88000, pending: 16000 },
  { month: "Apr", collected: 95000, pending: 10000 },
  { month: "May", collected: 90000, pending: 14000 },
  { month: "Jun", collected: 97000, pending: 8000 },
];

export function Dashboard() {
  return (
    <div className="space-y-7">
      <div className="dashboard-hero relative overflow-hidden rounded-2xl px-6 py-7 text-white lg:px-8">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a7d8cf]">Tuesday, September 22, 2026</p>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Good morning, Admin.</h1>
          <p className="mt-2 max-w-lg text-sm text-[#d1e9e4]">Here is your college at a glance. Keep an eye on the numbers that move your campus forward.</p>
        </div>
        <div className="absolute -right-8 -top-16 h-56 w-56 rounded-full border-[28px] border-white/10" />
        <div className="absolute -bottom-24 right-28 h-44 w-44 rounded-full border-[20px] border-[#f0785f]/30" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card key={stat.title} className="dashboard-card border-transparent">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2.5 rounded-xl`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <TrendIcon
                    className={`w-4 h-4 ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  />
                  <span
                    className={
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Attendance Trend */}
        <Card className="dashboard-card border-transparent">
          <CardHeader>
            <div><CardTitle>Attendance trend</CardTitle><p className="mt-1 text-sm font-normal text-muted-foreground">Six-month average</p></div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Attendance %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Students by Department */}
        <Card className="dashboard-card border-transparent">
          <CardHeader>
            <div><CardTitle>Students by department</CardTitle><p className="mt-1 text-sm font-normal text-muted-foreground">Current enrollment mix</p></div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={studentsByDepartment}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {studentsByDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Collection */}
        <Card className="dashboard-card md:col-span-2 border-transparent">
          <CardHeader>
            <div className="flex w-full items-start justify-between"><div><CardTitle>Fee collection status</CardTitle><p className="mt-1 text-sm font-normal text-muted-foreground">Collected vs pending by month</p></div><ArrowUpRight className="h-5 w-5 text-[#176b63]" /></div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feeCollectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="collected" fill="#10b981" name="Collected" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
