import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuctionDetailPage from "./pages/AuctionDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateAuctionPage from "./pages/CreateAuction";
import { AuthProvider } from "./context/authContext";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import NotificationPage from "./pages/NotificationPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route
                path="/auctions/:auctionId"
                element={<AuctionDetailPage />}
              />
              <Route path="/auctions/new" element={<CreateAuctionPage />} />
              <Route
                path="/auctions/update/:auctionId"
                element={<CreateAuctionPage />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
