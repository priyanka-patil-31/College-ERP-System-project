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
import { Badge } from "../components/ui/badge";
import { Search, DollarSign, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";

interface FeeRecord {
  id: string;
  rollNo: string;
  name: string;
  department: string;
  totalFees: number;
  paidAmount: number;
  pendingAmount: number;
  lastPaymentDate: string;
  status: "paid" | "partial" | "pending";
}

const initialFeeRecords: FeeRecord[] = [
  {
    id: "1",
    rollNo: "CS2024001",
    name: "John Doe",
    department: "Computer Science",
    totalFees: 50000,
    paidAmount: 50000,
    pendingAmount: 0,
    lastPaymentDate: "2026-06-01",
    status: "paid",
  },
  {
    id: "2",
    rollNo: "ME2024002",
    name: "Jane Smith",
    department: "Mechanical",
    totalFees: 48000,
    paidAmount: 30000,
    pendingAmount: 18000,
    lastPaymentDate: "2026-05-15",
    status: "partial",
  },
  {
    id: "3",
    rollNo: "EE2024003",
    name: "Michael Johnson",
    department: "Electrical",
    totalFees: 52000,
    paidAmount: 0,
    pendingAmount: 52000,
    lastPaymentDate: "-",
    status: "pending",
  },
  {
    id: "4",
    rollNo: "CV2024004",
    name: "Emily Brown",
    department: "Civil",
    totalFees: 46000,
    paidAmount: 46000,
    pendingAmount: 0,
    lastPaymentDate: "2026-06-10",
    status: "paid",
  },
  {
    id: "5",
    rollNo: "CS2024005",
    name: "Robert Wilson",
    department: "Computer Science",
    totalFees: 50000,
    paidAmount: 25000,
    pendingAmount: 25000,
    lastPaymentDate: "2026-04-20",
    status: "partial",
  },
];

export function FeeManagement() {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>(initialFeeRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const filteredRecords = feeRecords.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFees = feeRecords.reduce((sum, record) => sum + record.totalFees, 0);
  const totalCollected = feeRecords.reduce((sum, record) => sum + record.paidAmount, 0);
  const totalPending = feeRecords.reduce((sum, record) => sum + record.pendingAmount, 0);

  const handlePayment = () => {
    if (selectedRecord && paymentAmount) {
      const amount = parseFloat(paymentAmount);
      if (amount > 0 && amount <= selectedRecord.pendingAmount) {
        const updatedPaidAmount = selectedRecord.paidAmount + amount;
        const updatedPendingAmount = selectedRecord.pendingAmount - amount;
        const updatedStatus =
          updatedPendingAmount === 0 ? "paid" : "partial";

        setFeeRecords(
          feeRecords.map((record) =>
            record.id === selectedRecord.id
              ? {
                  ...record,
                  paidAmount: updatedPaidAmount,
                  pendingAmount: updatedPendingAmount,
                  lastPaymentDate: new Date().toISOString().split('T')[0],
                  status: updatedStatus,
                }
              : record
          )
        );

        setPaymentAmount("");
        setSelectedRecord(null);
        setIsPaymentDialogOpen(false);
      }
    }
  };

  const openPaymentDialog = (record: FeeRecord) => {
    setSelectedRecord(record);
    setPaymentAmount(record.pendingAmount.toString());
    setIsPaymentDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fee Management</h1>
        <p className="text-muted-foreground">Track and manage student fee payments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Fees
            </CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalFees.toLocaleString('en-IN')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Collected
            </CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{totalCollected.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ₹{totalPending.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
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
                  <TableHead className="text-right">Total Fees</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.rollNo}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell className="text-right">
                      ₹{record.totalFees.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      ₹{record.paidAmount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      ₹{record.pendingAmount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{record.lastPaymentDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "paid"
                            ? "default"
                            : record.status === "partial"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {record.status !== "paid" && (
                        <Button
                          size="sm"
                          onClick={() => openPaymentDialog(record)}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Enter payment details for {selectedRecord?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Fees</p>
                  <p className="font-medium">₹{selectedRecord.totalFees.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Already Paid</p>
                  <p className="font-medium text-green-600">
                    ₹{selectedRecord.paidAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Pending Amount</p>
                  <p className="text-xl font-bold text-red-600">
                    ₹{selectedRecord.pendingAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Amount</Label>
                <Input
                  id="payment"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                  max={selectedRecord.pendingAmount}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayment}>Record Payment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
