# Tutor Tracker

A modern, responsive React application for private tutors to track attendance, calculate earnings, and manage monthly teaching cycles.

![Tutor Tracker Screenshot](https://via.placeholder.com/800x400?text=Tutor+Tracker+Preview) 
*(Note: Replace with actual screenshot after running)*

## Features

- **Calendar View**: Visual grid layout to track monthly attendance.
- **Strict Attendance Rules**:
  - Restricts "Check-in" to the **current date only**.
  - Prevents accidental changes to past records.
- **Master Unlock**: Admin feature to modify past/future records using a secure password.
- **Salary Tracking**:
  - Set a **Target Salary** (e.g., 80,000 BDT).
  - Automatically calculates **Rate Per Class** based on a 16-day cycle (or manual input).
  - Visual progress of earnings.
- **Responsive Design**: optimized for mobile and desktop using **Tailwind CSS**.
- **Dark Mode**: sleek dark interface for comfortable viewing.
- **Local Persistence**: Data is saved automatically to the browser's Local Storage.

## Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **Lucide React** (Icons)

## Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/AbuBakar223200/Tutor-Tracker.git
    cd Tutor-Tracker
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    - Create a `.env.local` file in the root directory.
    - Add your Admin Password:
      ```env
      VITE_MASTER_PASSWORD=your_secure_password
      ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

## Usage Guide

- **Mark Attendance**: Click "Mark Today" on the current date to log a class.
- **Admin Mode**: Toggle the switch at the bottom to hide/show admin controls.
- **Edit Rate**: Update the "Rate/Class" input to change your earnings calculation.
- **Reset Cycle**: Clear all data for a new month using the "Reset Cycle" button (requires Admin).

## Privacy Note
This project uses `.gitignore` to exclude local environment files (`.env.local`) and `node_modules` from the repository to protect your private configuration and dependencies.

## Contact
**Abu Bakar**  
📞 +880 1521-703968  
📧 abubakarmunshi786@gmail.com
