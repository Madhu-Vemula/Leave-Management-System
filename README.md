# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
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
- `npm run dev`   
# Backend Json Server
- `npm run server` 
# Note that the development build is not optimized.
- To create a production build, use `npm run build`.

# 🧪 Future Enhancements
- ✅ **Toast notifications for actions (leave apply, update, reject)**
- 📥 **Pagination and sorting in employee list**
- 🛂 **Admin/HR view with broader access**
- 📌 **Form feedback onBlur and inline hints**
- 📆 **Calendar view for managers**
- 📬 **Email notifications (mock or real)**