"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"
import AddUserModal from './add-user-modal'  
import { fetchRoles } from '@/services/api/roles'  

export default function UsersPage({ users }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [roleOptions, setRoleOptions] = useState([])

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const roles = await fetchRoles()
        setRoleOptions(roles)
      } catch (error) {
        console.error('Failed to fetch roles:', error)
      }
    }

    loadRoles()
  }, [])

  const handleAddUser = async (newUser) => {
    try {
      console.log('New user to add:', newUser)
    } catch (error) {
      console.error('Failed to add user:', error)
    }
    setModalOpen(false)
  }
  
  
  return (
    <div className="container mx-auto  ">
      <h1 className="text-2xl font-bold mb-5">Users</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
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
        Add User
      </Button>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddUser}
        roleOptions={roleOptions}  
      />
   
    </div>
  )
}
