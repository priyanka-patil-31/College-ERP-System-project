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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Search, Plus, BookOpen, Users, BookMarked, Calendar } from "lucide-react";

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  status: "available" | "limited" | "unavailable";
}

interface IssuedBook {
  id: string;
  bookTitle: string;
  isbn: string;
  studentName: string;
  rollNo: string;
  issueDate: string;
  dueDate: string;
  status: "active" | "overdue";
}

const initialBooks: Book[] = [
  {
    id: "1",
    isbn: "978-0-13-468599-1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    totalCopies: 15,
    availableCopies: 8,
    status: "available",
  },
  {
    id: "2",
    isbn: "978-0-07-338051-4",
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Computer Science",
    totalCopies: 10,
    availableCopies: 2,
    status: "limited",
  },
  {
    id: "3",
    isbn: "978-0-13-216378-4",
    title: "Engineering Mechanics",
    author: "R.C. Hibbeler",
    category: "Mechanical",
    totalCopies: 20,
    availableCopies: 15,
    status: "available",
  },
  {
    id: "4",
    isbn: "978-0-19-856841-2",
    title: "Electrical Engineering Fundamentals",
    author: "Vincent Del Toro",
    category: "Electrical",
    totalCopies: 12,
    availableCopies: 0,
    status: "unavailable",
  },
  {
    id: "5",
    isbn: "978-0-07-352955-1",
    title: "Surveying and Levelling",
    author: "N.N. Basak",
    category: "Civil",
    totalCopies: 18,
    availableCopies: 10,
    status: "available",
  },
];

const initialIssuedBooks: IssuedBook[] = [
  {
    id: "1",
    bookTitle: "Introduction to Algorithms",
    isbn: "978-0-13-468599-1",
    studentName: "John Doe",
    rollNo: "CS2024001",
    issueDate: "2026-06-01",
    dueDate: "2026-06-15",
    status: "active",
  },
  {
    id: "2",
    bookTitle: "Database System Concepts",
    isbn: "978-0-07-338051-4",
    studentName: "Jane Smith",
    rollNo: "ME2024002",
    issueDate: "2026-05-20",
    dueDate: "2026-06-03",
    status: "overdue",
  },
  {
    id: "3",
    bookTitle: "Engineering Mechanics",
    isbn: "978-0-13-216378-4",
    studentName: "Michael Johnson",
    rollNo: "EE2024003",
    issueDate: "2026-06-10",
    dueDate: "2026-06-24",
    status: "active",
  },
];

