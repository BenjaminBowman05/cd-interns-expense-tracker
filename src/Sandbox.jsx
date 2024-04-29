import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUploadTest from "./components/FileUploadTest";
import PurchaseTracker from "./components/PurchaseTracker";
import ExpenseRequestForm from "./components/ExpenseRequestForm";
import HomePage from "./components/HomePage";

const Sandbox = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<HomePage />} />
        <Route path="/request" element ={<ExpenseRequestForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Sandbox;
