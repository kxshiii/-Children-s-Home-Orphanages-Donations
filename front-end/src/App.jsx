import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Reagan will add actual pages — use placeholders for now
const HomePage = () => <div className="p-4">Home Page</div>;
const LoginPage = () => <div className="p-4">Login Page</div>;

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}