'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from 'react-select';

const AddUserModal = ({ isOpen, onClose, onSubmit, roleOptions, user,roleids,setroleids }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    roles: []
  });

  useEffect(() => {
    if (user) {
      setNewUser({
        name: user.name,
        username: user.username,
        email: user.email,
        password: '',
        roles: user.roles || []
      });
    } 
    
    else {
      setNewUser({
        name: '',
        username: '',
        email: '',
        password: '',
        roles: []
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (selectedOptions) => {
    const selectedRoles = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setNewUser(prev => ({ ...prev, roles: selectedRoles }));
    setroleids(selectedRoles)

  };
  console.log(roleids,"=>>>>>>>>>>>>>>>>>")

  const handleSubmit = (e) => {
    e.preventDefault();
    const userToSubmit = user ? { ...newUser, id: user.id } : newUser; 
    onSubmit(userToSubmit); 
    onClose();
  };

  const formattedRoleOptions = roleOptions.map(role => ({
    value: role.id,
    label: role.name
  }));

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
                required={!user}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roles" className="text-right">Roles</Label>
              <div className="col-span-3">
                <Select
                  id="roles"
                  name="roles"
                  value={formattedRoleOptions.filter(option => newUser.roles.includes(option.value))}
                  onChange={handleRoleChange}
                  options={formattedRoleOptions}
                  isMulti
                  className="col-span-3"
                />
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
