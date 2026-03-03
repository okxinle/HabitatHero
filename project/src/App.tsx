import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LandingPageWrapper } from './components/LandingPageWrapper';
import { LoginPageWrapper } from './components/LoginPageWrapper';
import { QuizPage } from './components/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPageWrapper />} />
          <Route path="/login" element={<LoginPageWrapper />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
