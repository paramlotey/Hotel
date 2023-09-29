import axios from "axios";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homescreen from "./Screens/Homescreen";
import Bookingscreen from "./Screens/Bookingscreen";
import Loginscreen from "./Screens/Loginscreen";
import Registerscreen from "./Screens/RegisterScreen";

axios.defaults.baseURL = "http://localhost:3000";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:roomid" element={<Bookingscreen />} />
          <Route path="/login" element={<Loginscreen/>} />
          <Route path="/register" element={<Registerscreen/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
