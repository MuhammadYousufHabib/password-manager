'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RolesModal = ({ isOpen, onClose, onSubmit, permissionOptions }) => {
  const [role, setRole] = useState({
    name: '',
    permissions: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRole(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (e) => {
    const selectedPermission = e.target.value;
    setRole(prev => ({ ...prev, permissions: selectedPermission }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role.name.trim() !== '') {
      onSubmit(role);
      setRole({ name: '', permissions: '' });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100 text-black">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Role Name
              </Label>
              <Input
                id="name"
                name="name"
                value={role.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="permissions" className="text-right">
                Assign Permissions
              </Label>
              <div className="col-span-3">
                <select
                  id="permissions"
                  name="permissions"
                  value={role.permissions}
                  onChange={handlePermissionChange}
                  className="col-span-3 border rounded-md"
                  required
                >
                  <option value="">Select a permission</option>
                  {permissionOptions.map((permission) => (
                    <option key={permission.id} value={permission.id}>
                      {permission.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Role</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RolesModal;
