import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload() {
  const [data, setData] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      // aws lambda end point
      fetch('https://api.chaosqoala.io/transform/logs/', {        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(binaryStr),
      })
        .then((response) => response.json())
        .then((json) => setData(JSON.stringify(json)));
    };

    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);

  // call back that is invoked when file is rejected
  const onDropRejected = useCallback((rejectedFile) => {
    console.log('Error uploading file - probably because it is not JSON');
  });

  // accept a single json file
  const accept = 'application/json';
  const multiple = false;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, onDropRejected, accept, multiple,
  });
  return (
    <div>
      <div {...getRootProps({ className: 'cq-file-upload' })}>
        <input {...getInputProps()} />
        {
          isDragActive
            ? <p>Drop the files here ...</p>
            : <p>Drag and drop some files here, or click to select files</p>
        }
      </div>
      <div>
        {data}
      </div>
    </div>
  );
}

export default FileUpload;
