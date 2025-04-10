import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

/*console.log("Cloudinary Config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? "LOADED" : "MISSING",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "LOADED" : "MISSING"
});*/

cloudinary.config({
    cloud_name: "dkq1bhw3m",
    api_key: "292422193956644",
    api_secret: "Y6qDcfqhc3wH2wiPG3sHjAeMRVE"
});
/*const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: 'auto'
            }
        )

        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}*/

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        console.error("No file path provided for upload.");
        return null;
    }
    
    try {
        console.log("Uploading file to Cloudinary:", localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        console.log("Cloudinary Upload Success:", response);

        fs.unlinkSync(localFilePath); // Delete after successful upload
        return response;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error); // Log error
        
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return null;
    }
};

const deleteFromCloudinary = async (oldFilePath) => {
    try {
        if (!oldFilePath) {
            return null
        }
        const oldFilePublicId = oldFilePath.split('/')[7].split('.')[0]
        const result = await cloudinary.api.delete_resources(oldFilePublicId)

        return result

    } catch (error) {
        return null
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }