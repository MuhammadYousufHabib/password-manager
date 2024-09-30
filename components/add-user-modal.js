'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from 'react-select';

const AddUserModal = ({ isOpen, onClose, onSubmit, roleOptions, user, theme }) => { // Added 'theme' prop
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
    } else {
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
  };

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
      <DialogContent className={`text-black bg-gray-100 dark:bg-gray-800 dark:text-white`}>
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
                required
              />
            </div>
            <div className="">
              <Label htmlFor="username" className="text-right">Username</Label>
              <Input
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
                required
              />
            </div>
            <div className="">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
                required
              />
            </div>
            <div className="">
              <Label htmlFor="password" className="text-right">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleInputChange}
                className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
                required={!user}
              />
            </div>
            <div className="">
              <Label htmlFor="roles" className="text-right">Roles</Label>
              <div className="col-span-3">
                <Select
                  id="roles"
                  name="roles"
                  value={formattedRoleOptions.filter(option => newUser.roles.includes(option.value))}
                  onChange={handleRoleChange}
                  options={formattedRoleOptions}
                  isMulti
                  className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
                  theme={(selectTheme) => ({
                    ...selectTheme,
                    colors: {
                      ...selectTheme.colors,
                      neutral0: theme === 'dark' ? '#2d3748' : '#fff', // Background color
                      neutral80: theme === 'dark' ? '#fff' : '#1a202c', // Text color
                      primary25: theme === 'dark' ? '#4a5568' : '#edf2f7', // Option hover color
                      primary: theme === 'dark' ? '#38b2ac' : '#3182ce', // Option selected color
                    },
                  })}
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
