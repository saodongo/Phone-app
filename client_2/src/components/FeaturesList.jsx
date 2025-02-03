import React, { useState } from "react";

const FeaturesList = () => {
  const [features, setFeatures] = useState([
    { id: 1, name: "5G Connectivity", description: "Supports ultra-fast 5G networks" },
    { id: 2, name: "Water Resistance", description: "IP68 water and dust resistance" },
    { id: 3, name: "Wireless Charging", description: "Supports Qi wireless charging" },
  ]);

  const [newFeature, setNewFeature] = useState({ name: "", description: "" });
  const [editingFeature, setEditingFeature] = useState(null);

  // Handle input change for new feature
  const handleInputChange = (e) => {
    setNewFeature({ ...newFeature, [e.target.name]: e.target.value });
  };

  // Add a new feature
  const addFeature = () => {
    if (newFeature.name && newFeature.description) {
      setFeatures([...features, { id: Date.now(), ...newFeature }]);
      setNewFeature({ name: "", description: "" });
    }
  };

  // Delete a feature
  const deleteFeature = (id) => {
    setFeatures(features.filter((feature) => feature.id !== id));
  };

  // Open edit mode
  const startEditing = (feature) => {
    setEditingFeature(feature);
    setNewFeature({ name: feature.name, description: feature.description });
  };

  // Update feature
  const updateFeature = () => {
    setFeatures(
      features.map((feature) =>
        feature.id === editingFeature.id ? { ...feature, ...newFeature } : feature
      )
    );
    setEditingFeature(null);
    setNewFeature({ name: "", description: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Features List</h1>

      {/* Add Feature Form */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">{editingFeature ? "Edit Feature" : "Add New Feature"}</h2>
        <input
          type="text"
          name="name"
          value={newFeature.name}
          onChange={handleInputChange}
          placeholder="Feature Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="description"
          value={newFeature.description}
          onChange={handleInputChange}
          placeholder="Feature Description"
          className="border p-2 mb-2 w-full"
        />
        {editingFeature ? (
          <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={updateFeature}>
            Update
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addFeature}>
            Add Feature
          </button>
        )}
      </div>

      {/* Features List */}
      <div className="bg-white p-6 rounded shadow-md">
        <ul>
          {features.length === 0 ? (
            <p className="text-gray-600">No features available.</p>
          ) : (
            features.map((feature) => (
              <li key={feature.id} className="mb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{feature.name}</h2>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => startEditing(feature)}>
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteFeature(feature.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FeaturesList;
