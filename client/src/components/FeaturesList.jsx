import React from 'react';

const FeaturesList = () => {
  // Example features data
  const features = [
    { id: 1, name: '5G Connectivity', description: 'Supports ultra-fast 5G networks' },
    { id: 2, name: 'Water Resistance', description: 'IP68 water and dust resistance' },
    { id: 3, name: 'Wireless Charging', description: 'Supports Qi wireless charging' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Features List</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <ul>
          {features.map((feature) => (
            <li key={feature.id} className="mb-4">
              <h2 className="text-xl font-semibold">{feature.name}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturesList;