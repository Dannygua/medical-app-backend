import cloudinary from "cloudinary";

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};



const upload = (req, res) => {

    cloudinary.config({
        cloud_name: "dhmozdnjd",
        api_key: "772868216296527",
        api_secret: "po1MBzLDpswneuZDDVaz1-DXc5g"
    });

    try {
        const files = req.files; // Los archivos enviados desde el frontend

        console.log('files', files)

        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(
                    file.tempFilePath,
                    { folder: 'uploads' }, // Carpeta donde se guardará el archivo en Cloudinary
                    (error, result) => {
                        console.log('result', result)
                        console.log('error', error)

                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        });

        console.log('uploadPromises', uploadPromises)

        Promise.all(uploadPromises)
            .then(results => {
                console.log('results', results)
                const urls = results.map(result => result.secure_url);
                res.status(200).json({ urls }); // Devuelve las URLs de los archivos subidos
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error al subir los archivos a Cloudinary' });
            });
    } catch (error) {
        console.log('e', error)
    }



}

export {
    upload
}