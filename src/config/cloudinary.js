export const CLOUDINARY_CONFIG = {
  UPLOAD_PRESET: "student_profiles_unsigned", // unsigned upload preset
  CLOUD_NAME: "dkcdjdlqs",
  API_URL: "https://api.cloudinary.com/v1_1/dkcdjdlqs/image/upload",
  FOLDER: "students/profiles", // specific folder for student profile images
  ALLOWED_FORMATS: ["jpg", "png", "jpeg"], // restrict file types
  MAX_FILE_SIZE: 5000000 // 5MB max file size
};