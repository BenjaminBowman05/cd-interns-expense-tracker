import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { render } from "react-dom";

const ShowReceipt = ({ show, close, data }) => {
  let idx = 0;
  let numOfReceipts = data.receipts.length - 1;

  const handleClick = (e) => {
    console.log("NUM OF REC");
    console.log(numOfReceipts);
    let prevBtn = document.getElementById("prev");
    let nextBtn = document.getElementById("next");

    if (numOfReceipts == 0) {
      nextBtn.hidden = true;
      prevBtn.hidden = true;
      return;
    }

    if (e.target.id == "next") {
      if (idx != numOfReceipts) {
        nextBtn.hidden = false;
        prevBtn.hidden = false;
        idx += 1;
      }

      if (idx == numOfReceipts) {
        nextBtn.hidden = true;
      }
    }

    if (e.target.id == "prev") {
      if (idx != 0) {
        prevBtn.hidden = false;
        nextBtn.hidden = false;
        idx -= 1;
      }

      if (idx == 0) {
        prevBtn.hidden = true;
      }
    }
    console.log("INDEXXX");
    console.log(idx);
    document.getElementById("iframe").setAttribute("src", data.receipts[idx]); // update src with the current receipt
    document.getElementById("receiptsTracker").innerHTML = `${idx + 1}/${
      numOfReceipts + 1
    }`;
  };

  return (
    <Modal id="modal" size="lg" show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modal-body" className="d-flex justify-content-center">
        <embed
          id="iframe"
          src={data.receipts[0]} // inital state of receipt
          width="500px"
          height="500px"
        ></embed>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {numOfReceipts !== 0 ? (
          <div>
            <p id="receiptsTracker">
              {idx + 1}/{numOfReceipts + 1}
            </p>
            <Button
              id="prev"
              className="me-2"
              variant="outline-info"
              onClick={(e) => handleClick(e)}
              hidden
            >
              {"<"}
            </Button>
            <Button
              id="next"
              variant="outline-info"
              onClick={(e) => handleClick(e)}
            >
              {">"}
            </Button>
          </div>
        ) : (
          ""
        )}
        {/* <Button variant="outline-danger" onClick={close}>
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ShowReceipt;
