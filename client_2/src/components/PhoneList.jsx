import React from 'react';

const PhoneList = () => {
  // Example phone data
  const phones = [
    { id: 1, name: 'iPhone 14', brand: 'Apple', price: '$999' },
    { id: 2, name: 'Galaxy S22', brand: 'Samsung', price: '$899' },
    { id: 3, name: 'Pixel 7', brand: 'Google', price: '$799' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Phone List</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((phone) => (
              <tr key={phone.id} className="border-b">
                <td className="px-4 py-2">{phone.name}</td>
                <td className="px-4 py-2">{phone.brand}</td>
                <td className="px-4 py-2">{phone.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhoneList;