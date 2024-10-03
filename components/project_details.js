import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { fetchModes } from "@/services/api/modes";
import { createField, deleteField, updateKey } from "@/services/api/fields"; 
import CheckPermission from "./CheckPermission";

export function ProjectDetails({ expandedProjectId, projects }) {
  const [passwordVisibility, setPasswordVisibility] = useState({}); 
  const [key, setKey] = useState(""); 
  const [value, setValue] = useState(""); 
  const [modeOptions, setModeOptions] = useState([]); 
  const [selectedMode, setSelectedMode] = useState(null); 
  const [currentFields, setCurrentFields] = useState([]); 
  const [editingFieldId, setEditingFieldId] = useState(null); 

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

  useEffect(() => {
    fetchModeList();
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
        mode_id: selectedMode ? selectedMode.value : null,
      };
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
  };

  return (
    <div className="absolute left-0 w-full h-auto  border  shadow-lg z-10 p-4 rounded overflow-hidden  bg-card dark:text-white">
      <h2 className="font-semibold">Fields:</h2>
      <div className="flex space-x-4 mb-2">
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
            menuPortalTarget={document.body} // Render menu in body
            styles={{
              menuPortal: base => ({ ...base, zIndex: 9999 }), // Ensure dropdown appears above other elements
            }}
            className="text-xs z-40"
          readOnly={!!editingFieldId} 
        />
        <CheckPermission permission={"FIELD:CREATE"}>
          <Button variant="outline" size="sm" onClick={handleAddField}>
            Add
          </Button>
        </CheckPermission>
      </div>

      <ul>
      {currentFields?.length > 0 &&  <h3 className="font-semibold mt-4">Existing Fields:</h3>}
  {currentFields?.length > 0 && currentFields.map((field) => (
    <li key={field.id} className="flex justify-left mb-2 space-x-4 items-center bg-card dark:text-white"> 
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
      <button        className="text-lg " 
onClick={() => togglePasswordVisibility(field.id)}      >
        {passwordVisibility[field.id] ? "👁️" : "🙈"} 
      </button>
      <Select
        value={editingFieldId === field.id ? selectedMode : modeOptions.find(option => option.value === field.mode_id) || null}
        placeholder="Select Mode"
        isClearable
        menuPortalTarget={document.body} // Render menu in body
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }), // Ensure dropdown appears above other elements
        }}
        className="text-xs z-40"        
        onChange={(selected) => editingFieldId === field.id && setSelectedMode(selected)}
        options={modeOptions}
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
