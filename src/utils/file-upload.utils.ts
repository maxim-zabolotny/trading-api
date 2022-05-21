import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
    return callback(new Error('Only file are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  // const name = file.originalname.split('.')[0].toLowerCase();
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${Date.now()}-${randomName}${fileExtName}`);
};
