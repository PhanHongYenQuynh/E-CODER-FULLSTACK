import axios from 'axios';

export async function uploadFilesMultiple(file ) {
  const uploadPreset = 'ncpanat5';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/khanhbatluc/image/upload',
        formData
      );
      return response.data;
    } catch (error) {
      
    }
}

// const generateSHA1 =(data) => {
//   const hash = crypto.createHash("sha1");
//   hash.update(data);
//   return hash.digest("hex");
// }

// const generateSignature = (publicId, apiSecret) => {
// const timestamp = new Date().getTime();
// return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
// };

// export async function removeImageUpload(publicId){
//   const cloudName = 'khanhbatluc';
//   const timestamp = new Date().getTime();
//   const apiKey = '139429812855649';
//   const apiSecret = 'ZbaVRrQYqmnqUo_eJO79RHQYWg8'
//   const signature = generateSHA1(generateSignature(publicId, apiSecret));
//   const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

//   try {
//     const response = await axios.post(url, {
//       public_id: publicId,
//       signature: signature,
//       api_key: apiKey,
//       timestamp: timestamp,
//     });

//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }