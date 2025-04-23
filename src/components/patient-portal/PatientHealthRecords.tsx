
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, FileLock2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HealthRecord {
  id: number;
  title: string;
  date: string;
  provider: string;
  type: string;
  status: "available" | "restricted";
}

const PatientHealthRecords: React.FC = () => {
  // Mock data - in a real app, this would come from your backend
  const [records] = useState<HealthRecord[]>([
    {
      id: 1,
      title: "Annual Physical Examination",
      date: "Apr 6, 2025",
      provider: "Dr. Katherine Thompson",
      type: "Examination",
      status: "available"
    },
    {
      id: 2,
      title: "Blood Test Results",
      date: "Apr 6, 2025",
      provider: "Lab Services",
      type: "Laboratory",
      status: "available"
    },
    {
      id: 3,
      title: "Mental Health Evaluation",
      date: "Mar 15, 2025",
      provider: "Dr. Katherine Thompson",
      type: "Evaluation",
      status: "available"
    },
    {
      id: 4,
      title: "Specialist Referral Notes",
      date: "Jan 22, 2025",
      provider: "Dr. Sarah Williams",
      type: "Referral",
      status: "restricted"
    }
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Health Records</h1>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="visits">Visit Notes</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Health Records</CardTitle>
              <CardDescription>
                Your health documents shared by your healthcare providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {records.map(record => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {record.status === "available" ? (
                            <FileText className="h-5 w-5 text-blue-600" />
                          ) : (
                            <FileLock2 className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{record.title}</h3>
                          <p className="text-sm text-gray-600">{record.date} • {record.provider}</p>
                          <div className="mt-1 flex items-center space-x-2">
                            <Badge variant="outline">{record.type}</Badge>
                            {record.status === "restricted" && (
                              <Badge variant="secondary">Access Restricted</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {record.status === "available" ? (
                        <Button size="sm" variant="outline" className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="text-gray-400" disabled>
                          <FileLock2 className="h-4 w-4 mr-1" />
                          Restricted
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="labs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {records
                  .filter(record => record.type === "Laboratory")
                  .map(record => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{record.title}</h3>
                            <p className="text-sm text-gray-600">{record.date} • {record.provider}</p>
                          </div>
                        </div>
                        
                        <Button size="sm" variant="outline" className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                
                {records.filter(record => record.type === "Laboratory").length === 0 && (
                  <p className="text-gray-500 text-center py-4">No laboratory records found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="visits" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Visit Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {records
                  .filter(record => record.type === "Examination" || record.type === "Evaluation")
                  .map(record => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">
                            {record.status === "available" ? (
                              <FileText className="h-5 w-5 text-blue-600" />
                            ) : (
                              <FileLock2 className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{record.title}</h3>
                            <p className="text-sm text-gray-600">{record.date} • {record.provider}</p>
                          </div>
                        </div>
                        
                        {record.status === "available" ? (
                          <Button size="sm" variant="outline" className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="text-gray-400" disabled>
                            <FileLock2 className="h-4 w-4 mr-1" />
                            Restricted
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                
                {records.filter(record => record.type === "Examination" || record.type === "Evaluation").length === 0 && (
                  <p className="text-gray-500 text-center py-4">No visit records found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-4">No medication records found</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientHealthRecords;
