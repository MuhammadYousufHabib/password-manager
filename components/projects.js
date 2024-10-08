'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import ProjectsModal from './projects-modal'; 
import { ProjectDetails } from './project_details';
import { createProject, deleteProject, updateProject } from '@/services/api/projects';
import { fetchUsers } from '@/services/api/users';
import { assign_project, get_assigned_project_users,assign_project_update } from '@/services/api/assign';
import CheckPermission from './CheckPermission';

export function ProjectsJs({ projects }) {
  const [first, setfirst] = useState(false)
  const [assignedUsers, setAssignedUsers] = useState(null); 
  const [isEditing, setIsEditing] = useState(null); 
  const [newKey, setNewKey] = useState(''); 
  const [newValue, setNewValue] = useState(''); 
  const [newMode, setNewMode] = useState(null); 
  const [projectDetails, setProjectDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectList, setProjectList] = useState(projects); 
  const [editingProject, setEditingProject] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null); 
  const [users, setUsers] = useState([]); 
const [usersOfProject, setusersOfProject] = useState([])



 async function loadUsers ()
{
    try {
      const allUsers = await fetchUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Failed to fetch Users:', error);
    }
}
  
  const handleAddProject = async (newProject) => {
    for(let i=0;i<projectList.length;i++){
      if(projectList[i].name===newProject.name){
         alert("Project already Exists!")
         return
      }
    }
    try {

      const createdProject = await createProject(newProject); 
      setProjectList((prevProjects) => [
        ...prevProjects,
        createdProject 
      ]);
      if(assignedUsers.length>0)
{      
  await assign_project({ user_id: assignedUsers, project_id: Number(createdProject.id) })
}      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  };
  const handleEditProject = async(project) => {
    setEditingProject(project);
    setIsModalOpen(true);
    try{
       const response=  await get_assigned_project_users(project.id)
       setusersOfProject(response)
    }
    catch(error){
      console.log("cant get assinged users of a project", error)
    }
  };

  const handleUpdateProject = async (updatedProject) => {
    try {
      const response = await (updatedProject.id, updatedProject); 
      setProjectList((prevProjects) => 
        prevProjects.map((project) => 
          project.id === updatedProject.id ? response : project 
        )
      );
      if(assignedUsers!==null)
        {      
          await assign_project_update({ user_id:assignedUsers, project_id: Number(updatedProject.id) })
        } 
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };
  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id); 
      setProjectList((prevProjects) => prevProjects.filter(project => project.id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };
  const toggleExpandProject = (id) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };
  const usersList = async () => {
    const usersData = await fetchUsers();
    setUsers(usersData);
  };
  return (
    <div className="container mx-auto bg-card">
      <h1 className="text-2xl font-bold mb-5">Projects</h1>
      <div className="border rounded-lg overflow-hidden relative h-auto">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow>
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
                    <CheckPermission permission={"PROJECT:UPDATE" &&"ASSIGN_PROJECT:UPDATE" || "ASSIGN_PROJECT:DELETE"}>

                      <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      </CheckPermission>
                      <CheckPermission permission={"PROJECT:DELETE"}>

                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteProject(project.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                      </CheckPermission>
                    </div>
                  </TableCell>
                  <TableCell className="p-4">
                  <CheckPermission permission={"FIELD:GET:ALL" || "FIELD:GET:STAGGING" || "FIELD:GET:DEPLOYMENT" || "FIELD:GET:DEVELOPMENT"}>

                    <Button size="sm" variant="outline" onClick={() => toggleExpandProject(project.id)}>
                      {expandedProjectId === project.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CheckPermission>
                  </TableCell>
                </TableRow>
                {expandedProjectId === project.id && (
                  <TableRow>
                    <TableCell colSpan={4} className="p-4">
                        <ProjectDetails
                          project={project}
                          projectDetails={projectDetails}
                          setProjectDetails={setProjectDetails}
                          newKey={newKey}
                          setNewKey={setNewKey}
                          newValue={newValue}
                          setNewValue={setNewValue}
                          newMode={newMode} 
                          setNewMode={setNewMode} 
                          isEditing={isEditing}
                          setIsEditing={setIsEditing}
                          expandedProjectId={expandedProjectId}
                          projects={projects}
                          setProjectList={setProjectList}

                        />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <CheckPermission permission={"PROJECT:CREATE"}>

      <Button className="mt-4" onClick={() => { setEditingProject(null); setIsModalOpen(true); }}>
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Project
      </Button>
      </CheckPermission>
      <CheckPermission permission={"PROJECT:CREATE" || "PROJECT:UPDATE " || "ASSIGN_PROJECT:CREATE"}>

      <ProjectsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={editingProject ? handleUpdateProject : handleAddProject} 
        project={editingProject} 
        loadUsers={loadUsers}
        users={users}
        assignedUsers={assignedUsers}
        setassignedUsers={setAssignedUsers}
        usersOfProject={usersOfProject}
        setUsersOfProject={setusersOfProject}

/> </CheckPermission>
    </div>
  );
}
