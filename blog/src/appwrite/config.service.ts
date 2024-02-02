import { Client, Databases, Query } from "appwrite";
import config from "../config/config";

export class Service {
    private client = new Client();

    private databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client);
    }

    async createPost(title: string, slug: string, content: string, featuredImage: string, status: string, userId: string) {
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug, {
            title,
            content,
            featuredImage,
            status,
            userId
        }
        );
    }

    async updatePost(slug: string, title: string, content: string, featuredImage: string, status: string) {
        return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                status,
                featuredImage,
            }
        );
    }

    async deletePost(slug: string) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (e) {
            return false;
        }
        return true;
    }

    async getPost(slug: string) {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        );
    }


    async getPosts(queries = [Query.equal('status', 'active')]) {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        );
    }
}

const service = new Service();
export default service;