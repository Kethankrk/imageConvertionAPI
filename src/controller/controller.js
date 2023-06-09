const PDFImage = require('pdf-image').PDFImage;
const {v4: uuidv4} = require("uuid")
const sharp = require("sharp")


const convertPDFToImages = async() => {
    const id = uuidv4()
    const pdfImage = new PDFImage('./input.pdf', {
        convertOptions: {
            "-quality": "100",
            "-resize": "800x800",
        },
        outputDirectory: "./images",
        convertExtension: "jpg",
        pdfFileBaseName: `${uuidv4()}.jpeg`
    })
    console.log("converting")
    const path = await pdfImage.convertFile()
    console.log("converted")
}



const fistEndpoint = async(req, res) => {
    console.log("Request recived")
    const date = new Date()
    await convertPDFToImages();
    const last = new Date()
    return res.send(`hello world ${last - date}`);
};

const convetToPng = async(req, res) => {
    try{
        const uid = uuidv4()
        await sharp("./text.jpg").toFormat('png').toFile(`./images/${uid}.png`)
        return res.send("Success")
    }
    catch(error){
        return res.send("error")
    }
}




// Route for processing the images
const listConvertion = async (req, res) => {
  try {
    const images = req.files;

    // Process each image and convert to PNG
    const uid = uuidv4()
    const convertedImages = await Promise.all(
      images.map(async (image, i) => {
        const { buffer, originalname } = image;
        const convertedImage = await sharp(buffer)
          .toFormat('png')
          .toFile(`./images/${uid}${i}.png`)

        return {
          originalname,
          buffer: convertedImage,
        };
      })
    );

    res.json({ convertedImages });
  } catch (error) {
    console.error('Error converting images:', error);
    res.status(500).json({ error: 'Image conversion failed' });
  }
};






















module.exports = {
    fistEndpoint,
    convetToPng,
    listConvertion
};
