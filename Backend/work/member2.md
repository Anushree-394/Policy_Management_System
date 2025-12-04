# Member 2 (Backend Specialist) - Work Log

## Responsibilities
- **Premium Calculation Engine**: Logic to calculate insurance premiums.
- **File Upload System**: Middleware to handle KYC and Claim document uploads.
- **PDF Generation Service**: Service to generate Policy Certificates.

## Implementation Details

### Premium Service
- **File**: `services/premiumService.js`
- **Logic**: Base Rate (2% of IDV) + Age Factor (>5 yrs) + Luxury Factor (SUV/Luxury).

### File Uploads
- **File**: `middleware/uploadMiddleware.js`
- **Storage**: Local `/uploads` folder.
- **Naming**: Timestamp-based renaming to avoid conflicts.

### PDF Service
- **File**: `services/pdfService.js`
- **Library**: `pdfkit`
- **Output**: Saves to `/uploads/policies/` and returns the URL.

## API Endpoints Created
- `POST /api/calculate-premium`: Calculate premium amount.
- `POST /api/upload`: Upload a single file.
- `POST /api/create-policy`: Create a policy and generate PDF (Mock).

## Notes for Team
- **Member 1**: You can import `uploadMiddleware` from `../middleware/uploadMiddleware` and `generatePolicyPDF` from `../services/pdfService` to use in your main routes.
- **Frontend**: Use the `/api/calculate-premium` endpoint to show real-time price updates.
