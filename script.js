// Function to handle the form submission
function handleSubmit(event) {
  event.preventDefault();
  const imageInput = document.getElementById('imageInput');
  const imageFile = imageInput.files[0];

  // Perform image-to-sound conversion
  convertImageToSound(imageFile);
}

// Function to convert image to sound
function convertImageToSound(imageFile) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const imageData = event.target.result;

    // Send the image data to the server for processing
    fetch('/processImage', {
      method: 'POST',
      body: imageData
    })
      .then(response => response.blob())
      .then(audioBlob => {
        // Create a download link for the audio file
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(audioBlob);
        downloadLink.download = 'converted_audio.wav';
        downloadLink.textContent = 'Download Converted Audio';

        // Append the download link to the audioPlayer div
        const audioPlayerContainer = document.getElementById('audioPlayer');
        audioPlayerContainer.innerHTML = '';
        audioPlayerContainer.appendChild(downloadLink);
      })
      .catch(error => console.error(error));
  };

  // Read the image file as data URL
  reader.readAsDataURL(imageFile);
}

// Add event listener to the form submission
const imageForm = document.getElementById('imageForm');
imageForm.addEventListener('submit', handleSubmit);
