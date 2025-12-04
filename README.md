🛡 Insurance Policy Management System

A modern, end-to-end digital platform that automates the lifecycle of insurance policies — from purchase to renewals and claims settlement. Built for transparency, speed, and operational efficiency.

👥 Team Members

Anushree – Frontend Developer (Customer Dashboard, Policy Purchase UI)

Khushi – Backend Developer (Policy APIs, Premium Engine)

Shubh – Database Architect (ERD, Schema Design, Data Integrity)

Ankit – Workflow & Automation Engineer (Claims Engine + State Machine)

Samman – DevOps & Cloud (S3 Storage, Deployment, Security Config)

🔄 Team Workflow

A collaborative workflow designed to ensure parallel development and smooth integration:

1️⃣ Ideation & Requirements (All Members)

Finalized modules: Policy Purchase, Premium Engine, Claims, Admin Panel

Agreed on tech stack & architecture

Defined user roles and end-to-end flows

2️⃣ UI/UX + Frontend Development (Anushree)

Designed responsive screens for:

Policy browsing & comparison

Premium calculator

Purchase flow (Proposal → KYC → Payment)

Customer Dashboard & Claims form

Integrated APIs using Axios / Fetch

3️⃣ Backend & Logic Implementation (Khushi)

Built REST APIs for:

User auth

Policy creation

Premium calculation

Claims workflow

Implemented validation + error handling

4️⃣ Database & Schemas (Shubh)

Designed relational schema:

Users, Products, Policies

Claims, Payments, Documents

Ensured foreign key constraints & clean normalization

Maintained ER Diagram + migrations

5️⃣ Claims Workflow Engine (Ankit)

Developed the state machine:

SUBMITTED → VERIFIED → APPROVED/REJECTED → SETTLED


Added audit logging on each state change

Automated triggers for settlement

6️⃣ Cloud, Storage & Deployment (Samman)

Integrated KYC + claim documents upload to AWS S3

Implemented secure access policies

Set up project deployment (Docker / Cloud VM / Build pipelines)

7️⃣ Integration + Testing (Whole Team)

API + Frontend integration

End-to-end user flow testing

Fixes, performance tuning, documentation

🔍 1. Problem Statement

Traditional insurance processes rely heavily on manual operations, causing:

Customer Pain Points

Hard-to-understand policy terms

Slow & complex purchase journey

Delayed issuance

Complicated claims process

Insurer Pain Points

High operational overhead

Manual verification workload

Inefficiencies due to legacy systems

🎯 2. Objective

Build a robust platform enabling:

Smooth policy exploration & purchase

Automated premium computation

Transparent claims handling

Efficient back-office operations for admins & underwriters

👥 3. User Roles & Features
👤 Policyholder (Customer)

Browse & compare insurance products

Use premium calculator (age, car model, coverage, etc.)

Complete proposal → upload KYC → payment

Auto-generated PDF policy

Dashboard:

View & download policies

Renewal notifications

File claims with documents

🛠 Underwriter / Admin

Review proposals & KYC documents

Risk assessment → approve/reject

Manage plans & pricing

Analytics dashboard (claims ratio, revenue, active policies)

📄 Claims Adjuster

Review submitted claims

Evaluate images/reports

Update status

Initiate payouts

⚙ 4. Core Features
🔹 Functional Requirements
✅ Dynamic Premium Engine

Rule-based premium calculation
Example (Vehicle):
Premium = BaseRate + (VehicleAge × RiskFactor) + IDV × 0.02

✅ Automated PDF Generation

Policy certificate

Unique policy number

QR code embedded

✅ Claims Workflow Engine

State transitions controlled by a ruleset

✅ Renewal System

Auto reminders (SMS/Email)

Grace period logic

✅ KYC Upload & Secure Storage

Aadhaar / PAN / DL

Stored in S3 / Azure Blob securely

🔹 Non-Functional Requirements
🔐 Security

Encryption of sensitive customer data

Secure payment gateway integration

Role-based access control

📝 Audit Trail

Tracks every action for compliance

✔ Data Integrity

Prevents invalid actions (ex: filing claim on expired policy)

🏗 5. Tech Stack
Frontend

React.js / Angular

Tailwind / Material UI

Backend

Spring Boot (Java) / Django (Python) / .NET Core

Database

PostgreSQL / MySQL

Storage

AWS S3 / Azure Blob

PDF Generation

jsPDF / iText / ReportLab
