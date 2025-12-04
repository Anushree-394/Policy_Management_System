const express = require('express');
const router = express.Router();
const { calculatePremium } = require('../services/premiumService');

// POST /api/calculate-premium
router.post('/calculate-premium', (req, res) => {
    try {
        const { vehicleModel, vehicleYear, idv } = req.body;

        // Convert types if necessary (e.g., string to number)
        const year = parseInt(vehicleYear);
        const insuredValue = parseFloat(idv);

        const premium = calculatePremium(vehicleModel, year, insuredValue);

        res.json({
            success: true,
            data: {
                vehicleModel,
                vehicleYear: year,
                idv: insuredValue,
                premium: premium,
                currency: "INR"
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
