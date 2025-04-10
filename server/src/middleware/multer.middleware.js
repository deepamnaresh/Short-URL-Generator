/*import multer from 'multer'

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "./public/temp")
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    }
)

export const upload = multer({ storage: storage })*/

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the upload directory
const uploadDir = path.join(process.cwd(), 'public', 'temp');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Use absolute path to avoid issues
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Keep file extension
    }
});

export const upload = multer({ storage });
