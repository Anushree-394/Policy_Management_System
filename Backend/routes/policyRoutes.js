const express = require('express');
const router = express.Router();
const { generatePolicyPDF } = require('../services/pdfService');
const { calculatePremium } = require('../services/premiumService');

// POST /api/create-policy (Mocking Member 1's route)
router.post('/create-policy', async (req, res) => {
    try {
        const { userName, vehicleModel, vehicleYear, idv } = req.body;

        // 1. Calculate Premium (Re-using logic)
        const premium = calculatePremium(vehicleModel, parseInt(vehicleYear), parseFloat(idv));

        // 2. Generate Policy Number (Mock)
        const policyNumber = 'POL-' + Date.now();
        const startDate = new Date().toISOString().split('T')[0];
        const endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];

        // 3. Generate PDF
        const pdfPath = await generatePolicyPDF({
            userName,
            vehicleModel,
            vehicleYear,
            idv,
            premium,
            policyNumber,
            startDate,
            endDate
        });

        // 4. Return Response (In real app, save to DB here)
        res.json({
            success: true,
            message: 'Policy created successfully',
            data: {
                policyNumber,
                premium,
                pdfUrl: pdfPath // This is the URL to access the generated PDF
            }
        });

    } catch (error) {
        console.error("Policy Creation Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
