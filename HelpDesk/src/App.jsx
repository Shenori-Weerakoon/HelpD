import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateTicketPage from './pages/Customer/CreateTicketPage';
import ViewTicketsPage from './pages/ViewTicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import SupportEngineerDashboardPage from './pages/SupportEngineerDashboardPage';
import UpdateTicketPage from './pages/UpdateTicketPage';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SignUpPage from './pages/Admin/SignUp';
import LoginPage from './pages/Login';
import ManageUsers from './pages/Admin/ManageUsers';
import UserAccount from './pages/UserAccount';
import EntrancePage from './pages/EntrancePage';
import Dashboard from './pages/Admin/Dashboard';

import CustomerHomePage from './pages/Customer/CustomerHomePage';

import AdminViewTicketsPage from './pages/Admin/AdminViewTickets';

import SupportEngineerDashboard from './pages/SupportEngineer/SeDashboard';
import SupportEngineerViewTicketsPage from './pages/SupportEngineer/ViewAssignedTickets';


function App() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);


    return (
        <Router>
            <Routes>
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home"element={user ? <HomePage /> : <Navigate to="/login" />}/>
                <Route path="/create-ticket" element={<><CreateTicketPage /></>} />
                <Route path="/view-tickets" element={<><ViewTicketsPage /></>} />
                <Route path="/ticket/:id" element={<><TicketDetailsPage /></>} />
                <Route path="/admin-dashboard" element={<><AdminDashboardPage /></>} />
                <Route path="/manage-users" element={<><ManageUsers /></>} />
                <Route path="/engineer-dashboard" element={<><SupportEngineerDashboardPage /></>} />
                <Route path="/tickets/:id/edit" element={<><UpdateTicketPage /></>} />
                <Route path="/user-account" element={<><UserAccount /></>} />
                <Route path="/" element={<><EntrancePage /></>} />
                <Route path="/dashboard" element={<><Dashboard /></>} />

                <Route path="/customer-homepage" element={<><CustomerHomePage /></>} />

                <Route path="/admin-view-tickets" element={<><AdminViewTicketsPage /></>} />

                <Route path="/support-engineer-dashboard" element={<><SupportEngineerDashboard /></>} />
                <Route path="/assigned-tickets" element={<><SupportEngineerViewTicketsPage /></>} />

            </Routes>
        </Router>
    );
}

export default App;
