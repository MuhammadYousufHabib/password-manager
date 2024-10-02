"use client"
import React, { useState } from 'react'
import validator from "validator";
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"
import AddUserModal from './add-user-modal'  
import { fetchRoles } from '@/services/api/roles'  
import { createUser,deleteUser,fetchUsers,updateUser } from '@/services/api/users'
import { assign_role, get_assigned_role ,assign_role_update} from '@/services/api/assign'
import CheckPermission from './CheckPermission';
export default function UsersPage({ users }) {
  const [roleids, setroleids] = useState([])
  const [usersList, setUsersList] = useState(users); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const [assignedRoles, setassignedRoles] = useState([])

 
    const loadRoles = async () => {
      try {
        const roles = await fetchRoles();
        setRoleOptions(roles);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };
 
  const handleAddUser = async (newUser) => {
    try {
      
      for(let i=0;i<usersList.length;i++){
        if (usersList[i].username===newUser.username){
          alert("user already exist")
          return
        }
        if (usersList[i].email===newUser.email){
          alert("email already exist")
          return
        }
      }
      if(!validator.isEmail(newUser.email)){
        alert("Please, enter a valid email!")
        return
     }
      const addedUser = await createUser(newUser);
      setUsersList((prevUsers) => [
        ...prevUsers,
        addedUser 
      ]);  
      if(roleids.length>0)
       { 
        await assign_role({ user_id: Number(addedUser.id), role_id: roleids })}
      

    } catch (error) {
      console.error('Failed to add user:', error);
    }
   
  };
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsersList((usersList) => usersList.filter(user => Number(user.id) !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };
  const handleEditUser = async(user) => {
   
    setEditingUser(user);
    setModalOpen(true); 
    try   { const response= await get_assigned_role(Number(user.id))
    setassignedRoles(response)}
    catch(error){
      console.log("cant get assigned roles",error)
    }

  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      if(!validator.isEmail(updatedUser.email)){
        alert("Please, enter a valid email!")
        return
     }
      const updatedUserFromApi = await updateUser(updatedUser.id, updatedUser);
      if(roleids.length>0)
{      
  await assign_role_update({ user_id: Number(updatedUser.id), role_id: roleids })
}
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
                  
                  <CheckPermission permission={"USER:UPDATE"}>

                    <Button onClick={() => handleEditUser(user)} size="sm" variant="outline">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button> 
                    </CheckPermission>
                    <CheckPermission permission={"USER:DELETE"}>

                    <Button onClick={() => handleDeleteUser(user.id)} size="sm" variant="outline" className="text-red-500 hover:text-red-700">
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
      <CheckPermission permission={"USER:ADD"}>

      <Button className="mt-4" onClick={() => setModalOpen(true)}>
        <PlusIcon className="h-4 w-4 mr-1" />
        Add User
      </Button>
      </CheckPermission>
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
        loadRoles={loadRoles}
        assignedRoles={assignedRoles}
      />
    </div>
  );
}
