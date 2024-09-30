import { useState } from "react";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { XIcon } from "lucide-react"; 

// Cross icon for removing mode

const modeOptions = [
  { value: "mode1", label: "Mode 1" },
  { value: "mode2", label: "Mode 2" }, { value: "mode1", label: "Mode 1" },
  { value: "mode2", label: "Mode 2" }, { value: "mode1", label: "Mode 1" },
  { value: "mode2", label: "Mode 2" }, { value: "mode1", label: "Mode 1" },
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
  theme, // Add theme prop
}) {
  const handleKeyChange = (e, index) => {
    const updatedDetails = [...projectDetails];
    updatedDetails[index].key = e.target.value;
    setProjectDetails(updatedDetails);
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

  const handleRemoveMode = (index) => {
    const updatedDetails = [...projectDetails];
    updatedDetails[index].mode = null; // Remove the mode
    setProjectDetails(updatedDetails);
  };

  return (
    <div className={`absolute left-0 w-full h-auto bg-white border border-gray-200 shadow-lg z-10 p-4 rounded overflow-hidden dark:bg-gray-800 dark:text-white`}>
      <h3 className="font-semibold">Project Details:</h3>
      <h2 className="font-semibold">Fields:</h2>

      <div className= {` flex space-x-4 mb-2 `}>
        <input
          type="text"
          value={newKey}
          className={`border rounded px-2 py-1 w-1/4 h-[40px] dark:border-gray-200 dark:bg-gray-800 dark:text-white`}
          placeholder="Enter new key"
          onChange={(e) => setNewKey(e.target.value)}
        />
        <input
          type="text"
          value={newValue}
          className={`border rounded px-2 py-1 w-1/4 h-[40px] dark:border-gray-200 dark:bg-gray-800 dark:text-white`}
          placeholder="Enter new value"
          onChange={(e) => setNewValue(e.target.value)}
        />
        <div className="dropdown-height dark:bg-gray-800 dark:text-white ">
        <Select
          value={newMode}
          onChange={setNewMode}
          placeholder="Select Mode"
          options={modeOptions}
          isClearable
          menuPortalTarget={document.body}
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            option: (provided) => ({
              ...provided,
              color: 'black',  // Set the option text color to black
            }),
          }}
          className="text-xs z-40"
        />

        </div>
        <Button
          className="bg-blue-500 text-white h-[40px] px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          variant="outline"
          size="sm"
          onClick={handleAdd}
        >
          Add
        </Button>

      </div>

      <ul className="mt-2 space-y-1">
        {projectDetails.map((detail, index) => (
          <li key={index} className="flex items-center space-x-4">
            <input
              type="text"
              value={detail.key}
              className={`border rounded px-2 py-1 w-1/4 h-[40px] dark:border-gray-200 dark:bg-gray-800 dark:text-white`}
              onChange={(e) => handleKeyChange(e, index)}
              disabled={isEditing !== index}
            />
            <input
              type="text"
              value={detail.value}
              className={`border rounded px-2 py-1 w-1/4 h-[40px] dark:border-gray-200 dark:bg-gray-800 dark:text-white`}
              onChange={(e) => handleValueChange(e, index)}
              disabled={isEditing !== index}
            />

            <div className="w-1/4 flex items-center">
            <Select
              value={detail.mode}
              onChange={(selectedMode) => handleModeChange(selectedMode, index)}
              options={modeOptions}
              isDisabled={isEditing !== index}
              placeholder="Mode (Optional)"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                option: (provided) => ({
                  ...provided,
                  color: 'black',  // Set the option text color to black
                }),
              }}
            />

              {detail.mode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMode(index)}
                  className="ml-2"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
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
