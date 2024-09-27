'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import ProjectsModal from './projects-modal'; 
import { ProjectDetails } from './project_details';

export function ProjectsJs({ projects }) {
  const [isEditing, setIsEditing] = useState(null); // Track which index is being edited
  const [newKey, setNewKey] = useState(''); // State for new key input
  const [newValue, setNewValue] = useState(''); 
  const [newMode, setNewMode] = useState(null); // New mode state added
  const [projectDetails, setProjectDetails] = useState([]);
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
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow className="">
              <TableHead className="p-4 text-left">Name</TableHead>
              <TableHead className="p-4 text-left">Description</TableHead>
              <TableHead className="p-4 text-left">Actions</TableHead>
              <TableHead className="p-4 text-left">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectList.map((project) => (
              <React.Fragment key={project.id}>
                <TableRow className="border-b">
                  <TableCell className="p-4">{project.name}</TableCell>
                  <TableCell className="p-4">{project.description}</TableCell>
                  <TableCell className="p-4">
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
                  <TableCell className="p-4">
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
                    <TableCell colSpan={4} className="bg-gray-50 p-4  dark:bg-gray-800 dark:text-white">
                      <div className="border rounded-lg p-4  dark:bg-gray-800 dark:text-white">
                        <ProjectDetails
                          project={project}
                          projectDetails={projectDetails}
                          setProjectDetails={setProjectDetails}
                          newKey={newKey}
                          setNewKey={setNewKey}
                          newValue={newValue}
                          setNewValue={setNewValue}
                          newMode={newMode} // Pass down newMode
                          setNewMode={setNewMode} // Pass down setNewMode
                          isEditing={isEditing}
                          setIsEditing={setIsEditing}
                        />
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
