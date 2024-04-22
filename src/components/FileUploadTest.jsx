import Form from "react-bootstrap/Form";

const FileUploadTest = () => {
  const validateFile = () => {
    var fileInput = document.getElementById("file");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
      /(\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd|\.png|\.jpg|\.jpeg)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }
    return true;
  };

  const handleFileSelect = (event) => {
    let valid = validateFile();
    var isPdf = /(\.pdf|\.png|\.jpg|\.jpeg)$/i;
    var fileInput = document.getElementById("file");
    var filePath = fileInput.value;
    let fileContent = document.getElementById("fileContent");
    fileContent.textContent = "";

    if (valid) {
      if (isPdf.exec(filePath)) {
        console.log(event.target.files);
        const reader = new FileReader();
        reader.onload = handleFileLoadPdf;
        reader.readAsDataURL(event.target.files[0]);
      } else {
        const reader = new FileReader();
        reader.onload = handleFileLoadText;
        reader.readAsText(event.target.files[0]);
      }
    }
  };

  const handleFileLoadText = (event) => {
    console.log(event);
    document.getElementById("modal-body").textContent = event.target.result;
  };

  const handleFileLoadPdf = (event) => {
    console.log(event);
    document.getElementById(
      "modal-body"
    ).innerHTML = `<embed src=${event.target.result} width="850px" height="850px" type="application/pdf"/>`;
  };

  /*
  
  
  
    // @param {Event} event
    function handleSubmit(event) {
      // @type {HTMLFormElement} 
      const form = event.currentTarget;
      const url = new URL(form.action);
      const formData = new FormData(form);
      const searchParams = new URLSearchParams(formData);
  
      /// @type {Parameters<fetch>[1]} 
      const fetchOptions = {
        method: form.method,
      };
  
      if (form.method.toLowerCase() === "post") {
        if (form.enctype === "multipart/form-data") {
          fetchOptions.body = formData;
        } else {
          fetchOptions.body = searchParams;
        }
      } else {
        url.search = searchParams;
      }
  
      fetch(url, fetchOptions);
  
      event.preventDefault();
    }
  
  */

  return (
    <form>
      <Form.Control
        onChange={handleFileSelect}
        accept=".pdf, .txt, .doc, .docx"
        id="file"
        as="input"
        type="file"
      ></Form.Control>
    </form>
  );
};

export default FileUploadTest;