import React from "react";
import InsurancePlanCard from "./PolicyCard";

function PolicyList() {
  const dummyPolicies = [
  {
    company: "Care Health",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Care_Health_Insurance_logo.png/800px-Care_Health_Insurance_logo.png",
    planName: "Ultimate Care",
    features: [
      "104 Cashless hospitals",
      "No Room Rent Limit",
      "₹5 lakh/year no-claim bonus, unlimited",
      "Unlimited Restoration of cover",
    ],
    coverAmount: "₹5 Lakh",
    coverAmountOptions: ["₹5 Lakh", "₹10 Lakh", "₹15 Lakh"],
    premium: "₹623/month",
    originalCost: "₹735 incl. GST",
    discountText: "✓ Inclusive of ₹6 online discount",
    addons: ["Customize plan", "Add to compare"],
  },

  {
    company: "Star Health",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Star_Health_and_Allied_Insurance_logo.png/800px-Star_Health_and_Allied_Insurance_logo.png",
    planName: "Star Home",
    features: [
      "100+ cashless hospitals",
      "No-Claim bonus up to 100% every year",
      "Free annual health checkup",
      "Alternative treatments included",
    ],
    coverAmount: "₹10 Lakh",
    coverAmountOptions: ["₹5 Lakh", "₹10 Lakh", "₹20 Lakh"],
    premium: "₹899/month",
    originalCost: "₹1050 incl. GST",
    discountText: "✓ ₹100 online exclusive discount",
    addons: ["Customize plan", "Add to compare"],
  },

  {
    company: "HDFC ERGO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/HDFC_ERGO.jpg/640px-HDFC_ERGO.jpg",
    planName: "Optima Secure",
    features: [
      "500+ cashless hospitals",
      "4x cover from day 1",
      "Emergency ambulance cover",
      "Alternative treatments included",
    ],
    coverAmount: "₹7 Lakh",
    coverAmountOptions: ["₹5 Lakh", "₹7 Lakh", "₹12 Lakh"],
    premium: "₹720/month",
    originalCost: "₹850 incl. GST",
    discountText: "✓ ₹130 online discount",
    addons: ["Customize plan", "Add to compare"],
  },

  {
    company: "Max Bupa Health",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Max_Bupa_logo.png/640px-Max_Bupa_logo.png",
    planName: "ReAssure 2.0",
    features: [
      "300+ cashless hospitals",
      "Unlimited reinstatement of cover",
      "Modern treatment coverage",
      "No mandatory pre-approval required",
    ],
    coverAmount: "₹15 Lakh",
    coverAmountOptions: ["₹10 Lakh", "₹15 Lakh", "₹25 Lakh"],
    premium: "₹1100/month",
    originalCost: "₹1280 incl. GST",
    discountText: "✓ ₹180 instant discount",
    addons: ["Customize plan", "Add to compare"],
  },

  {
    company: "Niva Bupa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Niva_Bupa_Logo.png/640px-Niva_Bupa_Logo.png",
    planName: "Health Companion",
    features: [
      "Cashless claims within 30 minutes",
      "Coverage for daycare procedures",
      "Organ donor expenses covered",
      "Annual health check-up",
    ],
    coverAmount: "₹8 Lakh",
    coverAmountOptions: ["₹5 Lakh", "₹8 Lakh", "₹12 Lakh"],
    premium: "₹780/month",
    originalCost: "₹930 incl. GST",
    discountText: "✓ ₹150 online discount",
    addons: ["Customize plan", "Add to compare"],
  },

  {
    company: "ICICI Lombard",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/ICICI_Lombard_logo.svg/640px-ICICI_Lombard_logo.svg.png",
    planName: "Complete Health Insurance",
    features: [
      "Worldwide emergency cover",
      "Maternity benefit available",
      "No room-rent restrictions",
      "Free annual checkups",
    ],
    coverAmount: "₹12 Lakh",
    coverAmountOptions: ["₹5 Lakh", "₹12 Lakh", "₹20 Lakh"],
    premium: "₹950/month",
    originalCost: "₹1180 incl. GST",
    discountText: "✓ ₹230 instant discount",
    addons: ["Customize plan", "Add to compare"],
  },

  {
    company: "SBI Health",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/SBI-logo.svg/640px-SBI-logo.svg.png",
    planName: "Arogya Supreme",
    features: [
      "500+ cashless hospitals",
      "OPD cover included",
      "Air ambulance cover",
      "Hospital cash benefit",
    ],
    coverAmount: "₹10 Lakh",
    coverAmountOptions: ["₹5 Lakh", "₹10 Lakh", "₹25 Lakh"],
    premium: "₹870/month",
    originalCost: "₹1020 incl. GST",
    discountText: "✓ Save ₹150 on online payment",
    addons: ["Customize plan", "Add to compare"],
  },

  {
    company: "Reliance Health",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Reliance_Health_Logo.png/640px-Reliance_Health_Logo.png",
    planName: "Reliance Health Infinity",
    features: [
      "Unlimited restoration",
      "Fitness reward points",
      "No medical checkup required",
      "Maternity and newborn cover",
    ],
    coverAmount: "₹20 Lakh",
    coverAmountOptions: ["₹10 Lakh", "₹20 Lakh", "₹30 Lakh"],
    premium: "₹1350/month",
    originalCost: "₹1580 incl. GST",
    discountText: "✓ Save ₹230 online",
    addons: ["Customize plan", "Add to compare"],
  },

  {
    company: "Aditya Birla Health",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Aditya_Birla_Group_Logo.svg/640px-Aditya_Birla_Group_Logo.svg.png",
    planName: "Activ Health Platinum",
    features: [
      "Earn rewards for healthy habits",
      "Chronic management program",
      "Worldwide emergency coverage",
      "No-claim bonus up to 200%",
    ],
    coverAmount: "₹25 Lakh",
    coverAmountOptions: ["₹10 Lakh", "₹25 Lakh", "₹50 Lakh"],
    premium: "₹1600/month",
    originalCost: "₹1850 incl. GST",
    discountText: "✓ Save ₹250 instantly",
    addons: ["Customize plan", "Add to compare"],
  },
];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Best Insurance Plans for You
          </h1>
          <p className="text-gray-600">
            Compare and choose the best insurance plan that fits your needs
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dummyPolicies.map((policy, index) => (
            <InsurancePlanCard key={index} policy={policy} />
          ))}
        </div>

        {/* Compare Button at bottom */}
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Compare Selected Plans
          </button>
        </div>
      </div>
    </div>
  );
}

export default PolicyList;