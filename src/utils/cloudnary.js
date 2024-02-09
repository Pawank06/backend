import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'; 
          
cloudinary.config({ 
  cloud_name: processe.env.CLOUDINARY_CLOUD_NAME, 
  api_key: processe.env.CLOUDINARY_API_KEY, 
  api_secret: processe.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload to cloudinary
        const response =  await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //file has been uploaded
        console.log('File uploaded successfully to cloudinary', response.url);

        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath); // remove file from local storage as the upload operation failed
        return null;
    }
}

export {uploadOnCloudinary};