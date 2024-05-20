import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUploadTest from "./components/FileUploadTest";
import PurchaseTracker from "./components/PurchaseTracker";
import ExpenseRequestForm from "./components/ExpenseRequestForm";
import HomePage from "./components/HomePage";
import EntryPoint from "./components/EntryPoint";
import MyContext from "./utils/MyContext";
import Profile from "./components/Profile";
import { useCookies } from "react-cookie";

const Sandbox = () => {
  const [cookies, setCookies] = useCookies();
  return (
    <>
      <MyContext.Provider value={{ cookies, setCookies }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<EntryPoint />} />
            <Route path="/logged-in" element={<HomePage />} />
            <Route path="/request" element={<ExpenseRequestForm />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </>
  );
};

export default Sandbox;
