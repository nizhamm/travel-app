import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Header from "./components/home/header";
import Aboutus from "./components/home/about-us";
import Footer from "./components/home/footer";
import Contactus from "./components/home/contact-us";
import Roompayment from "./components/pages/room-payment";
import Signin from "./components/home/sign-in";
import OrderPlaced from "./components/pages/order-placed";

function App() {
  return (
    <div className="App">
      <header>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/payment" element={<Roompayment />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/success" element={<OrderPlaced />} />
          </Routes>
        </Router>
      </header>
      <Footer />
    </div>
  );
}

export default App;
