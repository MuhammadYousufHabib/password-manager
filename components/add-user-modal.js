// AddUserModal.js
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddUserModal = ({ isOpen, onClose, onSubmit, roleOptions, user }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: '' 
  });

  useEffect(() => { // for persisting data for edit
    if (user) {
      setNewUser({
        name: user.name,
        username: user.username,
        email: user.email,
        password: '', // Reset password field for security
        role: user.role || ''
      });
    } else {
      setNewUser({
        name: '',
        username: '',
        email: '',
        password: '',
        role: ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setNewUser(prev => ({ ...prev, role: selectedRole }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the user ID if editing, otherwise pass the new user without an ID
    const userToSubmit = user ? { ...newUser, id: user.id } : newUser; 
    onSubmit(userToSubmit); 
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100 text-black">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">Username</Label>
              <Input
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="col-span-3"
                required={!user} // Make required only if adding a new user
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <div className="col-span-3">
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleRoleChange}
                  className="col-span-3 border rounded-md"
                >
                  <option value="">Select a role (optional)</option>
                  {roleOptions.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{user ? 'Update User' : 'Add User'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
