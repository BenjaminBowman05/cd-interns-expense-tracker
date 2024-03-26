import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PurchaseRequestForm = () => {
  return (
    <>
      <FloatingLabel controlId="floatingInput" label="First Name">
        <Form.Control type="firstName" placeholder="John" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Last Name">
        <Form.Control type="lastName" placeholder="Doe" />
      </FloatingLabel>
    </>
  );
};

export default PurchaseRequestForm;
