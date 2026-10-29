import streamifier from 'streamifier';
import cloudinary from '../configs/cloudinary.js';

export const parse = (v) => {
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
};

export const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}
