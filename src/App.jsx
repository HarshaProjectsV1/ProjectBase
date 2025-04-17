import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AppContextProvider } from "./context/appContext";
import Login from "./components/login/login";
import Chat from "./components/chat/chat";
import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
