// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import Select from "react-select";
// import { fetchModes } from "@/services/api/modes";
// import { createField, deleteField, updateKey } from "@/services/api/fields";
// import CheckPermission from "./CheckPermission";

// export function ProjectDetails({
//   projectDetails,
//   setProjectDetails,
//   newKey,
//   setNewKey,
//   newValue,
//   setNewValue,
//   newMode,
//   setNewMode,
//   isEditing,
//   setIsEditing,
//   expandedProjectId,
//   projects,
// }) {
//   const [modeOptions, setModeOptions] = useState([]);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   // Fetch mode options for dropdown
//   const fetchModeList = async () => {
//     try {
//       const modes = await fetchModes();
//       const formattedModes = modes.map((mode) => ({
//         label: mode.name,
//         value: mode.id,
//       }));
//       setModeOptions(formattedModes);
//     } catch (error) {
//       console.error("Error fetching modes:", error);
//     }
//   };

//   useEffect(() => {
//     fetchModeList();
//   }, []);

//   const handleKeyChange = (e, index) => {
//     const updatedFields = [...projectDetails];
//     updatedFields[index].key = e.target.value;
//     setProjectDetails(updatedFields);
//   };

//   const handleValueChange = (e, index) => {
//     const updatedFields = [...projectDetails];
//     updatedFields[index].value = e.target.value;
//     setProjectDetails(updatedFields);
//   };

