'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import RolesModal from './roles-modal';  
import { fetchPermissions } from '@/services/api/permissions';  

export function RolesJs({ roles: initialRoles }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [roles, setRoles] = useState(initialRoles || []);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const permissions = await fetchPermissions();
        setPermissionOptions(permissions);
      } catch (error) {
        console.error('Failed to fetch permissions:', error);
      }
    };

    getPermissions();
  }, []);

  const handleAddRole = (newRole) => {
    const newId = Date.now(); 
    setRoles((prev) => [
      ...prev,
      { id: newId, ...newRole } 
    ]);
    setModalOpen(false);
  };


  const handleEditRole = (role) => {
    setEditingRole(role);
    setModalOpen(true);
  };

  const handleUpdateRole = (updatedRole) => {
    setRoles((prev) => 
      prev.map(role => 
        role.id === updatedRole.id ? updatedRole : role
      )
    );
    setModalOpen(false);
    setEditingRole(null);
  };

  const handleDeleteRole = (id) => {
    setRoles((prev) => 
      prev.filter(role => role.id !== id)
    );
  };

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold mb-5">Roles</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleEditRole(role)} size="sm" variant="outline">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteRole(role.id)} size="sm" variant="outline" className="text-red-500 hover:text-red-700">
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
        setEditingRole(null); // Clear editing state for adding
        setModalOpen(true);
      }}>
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Role
      </Button>
      <RolesModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editingRole ? handleUpdateRole : handleAddRole}
        permissionOptions={permissionOptions}  
        role={editingRole} // Pass the role being edited
      />
    </div>
  );
}
