"use client"; 
import React, { useEffect, useState } from 'react';
import { get_me, me_permission, me_role, update_me } from '@/services/api/me';
import { Button } from './ui/button';

export function ProfileJS() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState([]);
  const [currentUserPermission, setCurrentUserPermission] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');

  const fetchUserData = async () => {
    try {
      const userResponse = await get_me();
      setCurrentUser(userResponse);
      setEditedName(userResponse.name);
      setEditedEmail(userResponse.email);
      setEditedPassword(userResponse.password);
      const roleResponse = await me_role();
      setCurrentUserRole(roleResponse);
      const permissionResponse = await me_permission();
      setCurrentUserPermission(permissionResponse);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      await update_me({ 
        name: editedName, 
        email: editedEmail,
        password: editedPassword 
      });
      fetchUserData();  
      setIsEditing(false); 
    } catch (err) {
      setError(err.message || "Failed to update user info");
    }
  };

  if (loading) return <p className="text-center ">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (      
    <div className="max-w-lg mx-auto dark:border-2 dark:border-gray-900 p-4  shadow-lg rounded-lg space-y-2 bg-card dark:text-white text-sm">
      <div>
        <p className="font-semibold">Name</p>
        {isEditing ? (
          <input 
            type="text" 
            value={editedName} 
            onChange={(e) => setEditedName(e.target.value)} 
            className="border rounded-md p-1 w-full bg-card dark:text-white" 
          />
        ) : (
          <p className="border rounded-md p-1 w-full bg-card dark:text-white" >{currentUser.name || "No name available"}</p>
        )}
      </div>
      <div>
        <p className="font-semibold">Username</p>        
          <p className="border rounded-md p-1 w-full bg-card dark:text-white" >{currentUser.username || "No name available"}</p>
      </div>
      <div>
        <p className="font-semibold">Password</p>
        {isEditing ? (
          <input 
          type="password" 
          placeholder='Enter new password If u want'
          value={editedPassword} 
          onChange={(e) => setEditedPassword(e.target.value)} 
          className="border rounded-md p-1 w-full bg-card dark:text-white" 
          />
        ) : (
          <p>{currentUser.password || "🚫"}</p>
        )}
      </div>
      <div >
        <p className="font-semibold">Email</p>
        {isEditing ? (
          <input 
            type="email" 
            value={editedEmail} 
            onChange={(e) => setEditedEmail(e.target.value)} 
            className="border rounded-md p-1 w-full bg-card dark:text-white" 
          />
        ) : (
          <p className="border rounded-md p-1 w-full bg-card dark:text-white" >{currentUser.email || "No email available"}</p>
        )}
      </div>
      <Button onClick={handleEditToggle} className="mt-2">
        {isEditing ? "Cancel" : "Edit"}
      </Button>
      {isEditing && (
        <Button onClick={handleSaveChanges} className="mt-2 ml-2 bg-gray-700 text-white py-1 px-3 rounded hover:bg-gray-900">
          Save Changes
        </Button>
      )}
      <div>
        <h3 className="font-bold">Permissions:</h3>
        <div className="h-24 overflow-y-auto border rounded-md p-2 mb-2">
          <ul className="list-disc list-inside">
            {Array.isArray(currentUserPermission) && currentUserPermission.length > 0 ? (
              currentUserPermission.map((element) => (
                <li key={element.id} className="dark:text-gray-300">{element.name || "No name available"}</li>
              ))
            ) : (
              <li className="text-gray-500">No permissions available.</li>
            )}
          </ul>
        </div>
      </div>
      <div>
        <h3 className="font-bold">Roles:</h3>
        <div className="h-24 overflow-y-auto border rounded-md p-2">
          <ul className="list-disc list-inside">
            {Array.isArray(currentUserRole) && currentUserRole.length > 0 ? (
              currentUserRole.map((element) => (
                <li key={element.id} className="text-gray-700 dark:text-gray-300">{element.name || "No name available"}</li>
              ))
            ) : (
              <li className="text-gray-500">No roles available.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}