import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUploadTest from "./components/FileUploadTest";
import PurchaseTracker from "./components/PurchaseTracker";
import ExpenseRequestForm from "./components/ExpenseRequestForm";
import HomePage from "./components/HomePage";
import Home from "./components/EntryScreen";
import MyContext from "./utils/MyContext";
import { useCookies } from "react-cookie";
const Sandbox = () => {
  const [cookies, setCookies] = useCookies();
  return (
    <>
      <MyContext.Provider value={{ cookies, setCookies }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/logged-in" element={<HomePage />} />
            <Route path="/request" element={<ExpenseRequestForm />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </>
  );
};

export default Sandbox;
