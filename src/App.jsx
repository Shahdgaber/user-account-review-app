
import { Routes, Route } from 'react-router-dom';
import AccountPage from './pages/AccountPage';
import ReviewPage from './pages/ReviewPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AccountPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
    </Routes>
  );
}

export default App;
