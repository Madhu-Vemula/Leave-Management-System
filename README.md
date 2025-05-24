# 🗂️ Employee Leave Management System

A complete web application built with **React + TypeScript**, **Redux Toolkit**, and **RTK Query** for managing employee leaves in an organization. The system allows employees to apply for leaves and managers to approve or reject them. It uses **JSON Server** as a mock backend.

---

## 📌 Features

- ✅ **Employee & Manager Authentication**
- 📄 **Leave Application** with validation
- 👨‍💼 **Manager View** to approve/reject leaves
- 📊 **Leave Balance** tracking (Paid / Unpaid)
- 🔄 **Real-time updates** using RTK Query cache
- 🎯 **Role-Based Views** and conditional UI rendering
- 📆 Prevents overlapping leave requests
- 🔍 Filters for leave type/status

---

## 🧱 Project Structure
src/
├── components/ # Reusable UI components
├── features/
│ ├── employee/ # Employee-related state & UI
│ ├── leave/ # Leave-related state & UI
│ └── dashboard/ # Manager-specific functionality
├── services/ # RTK Query APIs
├── store/ # Redux configuration and root reducer
├── utils/ # Utility functions (validation, formatting)
├── Types.ts # Global types/interfaces
├── App.tsx # Main routing and component entry point

---

## 📝 Key Component: `EmployeeForm.tsx`

This form is used for both adding and editing employee details.

### 🔐 Validations:
- Employee ID & Email must be **unique**
- Emails must contain `@pal.tech`
- Passwords must be at least **6 characters**
- Employee must be assigned a **valid manager**
- Role determines conditional rendering (e.g. Manager dropdown shown only for Employees)

### ⚙️ API Integration:
- Uses `useAddEmployeeMutation`, `useUpdateEmployeeMutation` from RTK Query
- Fetches managers using `useGetAllManagersQuery`

---

## 🛠️ Utilities

Located in `utils/employeeUtils.ts` and `utils/leaveUtils.ts`.

### Employee Utilities:
- `checkDuplicateEmployeeIds`: Prevents duplicate employee IDs
- `checkDuplicateEmployeeEMails`: Prevents duplicate emails

### Leave Utilities:
- `calculateLeaveTypes`: Summarizes paid/unpaid leave totals
- `checkDuplicatedLeaves`: Prevents overlapping leave dates
- `compareUpdatedData`: Checks if form values have changed
- `convertFirstLetterToUpperCase/LowerCase`: Case formatting

---

## 🔧 Configuration & Scripts

### 📦 Prerequisites

- Node.js >= 14.x
- npm or yarn

### 📁 Install Dependencies
1. Clone the repository 
2. Install 
`npm install`
# or
`yarn install`


## ▶️ Run the App

To start the frontend application:
# Frontend
- `npm start`   
# backend Json Server
- `npm run server` 
# Note that the development build is not optimized.
# To create a production build, use `npm run build`.

# 🧪 Future Enhancements
- ✅ **Toast notifications for actions (leave apply, update, reject)**

# 📥** Pagination and sorting in employee list**

# 🛂 ** Admin/HR view with broader access**

# 📌 Form feedback onBlur and inline hints

# 📆 Calendar view for managers

# 📬 Email notifications (mock or real) 