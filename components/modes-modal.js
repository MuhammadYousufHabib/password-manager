'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ModesModal = ({ isOpen, onClose, onSubmit, mode }) => {
  const [modeName, setModeName] = useState('');

  useEffect(() => {
    if (mode) {
      setModeName(mode.name);
    } else {
      setModeName('');
    }
  }, [mode]);

  const handleInputChange = (e) => {
    setModeName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: modeName }); // Pass the new or updated mode
    setModeName('');
    onClose(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100">
        <DialogHeader>
          <DialogTitle>{mode ? 'Edit Mode' : 'Add New Mode'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modeName" className="text-right">Mode Name</Label>
              <Input
                id="modeName"
                name="modeName"
                value={modeName}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{mode ? 'Update Mode' : 'Add Mode'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModesModal;
