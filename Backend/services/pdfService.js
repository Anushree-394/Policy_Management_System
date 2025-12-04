const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generate Policy Certificate PDF
 * @param {Object} data - Policy data (userName, vehicleModel, policyNumber, premium, startDate, endDate)
 * @returns {Promise<string>} - URL path of the generated PDF
 */
const generatePolicyPDF = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const fileName = `policy-${data.policyNumber}.pdf`;
            const uploadDir = path.join(__dirname, '../uploads/policies');

            // Ensure directory exists
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, fileName);
            const writeStream = fs.createWriteStream(filePath);

            doc.pipe(writeStream);

            // --- PDF Content ---

            // Header
            doc.fontSize(25).text('Insurance Certificate', { align: 'center' });
            doc.moveDown();

            // Company Name (Placeholder)
            doc.fontSize(12).text('SecureLife Insurance Co.', { align: 'center' });
            doc.moveDown();
            doc.moveDown();

            // Policy Details
            doc.fontSize(14).text('Policy Details', { underline: true });
            doc.moveDown();

            const addField = (label, value) => {
                doc.fontSize(12).font('Helvetica-Bold').text(`${label}: `, { continued: true });
                doc.font('Helvetica').text(value);
                doc.moveDown(0.5);
            };

            addField('Policy Number', data.policyNumber);
            addField('Policy Holder', data.userName);
            addField('Vehicle Model', data.vehicleModel);
            addField('Vehicle Year', data.vehicleYear);
            addField('IDV', `INR ${data.idv}`);
            addField('Premium Amount', `INR ${data.premium}`);
            addField('Start Date', data.startDate);
            addField('End Date', data.endDate);

            doc.moveDown();
            doc.moveDown();

            // Footer / Verification
            doc.fontSize(10).text('This is a computer-generated document. No signature is required.', { align: 'center' });

            // Mock QR Code (Just a rectangle for now, or actual QR if library added)
            doc.rect(doc.page.width / 2 - 50, doc.y + 20, 100, 100).stroke();
            doc.text('Scan to Verify', doc.page.width / 2 - 35, doc.y + 130);

            doc.end();

            writeStream.on('finish', () => {
                // Return the public URL path
                resolve(`/uploads/policies/${fileName}`);
            });

            writeStream.on('error', (err) => {
                reject(err);
            });

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    generatePolicyPDF
};
