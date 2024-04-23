const Receipt = ({ requests }) => {
  const validateFile = (id) => {
    var fileInput = document.getElementById(`file-${id}`);

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.pdf|\.png|\.jpg|\.jpeg)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      const newFileState = [...files];
      newFileState[id - 1] = false;
      setFiles(newFileState);
      console.log(files);

      return false;
    }
    return true;
  };

  const handleFileSelect = (event, id) => {
    console.log(event);
    let valid = validateFile(id);

    if (valid) {
      console.log(event.target.files);
      const reader = new FileReader();
      reader.onload = (e) => handleFileLoadPdf(e, id);
      reader.readAsDataURL(event.target.files[0]);

      const newFileState = [...files];
      newFileState[id - 1] = true;
      setFiles(newFileState);
      console.log(files);
    }
  };

  const handleFileLoadPdf = (event, id) => {
    let url = event.target.result;
    const newRequest = requests.map((request) => {
      if (request.id === id) {
        return { ...request, receipt: url };
      }
      return request;
    });

    setRequests(newRequest);
    console.log(requests);
  };
};
export default Receipt;
