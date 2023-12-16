import ffmpeg from 'fluent-ffmpeg';

const generateThumbnail = async (videoPath, outputPath) => {
  try {
    // You can set FFPROBE_PATH if needed
    // process.env.FFPROBE_PATH = '/path/to/ffprobe';

    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .screenshots({
          timestamps: ['50%'],
          filename: 'thumbnail.jpg', // Specify the filename
          folder: outputPath, // Specify the full path including the filename
          size: '300x200',
        });
    });

    return outputPath + '/thumbnail.jpg'; // Return the full path to the generated thumbnail
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error; // Propagate the error
  }
};

export default generateThumbnail;
