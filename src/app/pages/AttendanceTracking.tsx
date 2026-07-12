import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { Calendar, Download, CheckCircle2, XCircle } from "lucide-react";

interface AttendanceRecord {
  id: string;
  rollNo: string;
  name: string;
  department: string;
  present: boolean;
}

const initialRecords: AttendanceRecord[] = [
  { id: "1", rollNo: "CS2024001", name: "John Doe", department: "Computer Science", present: true },
  { id: "2", rollNo: "ME2024002", name: "Jane Smith", department: "Computer Science", present: true },
  { id: "3", rollNo: "EE2024003", name: "Michael Johnson", department: "Computer Science", present: false },
  { id: "4", rollNo: "CV2024004", name: "Emily Brown", department: "Computer Science", present: true },
  { id: "5", rollNo: "CS2024005", name: "Robert Wilson", department: "Computer Science", present: true },
];

export function AttendanceTracking() {
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Science");
  const [selectedYear, setSelectedYear] = useState("3rd Year");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords);

  const toggleAttendance = (id: string) => {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, present: !record.present } : record
      )
    );
  };

  const markAllPresent = () => {
    setRecords(records.map((record) => ({ ...record, present: true })));
  };

  const markAllAbsent = () => {
    setRecords(records.map((record) => ({ ...record, present: false })));
  };

  const presentCount = records.filter((r) => r.present).length;
  const absentCount = records.length - presentCount;
  const attendancePercentage = ((presentCount / records.length) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance Tracking</h1>
        <p className="text-muted-foreground">Mark and track student attendance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Present
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Attendance %
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendancePercentage}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <div className="grid gap-4 sm:grid-cols-4 mt-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quick Actions</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={markAllPresent} className="flex-1">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  All Present
                </Button>
                <Button variant="outline" size="sm" onClick={markAllAbsent} className="flex-1">
                  <XCircle className="w-4 h-4 mr-1" />
                  All Absent
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Mark Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.rollNo}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>
                      <Badge variant={record.present ? "default" : "destructive"}>
                        {record.present ? "Present" : "Absent"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Label htmlFor={`attendance-${record.id}`} className="cursor-pointer">
                          {record.present ? "Present" : "Absent"}
                        </Label>
                        <Checkbox
                          id={`attendance-${record.id}`}
                          checked={record.present}
                          onCheckedChange={() => toggleAttendance(record.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button>Save Attendance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
