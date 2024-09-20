'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddPermissionModal = ({ isOpen, onClose, onSubmit, apiOptions }) => {
  const [newPermission, setNewPermission] = useState({
    name: '',
    allowedApi: ''
  });

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
    onSubmit(newPermission);
    setNewPermission({ name: '', allowedApi: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100 text-black">
        <DialogHeader>
          <DialogTitle>Add New Permission</DialogTitle>
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
              {/* <Label htmlFor="allowedApi" className="text-right">Allowed API</Label> */}
              <div className="col-span-3">
                {/* <select
                  id="allowedApi"
                  name="allowedApi"
                  value={newPermission.allowedApi}
                  onChange={handleApiChange}
                  className="border rounded-md"
                  required
                >
                  <option value="">Select an API</option>
                  {apiOptions.map((api, index) => (
                    <option key={index} value={api}>
                      {api}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Permission</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPermissionModal;
