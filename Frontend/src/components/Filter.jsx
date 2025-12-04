import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Filter() {
  const [formData, setFormData] = useState({
    category: "",
    forWhom: "",
    age: "",
    city: "",
    name: "",
    medicalHistory: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/browse-policy/result");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#f2f6ff] text-gray-900 py-16 px-4">

      {/* CARD */}
      <div className="w-full max-w-3xl bg-white shadow-xl border border-gray-200 rounded-3xl p-12">

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-blue-600">
            Let’s find the best plan for you
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Compare top insurance policies tailored to your needs
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* CATEGORY */}
          <div>
            <label className="text-gray-800 font-semibold mb-2 block text-lg">
              Insurance Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose category</option>
              <option value="health">Health Insurance</option>
              <option value="life">Life Insurance</option>
              <option value="vehicle">Vehicle Insurance</option>
            </select>
          </div>

          {/* GRID: NAME + FOR WHOM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* NAME */}
            <div>
              <label className="text-gray-800 font-semibold mb-2 block text-lg">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* FOR WHOM */}
            <div>
              <label className="text-gray-800 font-semibold mb-2 block text-lg">
                For Whom?
              </label>
              <select
                name="forWhom"
                value={formData.forWhom}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="self">Self</option>
                <option value="spouse">Spouse</option>
                <option value="parents">Parents</option>
                <option value="child">Child</option>
              </select>
            </div>

          </div>

          {/* GRID: AGE + CITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* AGE */}
            <div>
              <label className="text-gray-800 font-semibold mb-2 block text-lg">
                Age
              </label>
              <input
                name="age"
                type="number"
                placeholder="Your age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* CITY */}
            <div>
              <label className="text-gray-800 font-semibold mb-2 block text-lg">
                City
              </label>
              <input
                name="city"
                type="text"
                placeholder="e.g., Delhi"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

          </div>

          {/* MEDICAL HISTORY */}
          <div>
            <label className="text-gray-800 font-semibold mb-2 block text-lg">
              Medical History
            </label>
            <textarea
              name="medicalHistory"
              placeholder="Enter medical conditions (optional)"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm h-28 resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              🔍 Find Matching Policies
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Filter;
