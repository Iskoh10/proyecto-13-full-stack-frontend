import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Workshops from './pages/Workshops/Workshops';
import Products from './pages/Products/Products';
import Blog from './pages/Blog/Blog';
import NotFound from './pages/NotFound/NotFound';
import Form from './pages/Forms/Form';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/workshops' element={<Workshops />} />
          <Route path='/blog' element={<Blog />} />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Form />
              </PublicRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='/payment-success' element={<PaymentSuccess />} />
        </Route>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute requiredRole='admin'>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
