import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Search, Plus, Award, TrendingUp, Users } from "lucide-react";

interface ExamResult {
  id: string;
  rollNo: string;
  name: string;
  subject: string;
  marks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
}

const initialResults: ExamResult[] = [
  {
    id: "1",
    rollNo: "CS2024001",
    name: "John Doe",
    subject: "Data Structures",
    marks: 85,
    totalMarks: 100,
    percentage: 85,
    grade: "A",
  },
  {
    id: "2",
    rollNo: "CS2024001",
    name: "John Doe",
    subject: "Algorithms",
    marks: 92,
    totalMarks: 100,
    percentage: 92,
    grade: "A+",
  },
  {
    id: "3",
    rollNo: "ME2024002",
    name: "Jane Smith",
    subject: "Data Structures",
    marks: 78,
    totalMarks: 100,
    percentage: 78,
    grade: "B+",
  },
  {
    id: "4",
    rollNo: "EE2024003",
    name: "Michael Johnson",
    subject: "Data Structures",
    marks: 65,
    totalMarks: 100,
    percentage: 65,
    grade: "C",
  },
  {
    id: "5",
    rollNo: "CV2024004",
    name: "Emily Brown",
    subject: "Data Structures",
    marks: 88,
    totalMarks: 100,
    percentage: 88,
    grade: "A",
  },
];

const getGrade = (percentage: number): string => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  return "F";
};

export function ExaminationResults() {
  const [results, setResults] = useState<ExamResult[]>(initialResults);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newResult, setNewResult] = useState<Partial<ExamResult>>({});

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || result.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = Array.from(new Set(results.map((r) => r.subject)));
  const averagePercentage =
    results.reduce((sum, r) => sum + r.percentage, 0) / results.length || 0;
  const passRate =
    (results.filter((r) => r.percentage >= 50).length / results.length) * 100 || 0;
  const toppers = [...results].sort((a, b) => b.percentage - a.percentage).slice(0, 3);

  const handleAddResult = () => {
    if (
      newResult.rollNo &&
      newResult.name &&
      newResult.subject &&
      newResult.marks !== undefined &&
      newResult.totalMarks
    ) {
      const percentage = (newResult.marks / newResult.totalMarks) * 100;
      const grade = getGrade(percentage);

      const result: ExamResult = {
        id: Date.now().toString(),
        rollNo: newResult.rollNo,
        name: newResult.name,
        subject: newResult.subject,
        marks: newResult.marks,
        totalMarks: newResult.totalMarks,
        percentage,
        grade,
      };
      setResults([...results, result]);
      setNewResult({});
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Examination Results</h1>
          <p className="text-muted-foreground">View and manage student examination results</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Result
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Examination Result</DialogTitle>
              <DialogDescription>Enter student examination details.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll Number</Label>
                <Input
                  id="rollNo"
                  value={newResult.rollNo || ""}
                  onChange={(e) => setNewResult({ ...newResult, rollNo: e.target.value })}
                  placeholder="e.g., CS2024001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={newResult.name || ""}
                  onChange={(e) => setNewResult({ ...newResult, name: e.target.value })}
                  placeholder="Enter student name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newResult.subject || ""}
                  onChange={(e) => setNewResult({ ...newResult, subject: e.target.value })}
                  placeholder="e.g., Data Structures"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marks">Marks Obtained</Label>
                  <Input
                    id="marks"
                    type="number"
                    value={newResult.marks || ""}
                    onChange={(e) =>
                      setNewResult({ ...newResult, marks: parseFloat(e.target.value) })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    value={newResult.totalMarks || ""}
                    onChange={(e) =>
                      setNewResult({ ...newResult, totalMarks: parseFloat(e.target.value) })
                    }
                    placeholder="100"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddResult}>Add Result</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averagePercentage.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pass Rate
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{passRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Results
            </CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="results" className="space-y-4">
        <TabsList>
          <TabsTrigger value="results">All Results</TabsTrigger>
          <TabsTrigger value="toppers">Top Performers</TabsTrigger>
        </TabsList>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="sm:w-[200px]">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="text-right">Marks</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.rollNo}</TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>{result.subject}</TableCell>
                        <TableCell className="text-right">
                          {result.marks} / {result.totalMarks}
                        </TableCell>
                        <TableCell className="text-right">{result.percentage.toFixed(1)}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              result.grade === "A+" || result.grade === "A"
                                ? "default"
                                : result.grade === "B+" || result.grade === "B"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {result.grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="toppers">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {toppers.map((topper, index) => (
                <div
                  key={topper.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                      <span className="text-lg font-bold text-yellow-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{topper.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {topper.rollNo} • {topper.subject}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{topper.percentage.toFixed(1)}%</p>
                    <Badge>{topper.grade}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
