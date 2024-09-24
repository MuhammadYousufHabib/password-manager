'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import { fetchPermissions } from '@/services/api/permissions'; 
import AddPermissionModal from './permissions-modal';

export function PermissionsJs({ permissions }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allowedApis, setAllowedApis] = useState([]); 
  const [editingPermission, setEditingPermission] = useState(null);
  const [permissionsList, setPermissionsList] = useState(permissions);

  useEffect(() => {
    const loadAllowedApis = async () => {
      try {
        const permissionsData = await fetchPermissions(); 
        const apis = permissionsData.map(permission => permission.allowed_api); 
        setAllowedApis(apis); 
      } catch (error) {
        console.error('Failed to fetch allowed APIs:', error);
      }
    };

    loadAllowedApis();
  }, []);

  const handleAddPermission = async (newPermission) => {
    try {
      const newId = Date.now();
    setPermissionsList((prev) => [...prev, {id:newId ,...newPermission}]);
    }
    catch(error){      console.error('Failed to add permission:', error);
    }
    setModalOpen(false);
  };

  const handleEditPermission = (permission) => {
    setEditingPermission(permission);
    setModalOpen(true);
  };

  const handleUpdatePermission = (updatedPermission) => {
    setPermissionsList((prev) =>
      prev.map(permission => permission.id === updatedPermission.id ? updatedPermission : permission)
    );
    setModalOpen(false);
    setEditingPermission(null);   
  };

  const handleDeletePermission = (id) => {
    setPermissionsList((prev) => prev.filter(permission => permission.id !== id));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-5">Permissions</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Allowed API</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissionsList.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.allowed_api}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleEditPermission(permission)} size="sm" variant="outline">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDeletePermission(permission.id)} size="sm" variant="outline" className="text-red-500 hover:text-red-700">
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
        setEditingPermission(null); // Clear editing state for adding
        setModalOpen(true);
      }}>
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Permission
      </Button>
      <AddPermissionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editingPermission ? handleUpdatePermission : handleAddPermission}
        apiOptions={allowedApis}
        permission={editingPermission} // Pass the permission being edited
      />
    </div>
  );
}
