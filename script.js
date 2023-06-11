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
  reader.onload = function(event) {
    const imageData = event.target.result;
    
    // Send the image data to the server for processing
    fetch('/processImage', {
      method: 'POST',
      body: imageData
    })
    .then(response => response.blob())
    .then(audioBlob => {
      // Create an audio player element
      const audioPlayer = document.createElement('audio');
      audioPlayer.controls = true;
      
      // Create a source element and set the audio file URL
      const source = document.createElement('source');
      source.src = URL.createObjectURL(audioBlob);
      
      // Append the source element to the audio player
      audioPlayer.appendChild(source);
      
      // Append the audio player to the audioPlayer div
      const audioPlayerContainer = document.getElementById('audioPlayer');
      audioPlayerContainer.innerHTML = '';
      audioPlayerContainer.appendChild(audioPlayer);
      
      // Play the audio
      audioPlayer.play();
    })
    .catch(error => console.error(error));
  };
  
  // Read the image file as data URL
  reader.readAsDataURL(imageFile);
}

// Add event listener to the form submission
const imageForm = document.getElementById('imageForm');
imageForm.addEventListener('submit', handleSubmit);
