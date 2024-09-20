'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import ProjectsModal from './projects-modal'; 

export function ProjectsJs({ projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectList, setProjectList] = useState(projects || []); 

  const handleAddProject = (newProject) => {
    setProjectList((prevProjects) => [...prevProjects, newProject]); 
    setIsModalOpen(false); 
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-5">Projects</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectList.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
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
        Add Project
      </Button>
      <ProjectsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddProject} 
      />
    </div>
  );
}
