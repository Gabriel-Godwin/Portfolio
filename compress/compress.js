const tinify = require("tinify");
const fs = require("fs");
const path = require("path");

// Paste your API key here
tinify.key = "ZyjgXTSwhQqH3fc9y3X0r5qclJmW4GGF";

// Input & output folder paths
const inputFolder = path.join(__dirname, "input");
const outputFolder = path.join(__dirname, "output");

// Make sure output folder exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Loop through images in input folder and compress them
fs.readdir(inputFolder, (err, files) => {
    if (err) return console.error("Failed to read input folder:", err);

    files.forEach(file => {
        const inputPath = path.join(inputFolder, file);
        const outputPath = path.join(outputFolder, file);

        // Only compress image files
        if (/\.(png|jpe?g|webp)$/i.test(file)) {
            tinify.fromFile(inputPath).toFile(outputPath)
                .then(() => console.log(`✅ Compressed: ${file}`))
                .catch(err => console.error(`❌ Error compressing ${file}:`, err));
        }
    });
});
