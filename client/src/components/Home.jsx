import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [phones, setPhones] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/phones'); 
        setPhones(response.data);  
      } catch (err) {
        setError(err.message);  
        console.error('Error fetching phones:', err); 
      } finally {
        setLoading(false); 
      }
    };

    fetchPhones();  
  }, []); 

  // Handle Buy Now button click
  const handleBuyClick = (phoneId) => {
    navigate(`/phone/${phoneId}`);  // Redirects to phone details page
  };

  if (loading) {
    return <div className="text-center p-4">Loading phones...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  }
  
  return (
    <div className="container p-4 mx-auto h-screen">
      <h1 className="text-center text-2xl font-bold mb-6">Phone Store</h1>
      <p className="text-center mb-8">Explore and buy the latest phones.</p>

      <div className="card p-8 mx-4 mb-12">
        <div className="phone-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"> 
          {phones.length === 0 ? (
            <p className="text-center text-gray-600">No phones available at the moment.</p>
          ) : (
            phones.map((phone) => (
              <div
                key={phone.id}
                className="phone-card bg-white shadow-lg p-8 rounded-lg mx-2 my-0 w-[350px] h-[420px] flex flex-col justify-between"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-3">{phone.name}</h3>
                  <p className="text-gray-700 mb-2"><strong>Brand:</strong> {phone.brand}</p>
                  <p className="text-gray-600 mb-2"><strong>Store:</strong> {phone.store}</p>
                </div>
                <p className="text-gray-500 mb-4 flex-1">{phone.description}</p>

                <div className="mt-auto">
                  <button
                    className="bg-green-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-400"
                    onClick={() => handleBuyClick(phone.id)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
