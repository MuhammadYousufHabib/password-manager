'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select'; 
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CheckPermission from './CheckPermission';

const ProjectsModal = ({ isOpen, onClose, onSubmit, project, users, loadUsers, assignedUsers, setassignedUsers, usersOfProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

useEffect(() => {
  loadUsers(); 

}, [])


  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);

      const assignedUserIds = usersOfProject?.users?.map(user => user.id) || [];
      setassignedUsers(assignedUserIds);
    } else {
      setName('');
      setDescription('');
      setassignedUsers([]);
    }
  }, [project, usersOfProject]);

  const handleAssignUsersChange = (selectedOptions) => {
    const selectedUsers = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setassignedUsers(selectedUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectToSubmit = project 
      ? { id: project.id, name, description, assignedUsers }
      : { name, description, assignedUsers };

    onSubmit(projectToSubmit);
    setName('');
    setDescription('');
    setassignedUsers([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100 text-black bg-card dark:text-white">
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
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <CheckPermission permission={"ASSIGN_PROJECT:CREATE"}>

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
          </CheckPermission>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="ml-2">{project ? 'Update' : 'Add'} Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsModal;
