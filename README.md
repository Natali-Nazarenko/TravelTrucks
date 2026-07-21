# TravelTrucks — Campervan Rental Service

An e-commerce web application for discovering and booking campervans (campers). This project is
designed to help users browse available trucks, view detailed descriptions, features, and reviews,
filter results based on specific equipment and location, and instantly book a vehicle.

## 🚀 Live Demo

[Open Live Demo](https://travel-trucks-omega-drab.vercel.app/)

## 🛠️ Tech Stack & Features

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management & Data Fetching:** TanStack Query (`useInfiniteQuery` & `useMutation`)
- **Form Handling & Validation:** Formik + Yup
- **Styling:** CSS Modules + Flexbox layout
- **HTTP Client:** Axios

### Core Features Implemented:

- **Dynamic Camper Catalog:** Displays vehicle list fetched from a remote API.
- **Smooth Infinite Scrolling:** Efficiently loads campers in chunks of 4 items using a React-free,
  high-performance CSS animation (`@keyframes`) for smooth fade-in effects.
- **Detailed Camper View:** Users can click "Show more" to open detailed specs, equipment details,
  and reviews in a separate browser tab.
- **Booking System:** A robust client-validated booking form with real-time UI states (locks inputs
  and changes button styles to a disabled "Booked ✔" state upon success).

## 💻 Getting Started

Follow these steps to run the application locally in development mode:

### 1. Clone the repository

```bash
git clone https://github.com/Natali-Nazarenko/TravelTrucks
cd travel-trucks-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables (Optional)

```env
NEXT_PUBLIC_API_BASE_URL=https://campers-api.goit.study
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/app` — Next.js routing and page definitions (`/catalog`, `/catalog/[id]`).
- `/components` — Reusable UI modules (`CamperFilters`, `CamperList`, `BookingSection`, etc).
- `/types` — TypeScript interfaces (`camper.ts`, `booking.ts`, `filters.ts`, `review.ts`).
- `/lib` — API service module (`api.ts`) containing Axios configuration and server request
  functions.
