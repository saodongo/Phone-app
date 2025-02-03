import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPhone, setEditingPhone] = useState(null);
  const [updatedPhone, setUpdatedPhone] = useState({ name: "", brand: "" });
  const [newPhone, setNewPhone] = useState({ name: "", brand: "", description: "", store: "" });

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get("https://phone-app-9vkv.onrender.com/phones");
        setPhones(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching phones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  // Handle Delete
  const handleDelete = async (phoneId) => {
    try {
      await axios.delete(`https://phone-app-9vkv.onrender.com/phones/${phoneId}`);
      setPhones(phones.filter(phone => phone.id !== phoneId));
    } catch (err) {
      console.error("Error deleting phone:", err);
    }
  };

  // Open Edit Form
  const handleEdit = (phone) => {
    setEditingPhone(phone);
    setUpdatedPhone({ name: phone.name, brand: phone.brand });
  };

  // Handle Input Change in Edit Form
  const handleChange = (e) => {
    setUpdatedPhone({ ...updatedPhone, [e.target.name]: e.target.value });
  };

  // Handle Update (Only Name & Brand)
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://phone-app-9vkv.onrender.com/phones/${editingPhone.id}`, {
        ...editingPhone,
        name: updatedPhone.name,
        brand: updatedPhone.brand,
      });
      setPhones(phones.map(phone => (phone.id === editingPhone.id ? response.data : phone)));
      setEditingPhone(null); // Close the modal after update
    } catch (err) {
      console.error("Error updating phone:", err);
    }
  };

  // Handle New Phone Input
  const handleNewPhoneChange = (e) => {
    setNewPhone({ ...newPhone, [e.target.name]: e.target.value });
  };

  // Handle Create New Phone
  const handleCreatePhone = async () => {
    try {
      const response = await axios.post("https://phone-app-9vkv.onrender.com/phones", newPhone);
      setPhones([...phones, response.data]);
      setNewPhone({ name: "", brand: "", description: "", store: "" }); // Reset input fields after creating
    } catch (err) {
      console.error("Error adding new phone:", err);
    }
  };

  if (loading) {
    return <div className="text-center p-4 text-lg">Loading phones...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 text-lg">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Phone Store</h1>
      <p className="text-center mb-8 text-gray-600">Explore and buy the latest phones.</p>

      {/* New Phone Form */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Phone</h2>
        <input
          type="text"
          name="name"
          value={newPhone.name}
          onChange={handleNewPhoneChange}
          placeholder="Phone Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="brand"
          value={newPhone.brand}
          onChange={handleNewPhoneChange}
          placeholder="Brand"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="store"
          value={newPhone.store}
          onChange={handleNewPhoneChange}
          placeholder="Store"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="description"
          value={newPhone.description}
          onChange={handleNewPhoneChange}
          placeholder="Phone Description"
          className="border p-2 mb-4 w-full"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-400"
          onClick={handleCreatePhone}
        >
          Add Phone
        </button>
      </div>

      {/* Phone Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {phones.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No phones available at the moment.</p>
        ) : (
          phones.map((phone) => (
            <div
              key={phone.id}
              className="bg-blue-50 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{phone.name}</h3>
                <p className="text-gray-600"><strong>Brand:</strong> {phone.brand}</p>
                <p className="text-gray-600"><strong>Store:</strong> {phone.store}</p>
                <p className="text-gray-500 mt-2">{phone.description}</p>
              </div>

              <div className="p-4 bg-blue-100 flex justify-between">
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-500"
                >
                  Buy Now
                </button>
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-yellow-400"
                  onClick={() => handleEdit(phone)}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-red-500"
                  onClick={() => handleDelete(phone.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingPhone && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Phone</h2>
            <input
              type="text"
              name="name"
              value={updatedPhone.name}
              onChange={handleChange}
              placeholder="Phone Name"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="brand"
              value={updatedPhone.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="border p-2 mb-2 w-full"
            />
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-400"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-gray-400"
                onClick={() => setEditingPhone(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
