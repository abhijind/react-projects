import { Client, ID, Storage } from "appwrite";
import config from "../config/config";

export class BucketService {

    private client = new Client();

    private bucket;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file: File) {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file,
        );
    }

    async deleteFile(fileId: string) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (e) {
            return false;
        }
    }

    getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    }
}

const bucketService = new BucketService();
export default bucketService;