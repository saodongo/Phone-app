import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams(); // Get the profile ID from the URL

  // Example profile data (replace with API call in a real app)
  const profiles = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
  ];

  // Find the profile by ID
  const profile = profiles.find((p) => p.id === parseInt(id));

  if (!profile) {
    return <div className="p-6 text-red-500">Profile not found!</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile Details</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Name</label>
          <p className="text-gray-900">{profile.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Email</label>
          <p className="text-gray-900">{profile.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Phone</label>
          <p className="text-gray-900">{profile.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;