//   const handleModeChange = (selectedMode, index) => {
//     const updatedFields = [...projectDetails];
//     updatedFields[index].mode_id = selectedMode.value;
//     setProjectDetails(updatedFields);
//   };

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   const handleAdd = async () => {
//     if (newKey && newValue) {
//       const newField = {
//         project_id: Number(expandedProjectId),
//         key: newKey,
//         value: newValue,
//         mode_id: newMode ? newMode.value : null,
//       };
//       try {
//         const createdField = await createField(newField);
//         const updatedFields = [
//           ...projectDetails,
//           {
//             key: newKey,
//             value: newValue,
//             mode: newMode || null,
//             field_id: createdField.field_id,
//           },
//         ];
//         setProjectDetails(updatedFields);
//         setNewKey("");
//         setNewValue("");
//         setNewMode(null);
//       } catch (error) {
//         console.error("Error adding field:", error);
//       }
//     }
//   };

//   const handleEdit = (index) => {
//     setIsEditing(index);
//   };

//   const handleUpdate = async (index) => {
//     const updatedFields = [...projectDetails];
//     const fieldToUpdate = updatedFields[index];
//     try {
//       await updateKey(fieldToUpdate.field_id, { key: fieldToUpdate.key });
//       setIsEditing(null); // Reset editing state
//     } catch (error) {
//       console.error("Error updating field:", error);
//     }
//   };

//   const handleDelete = async (index) => {
//     const fieldToDelete = projectDetails[index];
//     try {
//       await deleteField(fieldToDelete.field_id);
//       const updatedFields = projectDetails.filter((_, i) => i !== index);
//       setProjectDetails(updatedFields);
//     } catch (error) {
//       console.error("Error deleting field:", error);
//     }
//   };
//   const currentProject = projects.find((project) => project.id === expandedProjectId);

//   return (
//     <div className="absolute left-0 w-full bg-white border border-gray-200 shadow-lg z-10 p-4 rounded overflow-hidden h-screen">
//       <h3 className="font-semibold">Project Details:</h3>
//       <h2 className="font-semibold">Fields:</h2>

//       <div className="flex space-x-4 mb-2">
//         <input
//           type="text"
//           value={newKey}
//           className="border rounded px-2 py-1 w-1/4"
//           placeholder="Enter new key"
//           onChange={(e) => setNewKey(e.target.value)}
//         />
//         <input
//           type="text"
//           value={newValue}
//           className="border rounded px-2 py-1 w-1/4"
//           placeholder="Enter new value"
//           onChange={(e) => setNewValue(e.target.value)}
//         />
//         <div className="w-1/4">
//           <Select
//             value={newMode}
//             onChange={setNewMode}
//             options={modeOptions}
//             placeholder="Select Mode"
//             isClearable
//             className="text-xs"
//             styles={{
//               menu: (base) => ({
//                 ...base,
//                 zIndex: 9999,
//                 maxHeight: "150px",
//                 overflowY: "auto",
//               }),
//             }}
//           />
//         </div>
//         <CheckPermission permission={"FIELD:ADD"}>

//         <Button variant="outline" size="sm" onClick={handleAdd}>
//           Add
//         </Button>
//         </CheckPermission>
//       </div>

//       <ul className="mt-2 space-y-1">
//       {currentProject ? (
//         <>
//           <h3 className="font-bold">{`Project: ${currentProject.name}`}</h3>
//           <ul className="mt-2 space-y-1">
//             {currentProject.fields.length > 0 ? (
//               currentProject.fields.map((field, fieldIndex) => (
//                 <li key={field.field_id} className="flex items-center space-x-4">
//                   <input
//                     type="text"
//                     value={field.key || ""}
//                     className="border rounded px-2 py-1 w-1/4"
//                     onChange={(e) => handleKeyChange(e, fieldIndex)}
//                     disabled={isEditing !== fieldIndex}
//                   />
//                   <input
//                     type={isPasswordVisible ? "text" : "password"}
//                     value={field.value || ""}
//                     className="border rounded px-2 py-1 w-1/4"
//                     onChange={(e) => handleValueChange(e, fieldIndex)}
//                     disabled={isEditing !== fieldIndex}
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="text-sm text-blue-500"
//                   >
//                     {isPasswordVisible ? "Hide" : "Show"}
//                   </button>
//                   <div className="w-1/4">
//                     <Select
//                       value={modeOptions.find(option => option.value === field.mode_id) || null} // Use mode_id to find the option
//                       onChange={(selectedMode) => handleModeChange(selectedMode, fieldIndex)}
//                       options={modeOptions}
//                       isDisabled={isEditing !== fieldIndex}
//                       placeholder="Mode (Optional)"
//                     />
//                   </div>
//                   <CheckPermission permission={"FIELD:UPDATE"}>
//                     {isEditing === fieldIndex ? (
//                       <Button variant="outline" size="sm" onClick={() => handleUpdate(fieldIndex)}>
//                         Update
//                       </Button>
//                     ) : (
//                       <Button variant="outline" size="sm" onClick={() => handleEdit(fieldIndex)}>
//                         Edit
//                       </Button>
//                     )}
//                   </CheckPermission>
//                   <CheckPermission permission={"FIELD:DELETE"}>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleDelete(fieldIndex)}
//                       className="text-red-500"
//                     >
//                       Delete
//                     </Button>
//                   </CheckPermission>
//                 </li>
//               ))
//             ) : (
//               <p>No fields available for this project</p>
//             )}
//           </ul>
//         </>
//       ) : (
//         <p>Select a project to view its fields.</p>
//       )}
//       </ul>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { fetchModes } from "@/services/api/modes";
import { createField, deleteField, updateKey } from "@/services/api/fields";
import CheckPermission from "./CheckPermission";

export function ProjectDetails({
  projectDetails,
  setProjectDetails,
  newKey,
  setNewKey,
  newValue,
  setNewValue,
  newMode,
  setNewMode,
  isEditing,
  setIsEditing,
  expandedProjectId,
  projects,
}) {
  console.log(projects)
  const [modeOptions, setModeOptions] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Fetch mode options for dropdown
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

  const handleKeyChange = (e, index) => {
    const updatedFields = [...projectDetails];
    updatedFields[index].key = e.target.value;
    setProjectDetails(updatedFields);
  };

  const handleValueChange = (e, index) => {
    const updatedFields = [...projectDetails];
    updatedFields[index].value = e.target.value;
    setProjectDetails(updatedFields);
  };

  const handleModeChange = (selectedMode, index) => {
    const updatedFields = [...projectDetails];
    updatedFields[index].mode = selectedMode;
    setProjectDetails(updatedFields);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleAdd = async () => {
    if (newKey && newValue) {
      const newField = {
        project_id: Number(expandedProjectId),
        key: newKey,
        value: newValue,
        mode_id: newMode ? newMode.value : null,
      };
      try {
        const createdField = await createField(newField);
        const updatedFields = [
          ...projectDetails,
          {
            key: newKey,
            value: newValue,
            mode: newMode || null,
            field_id: createdField.field_id,
          },
        ];
        setProjectDetails(updatedFields);
        setNewKey("");
        setNewValue("");
        setNewMode(null);
      } catch (error) {
        console.error("Error adding field:", error);
      }
    }
  };

  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const handleUpdate = async (index) => {
    const updatedFields = [...projectDetails];
    const fieldToUpdate = updatedFields[index];
    try {
      await updateKey(fieldToUpdate.field_id, { key: fieldToUpdate.key });
      setIsEditing(null); // Reset editing state
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };

  const handleDelete = async (index) => {
    const fieldToDelete = projectDetails[index];
    try {
      await deleteField(fieldToDelete.field_id);
      const updatedFields = projectDetails.filter((_, i) => i !== index);
      setProjectDetails(updatedFields);
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };

  return (
    <div className="absolute left-0 w-full bg-white border border-gray-200 shadow-lg z-10 p-4 rounded overflow-hidden h-screen">
      <h3 className="font-semibold">Project Details:</h3>
      <h2 className="font-semibold">Fields:</h2>

      <div className="flex space-x-4 mb-2">
        <input
          type="text"
          value={newKey}
          className="border rounded px-2 py-1 w-1/4"
          placeholder="Enter new key"
          onChange={(e) => setNewKey(e.target.value)}
        />
        <input
          type="text"
          value={newValue}
          className="border rounded px-2 py-1 w-1/4"
          placeholder="Enter new value"
          onChange={(e) => setNewValue(e.target.value)}
        />
        <div className="w-1/4">
          <Select
            value={newMode}
            onChange={setNewMode}
            options={modeOptions}
            placeholder="Select Mode"
            isClearable
            className="text-xs"
            styles={{
              menu: (base) => ({
                ...base,
                zIndex: 9999,
                maxHeight: "150px",
                overflowY: "auto",
              }),
            }}
          />
        </div>
        <CheckPermission permission={"FIELD:ADD"}>

        <Button variant="outline" size="sm" onClick={handleAdd}>
          Add
        </Button>
        </CheckPermission>
      </div>

      <ul className="mt-2 space-y-1">
        {projectDetails.map((detail, index) => (
          <li key={index} className="flex items-center space-x-4">
            <input
              type="text"
              value={detail.key}
              className="border rounded px-2 py-1 w-1/4"
              onChange={(e) => handleKeyChange(e, index)}
              disabled={isEditing !== index}
            />
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={detail.value}
              className="border rounded px-2 py-1 w-1/4"
              onChange={(e) => handleValueChange(e, index)}
              disabled={isEditing !== index}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-sm text-blue-500"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>

            <div className="w-1/4">
              <Select
                value={detail.mode}
                onChange={(selectedMode) => handleModeChange(selectedMode, index)}
                options={modeOptions}
                isDisabled={isEditing !== index}
                placeholder="Mode (Optional)"
              />
            </div>
            <CheckPermission permission={"FIELD:UPDATE"}>

            {isEditing === index ? (
              <Button variant="outline" size="sm" onClick={() => handleUpdate(index)}>
                Update
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => handleEdit(index)}>
                Edit
              </Button>
            )}
            </CheckPermission>
            <CheckPermission permission={"FIELD:DELETE"}>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(index)}
              className="text-red-500"
            >
              Delete
            </Button>
            </CheckPermission>
          </li>
        ))}
      </ul>
    </div>
  );
}
