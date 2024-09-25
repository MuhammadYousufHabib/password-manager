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

  const [errors, setErrors] = useState({}); // Errors state

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
        password: '', // Keep password empty for security
        role: user.role || ''
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
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear the error for the field being edited
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setNewUser(prev => ({ ...prev, role: selectedRole }));
    setErrors(prev => ({ ...prev, role: '' })); // Clear role error
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-100 text-black">
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
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
                // required
              />
            </div>
              {errors.name && <span className="ml-16 text-red-500 text-sm mt-1">{errors.name}</span>}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">Username</Label>
              <Input
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className="col-span-3"
                // required
              />
            </div>
              {errors.username && <span className="ml-16 text-red-500 text-sm mt-1">{errors.username}</span>}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="col-span-3"
                // required
              />
            </div>
              {errors.email && <span className="ml-16 text-red-500 text-sm mt-1">{errors.email}</span>}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="col-span-3"
                // required
              />
            </div>
              {errors.password && <span className="ml-16 text-red-500 text-sm mt-1">{errors.password}</span>}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role (Optional)</Label>
              <div className="col-span-3">
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleRoleChange}
                  className="col-span-3 border rounded-md"
                >
                  <option value="">No role selected</option>
                  {roleOptions.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
                {errors.role && <span className="text-red-500 text-sm mt-1">{errors.role}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{user ? "Update User" : "Add User"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUserModal;
