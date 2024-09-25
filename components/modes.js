'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import ModesModal from './modes-modal'; 
import { createMode, updateMode, deleteMode } from '@/services/api/modes';  

export function ModesJs({ modes: initialModes }) {
  const [modes, setModes] = useState(initialModes || []); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMode, setEditingMode] = useState(null);

  const handleAddMode = async (newMode) => {
    try {
      const createdMode = await createMode(newMode); 
      setModes((prevModes) => [...prevModes, createdMode]);  API
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add mode:', error);
    }
  };

  const handleEditMode = (mode) => {
    setEditingMode(mode);
    setIsModalOpen(true);
  };

  const handleUpdateMode = async (updatedMode) => {
    try {
      const updated = await updateMode(editingMode.id, updatedMode); 
      setModes((prevModes) =>
        prevModes.map((mode) => (mode.id === editingMode.id ? updated : mode))
      );
      setIsModalOpen(false);
      setEditingMode(null);
    } catch (error) {
      console.error('Failed to update mode:', error);
    }
  };

  const handleDeleteMode = async (modeId) => {
    try {
      await deleteMode(modeId);  
      setModes((prevModes) => prevModes.filter((mode) => mode.id !== modeId)); 
    } catch (error) {
      console.error('Failed to delete mode:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-5">Modes</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modes.map((mode) => (
              <TableRow key={mode.id}>
                <TableCell>{mode.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleEditMode(mode)} size="sm" variant="outline">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteMode(mode.id)} size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button className="mt-4" onClick={() => {
        setEditingMode(null); 
        setIsModalOpen(true);
      }}>
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Mode
      </Button>
      <ModesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={editingMode ? handleUpdateMode : handleAddMode} 
        mode={editingMode} 
      />
    </div>
  );
}
