import React, { useState } from "react";

const PhoneList = () => {
  const [phones, setPhones] = useState([
    { id: 1, name: "iPhone 14", brand: "Apple", price: "$999" },
    { id: 2, name: "Galaxy S22", brand: "Samsung", price: "$899" },
    { id: 3, name: "Pixel 7", brand: "Google", price: "$799" },
  ]);

  const [newPhone, setNewPhone] = useState({ name: "", brand: "", price: "" });
  const [editingPhone, setEditingPhone] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    setNewPhone({ ...newPhone, [e.target.name]: e.target.value });
  };

  // Add a new phone
  const addPhone = () => {
    if (newPhone.name && newPhone.brand && newPhone.price) {
      setPhones([...phones, { id: Date.now(), ...newPhone }]);
      setNewPhone({ name: "", brand: "", price: "" });
    }
  };

  // Delete a phone
  const deletePhone = (id) => {
    setPhones(phones.filter((phone) => phone.id !== id));
  };

  // Start editing a phone
  const startEditing = (phone) => {
    setEditingPhone(phone);
    setNewPhone({ name: phone.name, brand: phone.brand, price: phone.price });
  };

  // Update a phone
  const updatePhone = () => {
    setPhones(
      phones.map((phone) =>
        phone.id === editingPhone.id ? { ...phone, ...newPhone } : phone
      )
    );
    setEditingPhone(null);
    setNewPhone({ name: "", brand: "", price: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Phone List</h1>

      {/* Add or Edit Phone Form */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">{editingPhone ? "Edit Phone" : "Add New Phone"}</h2>
        <input
          type="text"
          name="name"
          value={newPhone.name}
          onChange={handleInputChange}
          placeholder="Phone Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="brand"
          value={newPhone.brand}
          onChange={handleInputChange}
          placeholder="Phone Brand"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="price"
          value={newPhone.price}
          onChange={handleInputChange}
          placeholder="Phone Price"
          className="border p-2 mb-2 w-full"
        />
        {editingPhone ? (
          <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={updatePhone}>
            Update
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addPhone}>
            Add Phone
          </button>
        )}
      </div>

      {/* Phone List Table */}
      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {phones.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-600 py-4">
                  No phones available.
                </td>
              </tr>
            ) : (
              phones.map((phone) => (
                <tr key={phone.id} className="border-b">
                  <td className="px-4 py-2">{phone.name}</td>
                  <td className="px-4 py-2">{phone.brand}</td>
                  <td className="px-4 py-2">{phone.price}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => startEditing(phone)}>
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deletePhone(phone.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhoneList;
