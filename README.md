# 🍔 BiteNow — Full-Stack Food Ordering Platform

BiteNow is a modern, full-stack food-ordering application built with **Next.js 16 (App Router)**, **React 19**, **MongoDB (Mongoose)**, and **Tailwind CSS**. 

The platform supports customer restaurant discovery, food ordering, and real-time order tracking, along with a dedicated management portal for restaurant owners.

---

## 🌟 Key Features & Improvements

### 🔐 Security & Authentication (Phase 2 & 3)
- **Bcrypt Password Hashing**: Passwords for users and restaurant owners are automatically hashed with bcrypt (`saltRounds: 12`) before persistence using Mongoose pre-save middleware hooks.
- **JWT Authorization**: Stateless JSON Web Tokens generated on login/signup, protecting server-side API routes (`/api/orders`, `/api/restuarant/foods`, etc.).
- **Dual Content-Type API handling**: Corrected restaurant login endpoints to accept both `application/json` and `multipart/form-data`.
- **Sensitive Data Redaction**: Automatic password field exclusion via `toJSON()` schemas and Mongoose `.select('-password')` projections.
- **ReDoS & Injection Protection**: User search inputs sanitized with regex escaping before MongoDB query execution.

### 🛍️ Cart & Server-Validated Order System (Phase 4 & 5)
- **Real Order Persistence**: Orders are saved directly to MongoDB with embedded snapshots of items, quantities, and prices.
- **Server-Side Price Calculation**: Order totals are calculated on the server using trusted database prices, preventing client-side price tampering.
- **Single-Restaurant Cart Enforcement**: Prevents mixing food items from multiple restaurants in a single order.
- **Order Lifecycle Management**: Enforces strict valid status transitions (`placed` ➔ `confirmed` ➔ `preparing` ➔ `out_for_delivery` ➔ `delivered` | `cancelled`).
- **Customer Order Tracking**: Real-time order status tracking and cancellation functionality for pending orders.

### 🎨 Frontend & UX (Phase 6 & 9)
- **Fixed Runtime Crashes**: Resolved undefined state updates on the explore page.
- **Cart Quantities**: Added interactive item quantity controls (+/−) with subtotal and item count calculations.
- **Form Feedback**: Replaced modal `alert()` popups with inline error and loading state indicators.
- **Clean Layout Hierarchy**: Fixed nested `<html><body>` tags in authentication layouts to resolve Next.js SSR hydration warnings.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.8 (App Router, Turbopack)
- **Frontend**: React 19.2.1, Tailwind CSS 4, Lucide Icons, Framer Motion, GSAP
- **Database**: MongoDB Atlas via Mongoose 9.0
- **Storage**: Cloudinary (Image upload & optimization)
- **Security**: bcryptjs, jsonwebtoken
- **Testing**: Node.js Native Test Runner (`node --test`)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v20.0+ or v22.0+
- npm or yarn

### 2. Environment Setup
Create a `.env.local` file in the root directory (refer to `.env.example`):

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/biteDB?appName=food
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret_key
```

### 3. Installation
```bash
npm install
```

### 4. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

Run the automated test suite powered by the Node.js native test runner:

```bash
npm test
```

### Verified Test Scenarios:
- Password hashing & verification via `bcryptjs`
- JWT token generation, verification, and tampering rejection
- Server-side order total & delivery fee calculations
- Order status lifecycle transition state matrix

---

## 📦 Production Build

To test and compile the production bundle:

```bash
npx next build
```

---

## 📂 Project Architecture Overview

```
├── app/
│   ├── _components/       # Customer UI components (Header, Navbar, Footer, Auth)
│   ├── allrestuarants/    # Restaurant directory listing page
│   ├── api/               # Serverless REST API endpoints
│   │   ├── foods/         # Food search API
│   │   ├── orders/        # Order placement & status lifecycle APIs
│   │   ├── restuarant/    # Restaurant owner & food management APIs
│   │   └── users/         # Customer auth APIs
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout & delivery details page
│   ├── explore/[name]/    # Individual restaurant menu page
│   ├── lib/               # Database connection, auth middleware & Mongoose models
│   ├── orders/            # Customer order history & status tracking page
│   ├── restuarant/        # Restaurant dashboard & food management portal
│   └── user-auth/         # Customer login & registration pages
├── tests/                 # Node.js native automated test suites
├── .env.example           # Environment template file
└── README.md              # Project documentation
```

---

## 📄 License
MIT License.