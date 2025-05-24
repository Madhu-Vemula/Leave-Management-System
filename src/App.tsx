import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { store } from "../src/store/store"
import "../src/styles/buttons.css"
import "../src/styles/form-container.css"
import "../src/styles/custom-model.css"
import "../src/styles/custom-table.css"
import "../src/styles/filter-container.css"
import "../src/styles/loader.css"
import "../src/styles/navbar.css"
import "../src/styles/profile.css"
import "../src/styles/employee.css"
import "../src/styles/login-form.css"
import "../src/styles/leave-history.css"
import "../src/styles/donut.css"
import "../src/styles/not-found.css"
import "../src/styles/main.css"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}

export default App;
