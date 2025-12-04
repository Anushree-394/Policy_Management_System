import React from "react";
import { Link } from "react-router-dom";

const imageUrls = {
  heroImage:
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?...",
  healthInsurance:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?...",
  lifeInsurance:
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?...",
  carInsurance:
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?...",
  homeInsurance:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?...",
  travelInsurance:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?...",
  investmentIcon:
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?...",
  bikeInsurance:
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?...",
};

const Home = () => {
  const insuranceCategories = [
    { id: 1, name: "Term Life Insurance", icon: "📋", image: imageUrls.lifeInsurance, tag: "Secure your family" },
    { id: 2, name: "Health Insurance", icon: "🏥", image: imageUrls.healthInsurance, tag: "Upto 25% Discount" },
    { id: 3, name: "Investment Plans", icon: "📈", image: imageUrls.investmentIcon, tag: "Grow your wealth" },
    { id: 4, name: "Car Insurance", icon: "🚗", image: imageUrls.carInsurance, tag: "Lowest Price Guarantee" },
    { id: 5, name: "2 Wheeler Insurance", icon: "🏍️", image: imageUrls.bikeInsurance, tag: "Quick & Easy" },
    { id: 6, name: "Family Health Insurance", icon: "👨‍👩‍👧‍👦", image: imageUrls.healthInsurance, tag: "Complete Protection" },
    { id: 7, name: "Travel Insurance", icon: "✈️", image: imageUrls.travelInsurance, tag: "Travel with peace" },
    { id: 8, name: "Home Insurance", icon: "🏠", image: imageUrls.homeInsurance, tag: "Protect your home" },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <header className="flex justify-between items-center py-5 px-10 shadow-sm sticky top-0 bg-white z-30">
        <div className="text-2xl font-bold text-blue-600">SecurePolicy</div>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#products" className="hover:text-blue-600">Insurance Products</a>
          <a href="#renew" className="hover:text-blue-600">Renew Your Policy</a>
          <a href="#claim" className="hover:text-blue-600">Claim</a>
          <a href="#about" className="hover:text-blue-600">About Us</a>
          <a href="#support" className="hover:text-blue-600">Support</a>
        </nav>

        <div className="flex gap-4">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            Talk to Expert
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Sign in
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Hero Content */}
        <div>
          <h1 className="text-5xl font-bold text-gray-900 leading-snug">
            Let’s find you the <span className="text-blue-600">Best Insurance</span>
          </h1>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
              51+ insurers offering lowest prices
            </span>
            <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
              Quick, easy & hassle free
            </span>
    <div className="home-container">
      <main className="main-content">
        <div className="hero">
          <div className="hero-content">
            <h1>Let's find you the Best Insurance</h1>
            <div className="tags">
              <span>51+ insurers offering lowest prices</span>
              <span>Quick, easy & hassle free</span>
            </div>
            <div className="hero-image">
              <img src={imageUrls.heroImage} alt="Family protected by insurance" />
            </div>
          </div>
          
          <div className="promo-banner">
            <div className="promo-content">
              <h3>Best time to buy Health Insurance is now</h3>
              <p>Additional discount up to 25%*</p>
              <p>0%^ GST on health insurance plans</p>
              <button className="btn-secondary">View plans</button>
            </div>
          </div>

          <img
            src={imageUrls.heroImage}
            alt="Hero"
            className="rounded-2xl mt-10 shadow-lg"
          />
        </div>

        {/* Promo Banner */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-semibold">Best time to buy Health Insurance is now</h3>
          <p className="mt-3 text-lg">✓ Additional discount up to 25%*</p>
          <p className="text-lg">✓ 0% GST on health insurance plans</p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
            View plans
          </button>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section id="products" className="max-w-7xl mx-auto px-6 mt-20 mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Insurance Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {insuranceCategories.map((category) => (
            <Link
              key={category.id}
              to="/browse-policy/filter"
              className="shadow-md hover:shadow-lg transition rounded-xl overflow-hidden bg-white"
            >
              <div className="relative h-40">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-4xl">
                  <span>{category.icon}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {category.name}
                </h3>
                <span className="text-sm text-blue-600">{category.tag}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            View all products
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
