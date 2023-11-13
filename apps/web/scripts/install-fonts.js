const fs = require('fs');
const path = require('path');
const axios = require('axios');
const apiKey = process.env.FONTS_API_KEY;

// Check if the "../fonts" directory exists relative to the current directory
const fontsDir = path.join(__dirname, '../fonts');
if (!fs.existsSync(fontsDir)) {
  // If not, create it
  fs.mkdirSync(fontsDir, { recursive: true });
  console.log('Directory created:', fontsDir);

  // Array of URLs to download files from
  const filesToDownload = [
    'Regular', 'Italic', 'Bold', 'Bold-Italic', 'Extrabold'
  ].map((font) => `https://www.zackrw.com/${apiKey}/fonts/Codec-Pro-${font}.otf`)

  // Download all files in the array
  filesToDownload.forEach((fileUrl) => {
    downloadFile(fileUrl)
      .then(() => console.log(`File downloaded: ${fileUrl}`))
      .catch((err) => console.log(`Error downloading ${fileUrl}: ${err}`));
  });

} else {
  console.log('Directory already exists:', fontsDir);
}

// Function to download file and save to the specified directory
async function downloadFile(fileUrl) {
  try {
    // Get the file name from the URL
    const fileName = path.basename(fileUrl);
    const filePath = path.join(fontsDir, fileName);

    // Send GET request to the file URL
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });

    // Create a write stream to save file to disk
    const writer = fs.createWriteStream(filePath);

    // Pipe the response data to the file
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}