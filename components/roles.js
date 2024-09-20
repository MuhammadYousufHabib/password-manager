'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"
import RolesModal from './roles-modal'  
import { fetchPermissions } from '@/services/api/permissions'  

export function RolesJs({ roles }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [permissionOptions, setPermissionOptions] = useState([])

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const permissions = await fetchPermissions()
        setPermissionOptions(permissions)
      } catch (error) {
        console.error('Failed to fetch permissions:', error)
      }
    }

    getPermissions()
  }, [])

  const handleAddRole = async (role) => {
    try {
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
      })

      if (!response.ok) {
        throw new Error('Failed to add role')
      }
      setModalOpen(false)  
    } catch (error) {
      console.error('Failed to add role:', error)
    }
  }

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
      <Button className="mt-4" onClick={() => setModalOpen(true)}>
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Role
      </Button>
      <RolesModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddRole}
        permissionOptions={permissionOptions}  
      />
    </div>
  );
}
