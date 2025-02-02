import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Home() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/phones");
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

  // const handleBuyClick = (phoneId) => {
  //   navigate(`/phone/${phoneId}`);
  // };

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

      {/* Phone Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {phones.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No phones available at the moment.</p>
        ) : (
          phones.map((phone) => (
            <div
              key={phone.id}
              className="bg-blue-50 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl" // Changed bg-gray-50 to bg-blue-50
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{phone.name}</h3>
                <p className="text-gray-600"><strong>Brand:</strong> {phone.brand}</p>
                <p className="text-gray-600"><strong>Store:</strong> {phone.store}</p>
                <p className="text-gray-500 mt-2">{phone.description}</p>
              </div>

              <div className="p-4 bg-blue-100 flex justify-center">  {/* Changed bg-gray-100 to bg-blue-100 */}
                <button
                  className="bg-green-600 text-white py-2 px-6 rounded-md font-medium transition duration-300 hover:bg-green-500"
                  // onClick={() => handleBuyClick(phone.id)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
