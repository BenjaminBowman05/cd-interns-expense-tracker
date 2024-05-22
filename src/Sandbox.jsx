import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseRequestForm from "./components/Forms/ExpenseRequestForm";
import HomePage from "./components/HomePage";
import EntryPoint from "./components/EntryPoint";
import MyContext from "./utils/MyContext";
import Profile from "./components/Profile";
import { useCookies } from "react-cookie";
import Archived from "./components/Tables/Archived";

const Sandbox = () => {
  const [cookies, setCookies] = useCookies();
  return (
    <>
      <MyContext.Provider value={{ cookies, setCookies }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<EntryPoint />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/request" element={<ExpenseRequestForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/archive" element={<Archived />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </>
  );
};

export default Sandbox;
