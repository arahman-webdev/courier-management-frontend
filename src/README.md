# SwiftParcel - Parcel Delivery System

Live Demo==> https://swiftparcelbd.netlify.app/

---

## Project Overview

SwiftParcel is a secure, role-based parcel delivery system that enables users to send and receive parcels efficiently. The system supports multiple user roles including **Sender**, **Receiver**, and **Admin**, each with tailored functionalities. Admins can manage parcels, confirm deliveries, update statuses, and block/unblock parcels, while users can track and manage their parcels.  

The system aims to provide a seamless, reliable, and user-friendly experience for managing parcel deliveries in real-time.

---

## Features

- Role-based access control: Admin, Sender, Receiver  
- Create, update, and track parcels  
- Confirm, cancel, or update parcel status  
- Block/unblock parcels  
- Server-side pagination and filters (status, active/blocked, date)  
- Search parcels by type and delivery address  
- Responsive and modern UI with TailwindCSS  

---

## Technology Stack

**Frontend:**  
- React.js (TypeScript)  
- Redux Toolkit & RTK Query  
- React Router DOM  
- TailwindCSS  
- Shadcn/UI components  
- SweetAlert2 for notifications  

**Backend (API integration):**  
- Node.js & Express  
- MongoDB  with mongoose
- JWT Authentication  
- Role-based access control  

**Deployment:**  
- Netlify: https://swiftparcelbd.netlify.app/ 

---

# Usage

Register or login as a Sender, Receiver, or Admin

Admins can manage parcels via the admin dashboard

Senders can create parcels and track their deliveries

Receivers can view incoming parcels and confirm receipt

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)  
- npm or yarn  

### Clone the repository
```bash
git clone https://github.com/arahman-webdev/courier-management-frontend.git


# Install dependencies

npm install
# or
yarn install

# Run Locally
npm run dev
bun dev
