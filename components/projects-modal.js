'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProjectsModal = ({ isOpen, onClose, onSubmit }) => {
  const [project, setProject] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!project.name) {
      setError('Project name is required');
      return;
    }
    onSubmit(project);
    setProject({ name: '', description: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Project Name
              </Label>
              <Input
                id="name"
                name="name"
                value={project.name}
                onChange={handleInputChange}
                className="col-span-3" />
            </div>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Project Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={project.description}
                onChange={handleInputChange}
                className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectsModal;
