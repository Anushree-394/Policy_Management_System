import React from 'react';
import './Home.css';

// Placeholder image URLs
const imageUrls = {
  heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  healthInsurance: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  lifeInsurance: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  carInsurance: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  homeInsurance: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
  travelInsurance: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  investmentIcon: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  bikeInsurance: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
};

const Home = () => {
  const insuranceCategories = [
    { 
      id: 1, 
      name: 'Term Life Insurance', 
      icon: '📋', 
      image: imageUrls.lifeInsurance,
      tag: 'Secure your family' 
    },
    { 
      id: 2, 
      name: 'Health Insurance', 
      icon: '🏥', 
      image: imageUrls.healthInsurance,
      tag: 'Upto 25% Discount' 
    },
    { 
      id: 3, 
      name: 'Investment Plans', 
      icon: '📈', 
      image: imageUrls.investmentIcon,
      tag: 'Grow your wealth' 
    },
    { 
      id: 4, 
      name: 'Car Insurance', 
      icon: '🚗', 
      image: imageUrls.carInsurance,
      tag: 'Lowest Price Guarantee' 
    },
    { 
      id: 5, 
      name: '2 Wheeler Insurance', 
      icon: '🏍️', 
      image: imageUrls.bikeInsurance,
      tag: 'Quick & Easy' 
    },
    { 
      id: 6, 
      name: 'Family Health Insurance', 
      icon: '👨‍👩‍👧‍👦', 
      image: imageUrls.healthInsurance,
      tag: 'Complete Protection' 
    },
    { 
      id: 7, 
      name: 'Travel Insurance', 
      icon: '✈️', 
      image: imageUrls.travelInsurance,
      tag: 'Travel with peace' 
    },
    { 
      id: 8, 
      name: 'Home Insurance', 
      icon: '🏠', 
      image: imageUrls.homeInsurance,
      tag: 'Protect your home' 
    },
  ];

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">SecurePolicy</div>
        <nav className="nav-links">
          <a href="#products">Insurance Products</a>
          <a href="#renew">Renew Your Policy</a>
          <a href="#claim">Claim</a>
          <a href="#about">About Us</a>
          <a href="#support">Support</a>
        </nav>
        <div className="header-actions">
          <button className="btn-outline">Talk to Expert</button>
          <button className="btn-primary">Sign in</button>
        </div>
      </header>

      {/* Hero Section */}
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
        </div>

        {/* Insurance Categories */}
        <section className="categories">
          <h2>Insurance Products</h2>
          <div className="category-grid">
            {insuranceCategories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay">
                    <div className="category-icon">{category.icon}</div>
                  </div>
                </div>
                <div className="category-details">
                  <h3>{category.name}</h3>
                  <span className="tag">{category.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-outline view-all">View all products</button>
        </section>
      </main>
    </div>
  );
};

export default Home;
