'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import ProjectsModal from './projects-modal'; 

export function ProjectsJs({ projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectList, setProjectList] = useState(projects); 
  const [editingProject, setEditingProject] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null); 

  const handleAddProject = (newProject) => {
    const newId = Date.now();
    setProjectList((prevProjects) => [
      ...prevProjects,
      { id: newId, ...newProject }
    ]);
    setIsModalOpen(false);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjectList((prevProjects) => 
      prevProjects.map((project) => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    setProjectList((prevProjects) => prevProjects.filter(project => project.id !== id));
  };

  const toggleExpandProject = (id) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-5">Projects</h1>
      <div className="border rounded-lg overflow-hidden relative">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectList.map((project) => (
              <React.Fragment key={project.id}>
                <TableRow>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteProject(project.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => toggleExpandProject(project.id)}>
                      {expandedProjectId === project.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedProjectId === project.id && (
                  <TableRow>
                    <TableCell colSpan={4} className="relative">
                      <div className="absolute left-0 w-full bg-white border border-gray-200 shadow-lg z-10 p-4 rounded overflow-hidden">
                        <h3 className="font-semibold">Project Details:</h3>
                        <ul className="mt-2 space-y-1">
                          {Object.entries(project.details || {"sd" :"as"}).map(([key, value]) => (
                            <li key={key} className="flex justify-between">
                              <span className="font-medium">{key}:</span> <span>{value}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2">
                          <strong>Mode Name:</strong> {project.modeName || "N/A"}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button className="mt-4" onClick={() => { setEditingProject(null); setIsModalOpen(true); }}>
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Project
      </Button>
      <ProjectsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={editingProject ? handleUpdateProject : handleAddProject} 
        project={editingProject} 
      />
    </div>
  );
}
