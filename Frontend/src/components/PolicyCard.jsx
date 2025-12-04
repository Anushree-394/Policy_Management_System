import React from "react";
import { Check, Star, Shield, Heart, ChevronRight } from "lucide-react";

function InsurancePlanCard({ policy }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      
      {/* Card Header - Company & Plan */}
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <img
                src={policy.logo}
                alt={policy.company}
                className="h-6 object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{policy.planName}</h3>
              <p className="text-sm text-gray-600">{policy.company}</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
            About Insurer <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Features List */}
      <div className="p-5 flex-grow">
        <div className="space-y-3">
          {policy.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5">
                {index === 0 ? (
                  <Shield className="text-green-600" size={18} />
                ) : index === 1 ? (
                  <Heart className="text-blue-600" size={18} />
                ) : index === 2 ? (
                  <Star className="text-amber-500" size={18} />
                ) : (
                  <Check className="text-green-500" size={18} />
                )}
              </div>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Cover Amount Selection */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-gray-700 font-medium mb-3">Cover amount</p>
          <div className="flex gap-2">
            {policy.coverAmountOptions.map((amount, index) => (
              <button
                key={index}
                className={`flex-1 py-2 text-sm font-medium rounded-lg border ${
                  amount === policy.coverAmount
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Premium Section */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-gray-700 font-medium mb-2">Premium (1 year)</p>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{policy.premium}</span>
            <span className="ml-2 text-gray-500">/month</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500 line-through">{policy.originalCost}</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Save {policy.discountText.split('₹')[1]}
            </span>
          </div>
        </div>

        {/* Addons */}
        <div className="mt-4 space-y-2">
          {policy.addons.map((addon, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="text-green-500" size={16} />
              <span className="text-sm text-gray-700">{addon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 border-t border-gray-100 bg-gray-50">
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all text-sm shadow-sm hover:shadow-md">
            Buy Now
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 rounded-lg border border-blue-600 transition-all text-sm">
            Customize plan ›
          </button>
        </div>
        
        {/* Add to Compare */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-10 h-5 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition-all"></div>
            <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-5 shadow-sm"></div>
          </label>
          <span className="text-sm text-gray-700">Add to compare</span>
        </div>
      </div>
    </div>
  );
}

export default InsurancePlanCard;