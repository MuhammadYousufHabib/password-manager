'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RolesModal = ({ isOpen, onClose, onSubmit, permissionOptions, role }) => {
  const [roleData, setRoleData] = useState({
    name: '',
    permissions: []
  });

  useEffect(() => {
    if (role) {
      setRoleData({
        name: role.name,
        permissions: role.permissions || [],
      });
    } else {
      setRoleData({ name: '', permissions: [] });
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (selectedOptions) => {
    const selectedPermissions = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setRoleData(prev => ({ ...prev, permissions: selectedPermissions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roleToSubmit = role ? { ...roleData, id: role.id } : { ...roleData }; 
    onSubmit(roleToSubmit); 
    setRoleData({ name: '', permissions: [] }); 
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100 text-black">
        <DialogHeader>
          <DialogTitle>{role ? 'Edit Role' : 'Add New Role'}</DialogTitle>
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
                value={roleData.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="permissions" className="text-right">
                Assign Permissions
              </Label>
              <div className="col-span-3">
                <Select
                  isMulti
                  options={permissionOptions.map(permission => ({ label: permission.name, value: permission.id }))}
                  value={permissionOptions.filter(permission => roleData.permissions.includes(permission.id)).map(permission => ({ label: permission.name, value: permission.id }))}
                  onChange={handlePermissionChange}
                  className="col-span-3"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{role ? 'Update Role' : 'Add Role'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RolesModal;
