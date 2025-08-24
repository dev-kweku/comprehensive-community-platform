// app/lib/s3.server.ts
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "node:stream";

// Initialize Backblaze B2 S3 client with proper endpoint formatting
const s3 = new S3Client({
  endpoint: "https://s3.us-east-005.backblazeb2.com", // Full URL with protocol
	credentials: {
		accessKeyId: process.env.B2_ACCOUNT_ID!, // 005f195351d93fc0000000001
		secretAccessKey: process.env.B2_APPLICATION_KEY!, // Your application key
	},
	region: "us-east-005",
	forcePathStyle: true, // Required for Backblaze B2
	});

	// const DIR = process.env.AWS_BUCKET_DIR || 'ttucampus';

	async function upload(
	stream: AsyncIterable<Uint8Array> | Buffer,
	filename: string,
	contentType?: string,
	) {
	return new Upload({
		client: s3,
		leavePartsOnError: false,
		params: {
		Bucket: "ttucampus-bucket", // Your bucket name
		Key: [filename].join('/'),
		ContentType: contentType,
		CacheControl: "max-age=31536000",
		Body: Readable.from(stream),
		},
	}).done();
	}



	export { 
	upload, 
	s3 as s3Client 
	};