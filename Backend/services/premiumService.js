/**
 * Premium Calculation Service
 * 
 * Logic:
 * - Base Rate: 2% of IDV
 * - Age Factor: +5000 INR if age > 5 years
 * - Luxury Factor: *1.2 multiplier if model contains "SUV" or "Luxury"
 */

const calculatePremium = (vehicleModel, vehicleYear, idv) => {
    // 1. Validate Inputs
    if (!vehicleModel || !vehicleYear || !idv) {
        throw new Error("Missing required fields: vehicleModel, vehicleYear, idv");
    }

    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - vehicleYear;
    let premium = 0;

    // 2. Base Rate: 2% of IDV
    const baseRate = 0.02;
    premium = idv * baseRate;

    // 3. Age Factor
    if (vehicleAge > 5) {
        premium += 5000;
    }

    // 4. Luxury Factor
    const luxuryKeywords = ["SUV", "Luxury", "Mercedes", "BMW", "Audi"];
    const isLuxury = luxuryKeywords.some(keyword => 
        vehicleModel.toLowerCase().includes(keyword.toLowerCase())
    );

    if (isLuxury) {
        premium *= 1.2;
    }

    // Return rounded value
    return Math.round(premium);
};

module.exports = {
    calculatePremium
};
