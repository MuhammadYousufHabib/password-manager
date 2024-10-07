import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Select from "react-select";

import { fetchModes } from "@/services/api/modes";
import { createField, deleteField, updateKey } from "@/services/api/fields"; 
import CheckPermission from "./CheckPermission";
import { get_projects } from "@/services/api/me";

export function ProjectDetails({ expandedProjectId }) {
  const [passwordVisibility, setPasswordVisibility] = useState({}); 
  const [key, setKey] = useState(""); 
  const [value, setValue] = useState(""); 
  const [modeOptions, setModeOptions] = useState([]); 
  const [selectedMode, setSelectedMode] = useState(null); 
  const [currentFields, setCurrentFields] = useState([]); 
  const [editingFieldId, setEditingFieldId] = useState(null); 
  const [projects, setprojects] = useState([])

  const togglePasswordVisibility = (fieldId) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId], 
    }));
  };

  const fetchModeList = async () => {
    try {
      const modes = await fetchModes();
      const formattedModes = modes.map((mode) => ({
        label: mode.name,
        value: mode.id,
      }));
      setModeOptions(formattedModes);
    } catch (error) {
      console.error("Error fetching modes:", error);
    }
  };
const getProjects =async()=> {
 const response=await get_projects()
    setprojects(response)
}
  useEffect(() => {
    fetchModeList();
    getProjects();
  }, []);

  useEffect(() => {
    const currentProject = projects.find(project => project.id === expandedProjectId);
    if (currentProject) {
      setCurrentFields(currentProject.fields); 
    }
  }, [expandedProjectId, projects]);

  const handleAddField = async () => {
    if (key && value) {
      const newField = {
        project_id: Number(expandedProjectId),
        key,
        value, 
        mode_id: selectedMode ? selectedMode.value : null,
      };
      try {
        await createField(newField);
        setCurrentFields((prevFields) => Array.isArray(prevFields) ? [...prevFields, newField] : [newField]);
        setKey("");
        setValue("");
        setSelectedMode(null);
      } catch (error) {
        console.error("Error adding field:", error);
      }
      try
   {   await getProjects();}
   catch(error){
    console.log("ERROR")
   }

    }
  };

  const handleDeleteField = async (fieldId) => {
    try {

      await deleteField(fieldId);
      const updatedFields = currentFields.filter((field) => field.id !== fieldId);
      setCurrentFields(updatedFields);
    } catch (error) {
      console.error("Error deleting field:", error);
    }
    try
    {   await getProjects();}
    catch(error){
     console.log("ERROR")
    }
  };

  const handleEditField = (field) => {
    setEditingFieldId(field.id);
    setKey(field.key);  
    setValue(field.value);
    setSelectedMode(modeOptions.find(option => option.value === field.mode_id) || null);
  };

const handleUpdateField = async () => {
  if (editingFieldId && key && value) {
    const updatedFieldData = {
      project_id: Number(expandedProjectId),
      key,
      value,
      mode_id: selectedMode ? Number(selectedMode.value) : null,
    };
    console.log(updatedFieldData,":)")
    try {
      await updateKey(editingFieldId, updatedFieldData);
      const updatedFields = currentFields.map(field =>
        field.id === editingFieldId ? { ...field, ...updatedFieldData } : field
      );
      setCurrentFields(updatedFields);
      setEditingFieldId(null); 
      setKey("");
      setValue("");
      setSelectedMode(null);
    } catch (error) {
      console.error("Error updating field:", error);
    }
  }
  // try
  // {   await getProjects();}
  // catch(error){
  //  console.log("ERROR")
  // }
};


  return (

    <div className="absolute left-0 w-full  border shadow-lg z-10 p-4 rounded overflow-hidden h-auto  bg-card dark:text-white">
        <CheckPermission permission={"FIELD:ADD"}>
      <h2 className="font-semibold">Fields:</h2>
      <div className="flex space-x-4 mb-2 h-fit">
        <input
          type="text"
          value={editingFieldId ? " " :key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter key"
          className="border rounded px-2 py-1 w-1/4 bg-card dark:text-white"
          readOnly={!!editingFieldId} 
        />
        <input
          type="text"
          value={editingFieldId ? " " :value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="border rounded px-2 py-1 w-1/4 bg-card dark:text-white"
          readOnly={!!editingFieldId}        />
        <Select
          value={editingFieldId? " " :  selectedMode}
          onChange={selected => !editingFieldId && setSelectedMode(selected)} 
          options={modeOptions}
          placeholder="Select Mode"
          isClearable
          menuPortalTarget={document.body} 
            styles={{
              menuPortal: base => ({ ...base, zIndex: 9999 }), 
            }}
            className="text-xs z-40 w-1/4"          
          readOnly={!!editingFieldId} 
          
        />
          <Button variant="outline" size="sm" onClick={handleAddField}>
            Add
          </Button>
      </div>
        </CheckPermission>

{    currentFields!== null && <h3 className="font-semibold mt-4">Existing Fields:</h3>
}      <ul>
  { currentFields!== null && currentFields.map((field) => (
    <li key={field.id} className="flex justify-left mb-2 space-x-4 items-center"> 
      <input
        type="text"
        value={editingFieldId === field.id ? key : field.key}
        onChange={(e) => editingFieldId === field.id && setKey(e.target.value)}
        className="border rounded px-2 py-1 w-1/4 bg-card dark:text-white"
      />
      <div className="relative w-1/4"> 
        <input
type={passwordVisibility[field.id] ? "text" : "password"}
          value={editingFieldId === field.id ? value : field.value}
          onChange={(e) => editingFieldId === field.id && setValue(e.target.value)}
          className="border rounded px-2 py-1 w-full bg-card dark:text-white"
        />
      </div>
      <button        className="text-xs underline" 
onClick={() => togglePasswordVisibility(field.id)}      >
        {passwordVisibility[field.id] ? "Hide" : "Show"} 
      </button>
      <Select
        value={editingFieldId === field.id ? selectedMode : modeOptions.find(option => option.value === field.mode_id) || null}
        placeholder="Select Mode"
        isClearable
        onChange={(selected) => editingFieldId === field.id && setSelectedMode(selected)}
        options={modeOptions}
        menuPortalTarget={document.body} 
            styles={{
              menuPortal: base => ({ ...base, zIndex: 9999 }), 
            }}
            className="text-xs z-40"
      />
      
      <CheckPermission permission={"FIELD:DELETE"}>
        <Button variant="outline" size="sm" className="text-xs text-red-600" onClick={() => handleDeleteField(field.id)}> 
          Delete
        </Button>
      </CheckPermission>
      <CheckPermission permission={"FIELD:UPDATE"}>
        {editingFieldId === field.id ? (
          <Button variant="outline" size="sm" className="text-xs" onClick={handleUpdateField}> 
            Update
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="text-xs" onClick={() => handleEditField(field)}> 
            Edit
          </Button>
        )}
      </CheckPermission>
    </li>
  ))}
</ul>

    </div>
  );
}
