import './App.css';
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Reservations from "./pages/Reservations";
import Posts from "./pages/Posts";
import About from "./pages/About";
import AddPost from "./pages/AddPost";
import AddReservation from "./pages/AddReservation"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Services from "./pages/Services"
import Pricing from "./pages/Pricing"

function App() {
    const { token } = useContext(AuthContext);

    return (
        <Router>
            {/* Appbar is now inside the Router to be part of routing */}
            <Appbar />
            <Footer />

            {/* Define your routes */}
            <Routes>
                <Route path="/posts" element={<Posts token = {token}/>} />
                <Route path="/" element={<About />} />
                <Route path="/reservations" element={<Reservations token={token} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/services" element={<Services/>} />
                <Route path="/pricing" element={<Pricing/>} />
                <Route path="/posts/add-post" element={<AddPost token={token} />} />
                <Route path="/posts/edit/:postId" element={<AddPost token={token} />} />
                <Route path="/reservations/add" element={<AddReservation token={token} />} />
                <Route path="/reservations/edit/:id" element={<AddReservation token={token} />} />
            </Routes>
        </Router>
    );
}

export default App;
