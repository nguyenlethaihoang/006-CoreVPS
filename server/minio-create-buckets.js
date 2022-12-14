const bucketName = "second-bucket";
const minioClient = require('./minio-connect')

const minIOConnect = {
    connect: async () => {
          console.log(`Creating Bucket: ${bucketName}`);
          await minioClient.makeBucket(bucketName, "hello-there").catch((e) => {
            console.log(
              `Error while creating bucket '${bucketName}': ${e.message}`
             );
          });
        
          console.log(`Listing all buckets...`);
          const bucketsList = await minioClient.listBuckets();
          console.log(
            `Buckets List: ${bucketsList.map((bucket) => bucket.name).join(",\t")}`
          );
        }
}
module.exports = minIOConnect

// (async () => {
//   console.log(`Creating Bucket: ${bucketName}`);
//   await minioClient.makeBucket(bucketName, "hello-there").catch((e) => {
//     console.log(
//       `Error while creating bucket '${bucketName}': ${e.message}`
//      );
//   });

//   console.log(`Listing all buckets...`);
//   const bucketsList = await minioClient.listBuckets();
//   console.log(
//     `Buckets List: ${bucketsList.map((bucket) => bucket.name).join(",\t")}`
//   );
// })();