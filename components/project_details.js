import { useState } from "react";
import { Button } from "@/components/ui/button";
import Select from "react-select";

const modeOptions = [
  { value: "mode1", label: "Mode 1" },
  { value: "mode2", label: "Mode 2" },
  { value: "mode3", label: "Mode 3" },
];

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
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const handleAdd = () => {
    if (newKey && newValue) { // Allow mode to be optional
      const updatedDetails = [
        ...projectDetails,
        { key: newKey, value: newValue, mode: newMode || null },
      ];
      setProjectDetails(updatedDetails);
      setNewKey("");
      setNewValue("");
      setNewMode(null); // Clear the mode selection after adding
    }
  };

  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const handleUpdate = () => {
    setIsEditing(null);
  };

  const handleDelete = (index) => {
    const updatedDetails = projectDetails.filter((_, i) => i !== index);
    setProjectDetails(updatedDetails);
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
              
            /> <button
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
