'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import AddPermissionModal from './permissions-modal';
import { fetchPermissions, createPermission, updatePermission, deletePermission } from '@/services/api/permissions'; 
import CheckPermission from './CheckPermission';


export function PermissionsJs({ permissions }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allowedApis, setAllowedApis] = useState([]); 
  const [editingPermission, setEditingPermission] = useState(null);
  const [permissionsList, setPermissionsList] = useState(permissions);

  const handleAddPermission = async (newPermission) => {

    if (permissionsList.map(permission => permission.name).includes(newPermission.name)) {
      alert("Permission already exists!");
      return;
    }   try {
      const createdPermission = await createPermission(newPermission); 
      setPermissionsList((prev) => [...prev, createdPermission]); 
    } catch (error) {
      console.error('Failed to add permission:', error);
    }
    setModalOpen(false);
  };

  const handleUpdatePermission = async (updatedPermission) => {
    try {
      await updatePermission(updatedPermission.id, updatedPermission); // Call API to update permission
      setPermissionsList((prev) => 
        prev.map((permission) => 
          permission.id === updatedPermission.id ? updatedPermission : permission
        )
      ); // Update the permission in the state
    } catch (error) {
      console.error('Failed to update permission:', error);
    }
    setModalOpen(false);
    setEditingPermission(null);   
  };

  const handleDeletePermission = async (id) => {
    try {
      await deletePermission(id); 
      setPermissionsList((prev) => prev.filter((permission) => permission.id !== id)); 
    } catch (error) {
      console.error('Failed to delete permission:', error);
    }
  };
  const handleEditPermission = (permission) => {
    setEditingPermission(permission); 
    setModalOpen(true); 
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-5">Permissions</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {/* <TableHead>Allowed API</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissionsList.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                  <CheckPermission permission={"PERMISSION:UPDATE"}>
                  
                    <Button onClick={() => handleEditPermission(permission)} size="sm" variant="outline">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    </CheckPermission>
                    <CheckPermission permission={"PERMISSION:DELETE"}>

                    <Button onClick={() => handleDeletePermission(permission.id)} size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    </CheckPermission>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CheckPermission permission={"PERMISSION:CREATE"}>

      <Button className="mt-4" onClick={() => {
        setEditingPermission(null); 
        setModalOpen(true);
      }}>
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Permission
      </Button>
      </CheckPermission>
      <AddPermissionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editingPermission ? handleUpdatePermission : handleAddPermission}
        apiOptions={allowedApis}
        permission={editingPermission} 
      />
    </div>
  );
}
