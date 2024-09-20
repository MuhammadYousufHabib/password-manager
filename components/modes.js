'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import ModesModal from './modes-modal'; // Import your ModesModal component

export function ModesJs({ modes: initialModes }) {
  const [modes, setModes] = useState(initialModes || []); // Initialize modes state with props
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMode = (newMode) => {
    setModes((prevModes) => [...prevModes, newMode]); // Add new mode to the state
    setIsModalOpen(false); // Close the modal after adding
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
            {modes.map((mode, index) => (
              <TableRow key={index}>
                <TableCell>{mode.name}</TableCell> {/* Display mode name */}
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
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
      <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Mode
      </Button>
      <ModesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddMode} 
      />
    </div>
  );
}
