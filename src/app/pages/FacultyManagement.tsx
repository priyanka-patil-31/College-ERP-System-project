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
import { Badge } from "../components/ui/badge";
import { Search, Plus, Edit, Trash2, Mail, Phone, Award } from "lucide-react";

interface Faculty {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  experience: string;
  qualification: string;
  status: "active" | "on-leave";
}

const initialFaculty: Faculty[] = [
  {
    id: "1",
    employeeId: "FAC001",
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    designation: "Professor",
    email: "sarah.johnson@college.edu",
    phone: "+1 234-567-8901",
    experience: "15 years",
    qualification: "PhD in Computer Science",
    status: "active",
  },
  {
    id: "2",
    employeeId: "FAC002",
    name: "Prof. Michael Chen",
    department: "Mechanical",
    designation: "Associate Professor",
    email: "michael.chen@college.edu",
    phone: "+1 234-567-8902",
    experience: "12 years",
    qualification: "PhD in Mechanical Engineering",
    status: "active",
  },
  {
    id: "3",
    employeeId: "FAC003",
    name: "Dr. Emily Davis",
    department: "Electrical",
    designation: "Assistant Professor",
    email: "emily.davis@college.edu",
    phone: "+1 234-567-8903",
    experience: "8 years",
    qualification: "PhD in Electrical Engineering",
    status: "active",
  },
  {
    id: "4",
    employeeId: "FAC004",
    name: "Prof. James Wilson",
    department: "Civil",
    designation: "Professor",
    email: "james.wilson@college.edu",
    phone: "+1 234-567-8904",
    experience: "18 years",
    qualification: "PhD in Civil Engineering",
    status: "on-leave",
  },
  {
    id: "5",
    employeeId: "FAC005",
    name: "Dr. Lisa Martinez",
    department: "Computer Science",
    designation: "Assistant Professor",
    email: "lisa.martinez@college.edu",
    phone: "+1 234-567-8905",
    experience: "6 years",
    qualification: "PhD in Computer Science",
    status: "active",
  },
];

export function FacultyManagement() {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState<Partial<Faculty>>({ status: "active" });

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || f.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(faculty.map((f) => f.department)));

  const handleAddFaculty = () => {
    if (
      newFaculty.employeeId &&
      newFaculty.name &&
      newFaculty.department &&
      newFaculty.designation
    ) {
      const member: Faculty = {
        id: Date.now().toString(),
        employeeId: newFaculty.employeeId,
        name: newFaculty.name,
        department: newFaculty.department,
        designation: newFaculty.designation,
        email: newFaculty.email || "",
        phone: newFaculty.phone || "",
        experience: newFaculty.experience || "",
        qualification: newFaculty.qualification || "",
        status: newFaculty.status as "active" | "on-leave" || "active",
      };
      setFaculty([...faculty, member]);
      setNewFaculty({ status: "active" });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteFaculty = (id: string) => {
    setFaculty(faculty.filter((f) => f.id !== id));
  };

  const activeFacultyCount = faculty.filter((f) => f.status === "active").length;
  const professorCount = faculty.filter((f) => f.designation === "Professor").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Faculty Management</h1>
          <p className="text-muted-foreground">Manage faculty members and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Faculty Member</DialogTitle>
              <DialogDescription>Enter faculty member details.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={newFaculty.employeeId || ""}
                  onChange={(e) => setNewFaculty({ ...newFaculty, employeeId: e.target.value })}
                  placeholder="e.g., FAC006"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facultyName">Full Name</Label>
                <Input
                  id="facultyName"
                  value={newFaculty.name || ""}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facultyDept">Department</Label>
                <Select
                  value={newFaculty.department}
                  onValueChange={(value) => setNewFaculty({ ...newFaculty, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
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
                <Label htmlFor="designation">Designation</Label>
                <Select
                  value={newFaculty.designation}
                  onValueChange={(value) => setNewFaculty({ ...newFaculty, designation: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professor">Professor</SelectItem>
                    <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                    <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                    <SelectItem value="Lecturer">Lecturer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="facultyEmail">Email</Label>
                <Input
                  id="facultyEmail"
                  type="email"
                  value={newFaculty.email || ""}
                  onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                  placeholder="email@college.edu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facultyPhone">Phone</Label>
                <Input
                  id="facultyPhone"
                  value={newFaculty.phone || ""}
                  onChange={(e) => setNewFaculty({ ...newFaculty, phone: e.target.value })}
                  placeholder="+1 234-567-8900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={newFaculty.experience || ""}
                  onChange={(e) => setNewFaculty({ ...newFaculty, experience: e.target.value })}
                  placeholder="e.g., 10 years"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={newFaculty.qualification || ""}
                  onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })}
                  placeholder="e.g., PhD in Computer Science"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFaculty}>Add Faculty</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Faculty
            </CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faculty.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Faculty
            </CardTitle>
            <Award className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeFacultyCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Professors
            </CardTitle>
            <Award className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{professorCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, employee ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
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
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.employeeId}</TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{member.designation}</TableCell>
                    <TableCell>{member.qualification}</TableCell>
                    <TableCell>{member.experience}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          <span>{member.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFaculty(member.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
