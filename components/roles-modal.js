'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckPermission from './CheckPermission';

const RolesModal = ({ isOpen, onClose, onSubmit, permissionOptions, role ,setPermissionids,assignedPermissions}) => {
  const [roleData, setRoleData] = useState({
    name: '',
    permissions: []
  });

  useEffect(() => {
    if (role) {
      setRoleData({
        name: role.name,
        permissions: assignedPermissions ? assignedPermissions.map(permission => permission.id) : [],
      });
    } else {
      setRoleData({ name: '', permissions: [] });
    }
  }, [role,assignedPermissions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (selectedOptions) => {
    const selectedPermissions = selectedOptions ? selectedOptions.map(option => option.value) : [];

    setRoleData(prev => ({ ...prev, permissions: selectedPermissions }));
    setPermissionids(selectedPermissions)
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
      <DialogContent className="bg-gray-100 text-black bg-card dark:text-white">
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
            <CheckPermission permission={"ASSIGN_PERMISSION:CREATE"}>

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
                  className="col-span-3 "
                />
              </div>
            </div>
        </CheckPermission>
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
