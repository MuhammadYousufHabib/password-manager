"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import RolesModal from "./roles-modal";
import { fetchPermissions } from "@/services/api/permissions";
import { createRole, deleteRole, updateRole } from "@/services/api/roles";
import { assign_permission, assign_permission_update, get_assigned_permission } from "@/services/api/assign";
import CheckPermission from "./CheckPermission";

export function RolesJs({ roles: initialRoles }) {
  const [Permissionids, setPermissionids] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [roles, setRoles] = useState(initialRoles || []);
const [assignedPermissions, setassignedPermissions] = useState([])
  useEffect(() => {
    const getPermissions = async () => {
      try {
        const permissions = await fetchPermissions();
        setPermissionOptions(permissions);
      } catch (error) {
        console.error("Failed to fetch permissions:", error);
      }
    };

    getPermissions();
  }, []);

  const handleAddRole = async (newRole) => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === newRole.name) {
        alert("Role already Exists!");
        return;
      }
    }
    try {
      const addedRole = await createRole(newRole);

      setRoles((prev) => [...prev, addedRole]);
      if (Permissionids.length > 0) {
        await assign_permission({
          role_id: Number(addedRole.id),
          permission_id: Permissionids,
        });
      }
    } catch (error) {
      console.error("Failed to add role:", error);
    } finally {
      setModalOpen(false);
    }
  };
  const handleUpdateRole = async (updatedRole) => {
    try {
      const role = await updateRole(updatedRole.id, updatedRole);
      if (Permissionids.length > 0) {
        await assign_permission_update
        ({
          role_id: Number(updatedRole.id),
          permission_id: Permissionids,
        });
        console.log(Permissionids,"peermission admins")
      }

      setRoles((prev) => prev.map((r) => (r.id === role.id ? role : r)));
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setModalOpen(false);
      setEditingRole(null);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id);
      setRoles((prev) => prev.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };
  const handleEditRole = async(role) => {
    setEditingRole(role);
    setModalOpen(true);
    try   { const response= await get_assigned_permission(Number(role.id))
      setassignedPermissions(response)}
      catch(error){
        console.log("cant get assigned roles",error)
      }
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
                    <CheckPermission permission={"ROLE:UPDATE"}>
                      <Button
                        onClick={() => handleEditRole(role)}
                        size="sm"
                        variant="outline"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </CheckPermission>
                    <CheckPermission permission={"ROLE:DELETE"}>

                    <Button
                      onClick={() => handleDeleteRole(role.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button> </CheckPermission>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CheckPermission permission={"ROLE:CREATE"}>

      <Button
        className="mt-4"
        onClick={() => {
          setEditingRole(null);
          setModalOpen(true);
        }}
      >
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Role
      </Button> </CheckPermission>
      <RolesModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editingRole ? handleUpdateRole : handleAddRole}
        permissionOptions={permissionOptions}
        role={editingRole}
        setPermissionids={setPermissionids}
        assignedPermissions={assignedPermissions.permissions}
      />
    </div>
  );
}
