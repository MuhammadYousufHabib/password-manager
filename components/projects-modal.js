'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select'; 
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


const ProjectsModal = ({ isOpen, onClose, onSubmit, project,users,loadUsers,assignedUsers,setassignedUsers }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    loadUsers(); 
  }, []);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setassignedUsers(project.assignedUsers || []);
    } else {

      setName('');
      setDescription('');
      setassignedUsers([]);
    }
  }, [project, isOpen]); // Reset fields when project changes or modal opens/closes

  const handleAssignUsersChange = (selectedOptions) => {
    const selectedUsers = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setassignedUsers(selectedUsers);
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    const projectToSubmit = project 
      ? { id: project.id, name, description }
      : { name, description };

    onSubmit(projectToSubmit);

    setName('');
    setDescription('');
    setassignedUsers([])
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`bg-gray-100 dark:bg-gray-800 dark:text-white`}>
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Project Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}

            />
          </div>

          <div className="mb-4">
            <Label htmlFor="assignedUsers">Assign To</Label>
            <Select
              isMulti 
              options={users.map(user => ({ label: user.name, value: user.id }))}
              value={users.filter(user => assignedUsers.includes(user.id)).map(user => ({ label: user.name, value: user.id }))}
              onChange={handleAssignUsersChange}
              className="col-span-3"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              onClose();
              setName(''); // Reset fields on close
              setDescription(''); // Reset fields on close
            }}>Cancel</Button>
            <Button type="submit" className="ml-2">{project ? 'Update' : 'Add'} Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsModal;
