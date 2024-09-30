'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import AddUserModal from './add-user-modal';
import { fetchRoles } from '@/services/api/roles';
import { createUser, deleteUser, updateUser } from '@/services/api/users';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UsersPage({ users, theme }) { // Added 'theme' prop
  const [usersList, setUsersList] = useState(users);
  const [isModalOpen, setModalOpen] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: ''
  });

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

 // Handle adding a new user
 const handleAddUser = async (newUser) => {
  const newErrors = {};

  // Check for duplication of username or email
  const userExists = usersList.some(
    (user) => user.username === newUser.username || user.email === newUser.email
  );

  if (userExists) {
    if (usersList.some((user) => user.username === newUser.username)) {
      newErrors.username = "A user with the same username already exists.";
    }
    if (usersList.some((user) => user.email === newUser.email)) {
      newErrors.email = "A user with the same email already exists.";
    }
  }

  // Email validation regex
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email);
  if (!emailValid) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (Object.keys(newErrors).length > 0) {
    toast.error("Validation errors. Please check the form.");
    return; // Prevent form submission
  }

  // Add new user to list (mock add, no backend integration)
  setUsersList((prevUsers) => [
    ...prevUsers,
    { id: Date.now(), ...newUser }, // Temporary ID for frontend
  ]);

  // Clear the form fields
  setNewUser({
    name: '',
    username: '',
    email: '',
    password: '',
    role: ''
  });

  // Close modal after successful submission
  setModalOpen(false);
};

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsersList((usersList) => usersList.filter(user => user.id !== id));
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
    <div className={`container mx-auto `}>
      <h1 className="text-2xl font-bold mb-5">Users</h1>
      <div className={`border rounded-lg overflow-hidden`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {usersList.map((user) => (
              <TableRow key={user.id} >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleEditUser(user)} size="sm" variant="outline" className={`dark:text-white-500 hover:text-white-700`}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteUser(user.id)} size="sm" variant="outline" className={`text-red-500 hover:text-red-700`}>
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
           setNewUser({
                  name: '',
                  username: '',
                  email: '',
                  password: '',
                  role: ''
                }); 
               }}
        onSubmit={editingUser ? handleUpdateUser : handleAddUser}
        roleOptions={roleOptions}
        user={editingUser}
        theme={theme} // Pass down the theme prop to the modal
      />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}
