# SwiftParcel - Parcel Delivery System
Live Demo: https://swiftparcelbd.netlify.app/

---

## Project Overview

SwiftParcel is a secure, role-based parcel delivery system designed to streamline the shipping process for both senders and receivers. Admins have comprehensive control, managing parcels, updating statuses, and ensuring smooth operations, while users can efficiently track and manage their deliveries in real-time. This system prioritizes a seamless, reliable, and user-friendly experience, with tailored functionalities for each user role: Sender, Receiver, and Admin.

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


# Getting Started
To explore the live demo, use the provided credentials to log in as an Admin, Sender, or Receiver.

# Credentials
Admin:

Email: admin@email.com

Password: admin_password

Sender:

Email: sender@gmail.com

Password: 123456A2a$

Receiver:

Email: receiver@gmail.com

Password: 123456A2a$

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

cd courier-management-frontend


# Install dependencies

npm install
# or
yarn install

# Run Locally
npm run dev
bun dev