export function LibraryManagement() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>(initialIssuedBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  const [isIssueBookDialogOpen, setIsIssueBookDialogOpen] = useState(false);
  const [newBook, setNewBook] = useState<Partial<Book>>({});
  const [issueBookData, setIssueBookData] = useState<Partial<IssuedBook>>({});

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
  );

  const totalBooks = books.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableBooks = books.reduce((sum, book) => sum + book.availableCopies, 0);
  const issuedBooksCount = issuedBooks.length;
  const overdueCount = issuedBooks.filter((b) => b.status === "overdue").length;

  const handleAddBook = () => {
    if (newBook.isbn && newBook.title && newBook.author && newBook.totalCopies) {
      const book: Book = {
        id: Date.now().toString(),
        isbn: newBook.isbn,
        title: newBook.title,
        author: newBook.author,
        category: newBook.category || "General",
        totalCopies: newBook.totalCopies,
        availableCopies: newBook.totalCopies,
        status: "available",
      };
      setBooks([...books, book]);
      setNewBook({});
      setIsAddBookDialogOpen(false);
    }
  };

  const handleIssueBook = () => {
    if (
      issueBookData.bookTitle &&
      issueBookData.isbn &&
      issueBookData.studentName &&
      issueBookData.rollNo
    ) {
      const issueDate = new Date().toISOString().split('T')[0];
      const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const issued: IssuedBook = {
        id: Date.now().toString(),
        bookTitle: issueBookData.bookTitle,
        isbn: issueBookData.isbn,
        studentName: issueBookData.studentName,
        rollNo: issueBookData.rollNo,
        issueDate,
        dueDate,
        status: "active",
      };

      // Update book availability
      setBooks(
        books.map((book) =>
          book.isbn === issueBookData.isbn
            ? {
                ...book,
                availableCopies: book.availableCopies - 1,
                status:
                  book.availableCopies - 1 === 0
                    ? "unavailable"
                    : book.availableCopies - 1 <= 3
                    ? "limited"
                    : "available",
              }
            : book
        )
      );

      setIssuedBooks([...issuedBooks, issued]);
      setIssueBookData({});
      setIsIssueBookDialogOpen(false);
    }
  };

  const handleReturnBook = (issuedBookId: string) => {
    const issuedBook = issuedBooks.find((b) => b.id === issuedBookId);
    if (issuedBook) {
      // Update book availability
      setBooks(
        books.map((book) =>
          book.isbn === issuedBook.isbn
            ? {
                ...book,
                availableCopies: book.availableCopies + 1,
                status:
                  book.availableCopies + 1 === book.totalCopies
                    ? "available"
                    : book.availableCopies + 1 > 3
                    ? "available"
                    : "limited",
              }
            : book
        )
      );

      // Remove from issued books
      setIssuedBooks(issuedBooks.filter((b) => b.id !== issuedBookId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library Management</h1>
          <p className="text-muted-foreground">Manage books, issues, and returns</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddBookDialogOpen} onOpenChange={setIsAddBookDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>Enter book details to add to library.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={newBook.isbn || ""}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                    placeholder="978-0-00-000000-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bookTitle">Title</Label>
                  <Input
                    id="bookTitle"
                    value={newBook.title || ""}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    placeholder="Enter book title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={newBook.author || ""}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    placeholder="Enter author name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newBook.category || ""}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="copies">Total Copies</Label>
                  <Input
                    id="copies"
                    type="number"
                    value={newBook.totalCopies || ""}
                    onChange={(e) =>
                      setNewBook({ ...newBook, totalCopies: parseInt(e.target.value) })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddBookDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBook}>Add Book</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isIssueBookDialogOpen} onOpenChange={setIsIssueBookDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <BookMarked className="w-4 h-4 mr-2" />
                Issue Book
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Issue Book</DialogTitle>
                <DialogDescription>Issue a book to a student.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="issueIsbn">ISBN</Label>
                  <Input
                    id="issueIsbn"
                    value={issueBookData.isbn || ""}
                    onChange={(e) => setIssueBookData({ ...issueBookData, isbn: e.target.value })}
                    placeholder="978-0-00-000000-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issueBookTitle">Book Title</Label>
                  <Input
                    id="issueBookTitle"
                    value={issueBookData.bookTitle || ""}
                    onChange={(e) =>
                      setIssueBookData({ ...issueBookData, bookTitle: e.target.value })
                    }
                    placeholder="Enter book title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentRollNo">Student Roll No</Label>
                  <Input
                    id="studentRollNo"
                    value={issueBookData.rollNo || ""}
                    onChange={(e) => setIssueBookData({ ...issueBookData, rollNo: e.target.value })}
                    placeholder="e.g., CS2024001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentNameIssue">Student Name</Label>
                  <Input
                    id="studentNameIssue"
                    value={issueBookData.studentName || ""}
                    onChange={(e) =>
                      setIssueBookData({ ...issueBookData, studentName: e.target.value })
                    }
                    placeholder="Enter student name"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsIssueBookDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleIssueBook}>Issue Book</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Books
            </CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available
            </CardTitle>
            <BookOpen className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Issued Books
            </CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{issuedBooksCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overdue
            </CardTitle>
            <Calendar className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="books" className="space-y-4">
        <TabsList>
          <TabsTrigger value="books">Books Inventory</TabsTrigger>
          <TabsTrigger value="issued">Issued Books</TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <Card>
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, author, or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ISBN</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Total Copies</TableHead>
                      <TableHead className="text-right">Available</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooks.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell className="font-medium">{book.isbn}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell className="text-right">{book.totalCopies}</TableCell>
                        <TableCell className="text-right">{book.availableCopies}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              book.status === "available"
                                ? "default"
                                : book.status === "limited"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {book.status}
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

        <TabsContent value="issued">
          <Card>
            <CardHeader>
              <CardTitle>Issued Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Title</TableHead>
                      <TableHead>ISBN</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issuedBooks.map((issued) => (
                      <TableRow key={issued.id}>
                        <TableCell>{issued.bookTitle}</TableCell>
                        <TableCell className="font-medium">{issued.isbn}</TableCell>
                        <TableCell>{issued.studentName}</TableCell>
                        <TableCell>{issued.rollNo}</TableCell>
                        <TableCell>{issued.issueDate}</TableCell>
                        <TableCell>{issued.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant={issued.status === "active" ? "default" : "destructive"}>
                            {issued.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => handleReturnBook(issued.id)}>
                            Return
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
