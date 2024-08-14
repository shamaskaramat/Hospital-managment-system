// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// import cloudinary from './cloudinaryConfig.js';

// // Storage for doctor photos
// const profileStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'doctors',
//         allowed_formats: ['jpg', 'jpeg', 'png'],
//     },
// });

// const doctorphoto = multer({ storage: profileStorage });

// export { doctorphoto };


import multer from 'multer';

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;