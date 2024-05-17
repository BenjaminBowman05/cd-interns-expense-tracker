import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseRequestForm from "./components/Forms/ExpenseRequestForm";
import HomePage from "./components/HomePage";
import EntryPoint from "./components/Entry/EntryPoint";
import MyContext from "./FireBase/MyContext";
import { useCookies } from "react-cookie";

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
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </>
  );
};

export default Sandbox;
