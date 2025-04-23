
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Mail, Trash2, User } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
}

const TeamManagementSettings = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Alex Smith',
      email: 'alex.smith@example.com',
      role: 'Admin',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'Provider',
      status: 'active'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      role: 'Office Staff',
      status: 'pending'
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState<Omit<TeamMember, 'id' | 'status'>>({
    name: '',
    email: '',
    role: 'Provider'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTeamMember(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setNewTeamMember(prev => ({ ...prev, role: value }));
  };

  const handleAddTeamMember = () => {
    const id = Date.now().toString();
    setTeamMembers(prev => [...prev, { ...newTeamMember, id, status: 'pending' }]);
    setNewTeamMember({
      name: '',
      email: '',
      role: 'Provider'
    });
    setIsDialogOpen(false);
    toast.success("Invitation sent successfully");
  };

  const handleResendInvite = (email: string) => {
    toast.success(`Invitation resent to ${email}`);
  };

  const handleRemoveTeamMember = (id: string, name: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    toast.success(`${name} has been removed from the team`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Team Management</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={newTeamMember.name}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={newTeamMember.email}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={newTeamMember.role} 
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Provider">Provider</SelectItem>
                      <SelectItem value="Office Staff">Office Staff</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleAddTeamMember} className="mt-6 w-full">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail size={12} className="mr-1" />
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{member.role}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      member.status === 'active' ? 'bg-green-100 text-green-700' : 
                      member.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {member.status === 'active' ? 'Active' : 
                       member.status === 'pending' ? 'Pending' : 'Inactive'}
                    </span>
                  </div>
                  {member.status === 'pending' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleResendInvite(member.email)}
                    >
                      Resend
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveTeamMember(member.id, member.name)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagementSettings;
