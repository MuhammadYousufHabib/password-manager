import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { fetchModes } from "@/services/api/modes";
import { createField, deleteField, updateKey } from "@/services/api/fields";

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
}) {
  const [modeOptions, setModeOptions] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const fetchModeList = async () => {
    const modes = await fetchModes();
    const formattedModes = modes.map(mode => ({
      label: mode.name,
      value: mode.id
    }));
    setModeOptions(formattedModes);
  };

  useEffect(() => {
    fetchModeList();
  }, []);

  const handleKeyChange = (e, index) => {
    const updatedDetails = [...projectDetails];
    updatedDetails[index].key = e.target.value;
    setProjectDetails(updatedDetails);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleValueChange = (e, index) => {
    const updatedDetails = [...projectDetails];
    updatedDetails[index].value = e.target.value;
    setProjectDetails(updatedDetails);
  };

  const handleModeChange = (selectedMode, index) => {
    const updatedDetails = [...projectDetails];
    updatedDetails[index].mode = selectedMode;
    setProjectDetails(updatedDetails);
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
        const updatedDetails = [
          ...projectDetails,
          {
            key: newKey,
            value: newValue,
            mode: newMode || null,
            field_id: createdField.field_id, // Capture the field_id
          },
        ];
        setProjectDetails(updatedDetails);
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
    const updatedDetails = [...projectDetails];
    const fieldToUpdate = updatedDetails[index];
    try {
      // Update the key in the backend
      await updateKey(fieldToUpdate.field_id, { key: fieldToUpdate.key });

      setIsEditing(null); // Reset editing state
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };

  const handleDelete = async (index) => {
    const fieldToDelete = projectDetails[index];
    try {
      await deleteField(fieldToDelete.field_id); // Call deleteField API
      const updatedDetails = projectDetails.filter((_, i) => i !== index);
      setProjectDetails(updatedDetails);
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
        <Button variant="outline" size="sm" onClick={handleAdd}>
          Add
        </Button>
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

            {isEditing === index ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdate(index)}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(index)}
              >
                Edit
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(index)}
              className="text-red-500"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
