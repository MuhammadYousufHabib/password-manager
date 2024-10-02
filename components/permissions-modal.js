'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddPermissionModal = ({ isOpen, onClose, onSubmit, apiOptions, permission, theme }) => {
  const [newPermission, setNewPermission] = useState({
    name: '',
    allowedApi: '' 
  });

  useEffect(() => {
    if (permission) {
      setNewPermission({
        name: permission.name,
        allowedApi: permission.allowed_api,
      });
    } else {
      setNewPermission({ name: '', allowedApi: '' });
    }
  }, [permission]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPermission(prev => ({ ...prev, [name]: value }));
  };

  const handleApiChange = (e) => {
    const selectedApi = e.target.value;
    setNewPermission(prev => ({ ...prev, allowedApi: selectedApi }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const permissionToSubmit = permission ? { ...newPermission, id: permission.id } : newPermission; // Include permission ID if editing
    onSubmit(permissionToSubmit); 
    // Reset form fields to empty after submission
    setNewPermission({ name: '', allowedApi: '' });
    onClose();
  };

  const resetAndClose = () => { // Renamed this function to avoid conflict
    // Reset form fields to empty when closing the modal
    setNewPermission({ name: '', allowedApi: '' });
    onClose();
  };
 
  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}> {/* Use the renamed resetAndClose here */}
      <DialogContent className={`bg-gray-100 text-black  dark:bg-gray-800 dark:text-white `}>
        <DialogHeader>
          <DialogTitle>{permission ? 'Edit Permission' : 'Add New Permission'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Permission Name</Label>
              <Input
                id="name"
                name="name"
                value={newPermission.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-3">
                <Label htmlFor="allowedApi" className="text-right">Allowed API</Label>
                <select
                  id="allowedApi"
                  name="allowedApi"
                  value={newPermission.allowedApi}
                  onChange={handleApiChange}
                  className="col-span-3 mt-1"
                  required
                >
                  <option value="">Select API</option>
                  {apiOptions.map((api) => (
                    <option key={api.id} value={api.name}>{api.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{permission ? 'Update Permission' : 'Add Permission'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPermissionModal;
