const cloudinary = require("cloudinary").v2;
const fs = require("fs");
//this is configuration the our cloudinary account
cloudinary.config({
  cloud_name: "sahith",
  api_key: "388666387886114",
  api_secret: "_s60S3MTU2L7P1pNy6-8AE34CDw",
});

//this function will return the url of image which is uploaded
async function uploadToCloudinary(localFilePath, folderName) {
  // localFilePath : path of the Image
  //the folderName in the cloudinary  and divide with "/" add name of the file
  var filePathOnCloudinary = folderName + "/" + Date.now() + "";
  return cloudinary.uploader
    .upload(localFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      // Image has been successfully uploaded on cloudinary

      fs.unlinkSync(localFilePath); // Remove file from local uploads folder
      return {
        message: "Success",
        url: result.url, //when its uploaded it will send us "url" of the image
      };
    })
    .catch((error) => {
      // Remove file from local uploads folder
      fs.unlinkSync(localFilePath);
      return { message: "Fail" };
    });
}
module.exports = {
  uploadToCloudinary, //localFilePath, folderName is required
};
