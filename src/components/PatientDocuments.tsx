
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Filter, ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PatientDocumentsProps {
  patient: {
    name: string;
  };
}

const documents = [
  {
    id: 1,
    name: "Medical Records Release.pdf",
    type: "PDF",
    date: "Apr 20, 2025",
    size: "1.2 MB",
    category: "Consent Forms"
  },
  {
    id: 2,
    name: "Lab Results - March 2025.pdf",
    type: "PDF",
    date: "Mar 27, 2025",
    size: "3.5 MB",
    category: "Lab Results"
  },
  {
    id: 3,
    name: "Treatment Plan - Q2 2025.docx",
    type: "DOCX",
    date: "Mar 15, 2025",
    size: "645 KB",
    category: "Treatment Plans"
  },
  {
    id: 4,
    name: "Insurance Card - Front.jpg",
    type: "JPG",
    date: "Feb 10, 2025",
    size: "856 KB",
    category: "Insurance"
  },
  {
    id: 5,
    name: "Insurance Card - Back.jpg",
    type: "JPG",
    date: "Feb 10, 2025",
    size: "712 KB",
    category: "Insurance"
  },
  {
    id: 6,
    name: "Medication History.pdf",
    type: "PDF",
    date: "Jan 22, 2025",
    size: "2.1 MB",
    category: "Medications"
  }
];

const PatientDocuments: React.FC<PatientDocumentsProps> = ({ patient }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredDocuments = documents
    .filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" 
        ? dateA.getTime() - dateB.getTime() 
        : dateB.getTime() - dateA.getTime();
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Patient Documents</h3>
        <div className="flex gap-2">
          <Button>Upload Document</Button>
        </div>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="relative w-64">
          <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            className="pl-8 h-9"
            placeholder="Filter documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleSortOrder}
          className="gap-1"
        >
          {sortOrder === "asc" ? (
            <>
              <ArrowUpAZ size={16} />
              <span>Oldest</span>
            </>
          ) : (
            <>
              <ArrowDownAZ size={16} />
              <span>Newest</span>
            </>
          )}
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDocuments.map(doc => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.category}</TableCell>
              <TableCell>{doc.date}</TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientDocuments;
