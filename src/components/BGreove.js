import React, { useState } from 'react';
import './BGreove.css';

function BGreove() {
  const [preview, setPreview] = useState(null);
  const [output, setOutput] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState('');
  console.log("this website created by vivek sharma")


  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length === 0) {
      alert('Please select an image file.');
      return;
    }

    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append('image_file', file);

    const apiKey = 'NywpWr9yEQUtm9QHo5RFc6K2'; // Replace with your Remove.bg API key
    const apiUrl = 'https://api.remove.bg/v1.0/removebg';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to remove background.');
      }

      const blob = await response.blob();
      const imgURL = URL.createObjectURL(blob);
      setOutput(imgURL);
      setDownloadLink(imgURL);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className=" text-center">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Background Remover</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home</a>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>

      <h1>Remove Background from Image</h1>
      <p className="lead">Select an image and click the button to remove its background. Please wait for a few seconds after submitting.</p>

      <div className="form-group">
        <input type="file" className="form-control-file" id="imageInput" accept="image/*" onChange={previewImage} />
      </div>

      {preview && (
        <div id="preview" className="mt-4 custom">
          <img src={preview} className="img-fluid rounded shadow custom-img" alt="Selected Image" />
        </div>
      )}

      <button className="btn btn-primary mt-3" onClick={removeBackground}>Remove Background</button>

      {output && (
        <div id="output" className="mt-4">
          <img src={output} className="img-fluid rounded shadow custom-img" alt="Output Image" />
        </div>
      )}

      {downloadLink && (
        <a href={downloadLink} download="output.png" className="btn btn-success mt-3">Download Image</a>
      )}

      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}

export default BGreove;
