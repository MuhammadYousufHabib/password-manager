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

  
  const [errors, setErrors] = useState({});

    // Reset the form fields when the modal opens
    useEffect(() => {
      if (isOpen) {
        resetForm(); // Reset the form when the modal opens
      }
    }, [isOpen]);

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

  const resetForm = () => {
    setNewUser({
      name: '',
      username: '',
      email: '',
      password: '',
      role: ''
    });
    setErrors({}); // Clear errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleRoleChange = (selectedOptions) => {
    const selectedRoles = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setNewUser(prev => ({ ...prev, roles: selectedRoles }));
    setErrors(prev => ({ ...prev, role: '' })); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation logic
    const newErrors = {};
    if (!newUser.name) newErrors.name = 'Name is required';
    if (!newUser.username) newErrors.username = 'Username is required';
    if (!newUser.email) newErrors.email = 'Email is required';
    if (!newUser.password) newErrors.password = 'Password is required';

    // Role is optional, no validation error for role
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set the errors state
      return; // Prevent form submission if there are validation errors
    }

    // Submit the form data
    onSubmit({ ...newUser, id: user?.id }); // Include ID for editing
  };

  const handleClose = () => {
    resetForm(); // Reset the form fields and errors when closing
    onClose(); // Call the original onClose function
  };

  const formattedRoleOptions = roleOptions.map(role => ({
    value: role.id,
    label: role.name
  }));

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
                // required
              />
            </div>
            {errors.name && <span className=" text-red-500 text-sm mt-0">{errors.name}</span>}

            <div className="">
              <Label htmlFor="username" className="text-right">Username</Label>
              <Input
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
                // required
              />
            </div>
            {errors.username && <span className=" text-red-500 text-sm mt-0">{errors.username}</span>}

            <div className="">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
                // required
              />
            </div>
            {errors.email && <span className=" text-red-500 text-sm mt-0">{errors.email}</span>}

            <div className="">
              <Label htmlFor="password" className="text-right">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleInputChange}
                className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
                // required={!user}
              />
            </div>
            {errors.password && <span className=" text-red-500 text-sm mt-0">{errors.password}</span>}

            <div className="">
              <Label htmlFor="roles" className="text-right">Roles</Label>
              <div className="col-span-3">
                <Select
                  id="roles"
                  name="roles"
                  value={formattedRoleOptions.filter(option => (newUser.roles || []).includes(option.value))}
                  options={formattedRoleOptions}
                  isMulti
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
              {errors.role && <span className="text-red-500 text-sm mt-0">{errors.role}</span>}

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
