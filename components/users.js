"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"
import AddUserModal from './add-user-modal'  
import { fetchRoles } from '@/services/api/roles'  
import { createUser,deleteUser,fetchUsers,updateUser } from '@/services/api/users'
import { assign_role } from '@/services/api/assign'
export default function UsersPage({ users }) {
  const [userExists, setuserExists] = useState(false)
  const [roleids, setroleids] = useState([])
  const [usersList, setUsersList] = useState(users); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const roles = await fetchRoles();
        setRoleOptions(roles);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };
    loadRoles();
  }, []);
  const handleAddUser = async (newUser) => {
    try {
      // for(let i=0;i<usersList.length;i++){
      //   if (usersList[i].username===newUser.username){
      //     console.log("user already exist")
      //      setuserExists(true)
      //   }else{
      //     setuserExists(false)
      //   }
      // }
      const addedUser = await createUser(newUser);
      setUsersList((prevUsers) => [
        ...prevUsers,
        addedUser 
      ]);
      console.log(addedUser.id, "addedUser.id >>>>>>>>>>>>>");
  
      for (let i = 0; i < roleids.length; i++) {
       await assign_role({ user_id: Number(addedUser.id), role_id: Number(roleids[i]) })
      }

    } catch (error) {
      console.error('Failed to add user:', error);
    }
   
  //  userExists ? setModalOpen(false) : setModalOpen(true);
  setModalOpen(true)
  };
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      // const newlist =await fetchUsers() //added
      setUsersList((usersList) => usersList.filter(user => Number(user.id) !== id));
      // setUsersList(newlist) //added
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };
  const handleEditUser = (user) => {

    setEditingUser(user);
    setModalOpen(true); 
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const updatedUserFromApi = await updateUser(updatedUser.id, updatedUser);
      
      setUsersList((prevUsers) =>
        prevUsers.map(user => 
          user.id === updatedUser.id ? updatedUserFromApi : user
        )
      );
  
      setModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div className="container mx-auto">
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
            {usersList.map((user) => (
              <TableRow key={user.id}> 
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleEditUser(user)} size="sm" variant="outline">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteUser(user.id)} size="sm" variant="outline" className="text-red-500 hover:text-red-700">
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
        onClose={() => {
          setModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={editingUser ? handleUpdateUser : handleAddUser}
        roleOptions={roleOptions}
        user={editingUser} 
        roleids={roleids}
        setroleids={setroleids}
      />
    </div>
  );
}
