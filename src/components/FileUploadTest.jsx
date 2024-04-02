import Form from "react-bootstrap/Form";

const FileUploadTest = () => {
  const validateFile = () => {
    var fileInput = document.getElementById("file");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
      /(\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }
    return true;
  };

  const handleFileSelect = (event) => {
    let valid = validateFile();
    var isPdf = /(\.pdf)$/i;
    var fileInput = document.getElementById("file");
    var filePath = fileInput.value;
    document.getElementById("fileContent").textContent = "";

    if (valid && !isPdf.exec(filePath)) {
      const reader = new FileReader();
      reader.onload = handleFileLoad;
      reader.readAsText(event.target.files[0]);
    }
  };

  const handleFileLoad = (event) => {
    console.log(event);
    document.getElementById("fileContent").textContent = event.target.result;
  };

  return (
    <div >
      <Form.Control
        onChange={handleFileSelect}
        accept=".pdf, .txt, .doc, .docx"
        id="file"
        as="input"
        type="file"
      ></Form.Control>
      <p id="fileContent"></p>
    </div>
  );
};

export default FileUploadTest;
