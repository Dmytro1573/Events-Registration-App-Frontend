import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../../src/pages/HomePage/HomePage";
import EventsBoardPage from "../../../src/pages/EventsBoardPage/EventsBoardPage";
import EventRegistrationForm from "../EventRegistrationForm/EventRegistrationForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Головна сторінка */}
        <Route path="/" element={<HomePage />} />

        {/* Сторінка Events Board Page */}
        <Route path="/events" element={<EventsBoardPage />} />
        <Route path="/events/register" element={<EventRegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
