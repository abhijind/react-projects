import { Client, Databases, Query } from "appwrite";
import config from "../config/config";
import { Post } from "../models";

export class Service {
    private client = new Client();

    private databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client);
    }

    async createPost(post: Post) {
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            post.slug, {
                title: post.title,
                content: post.content,
                featuredImage: post.featuredImage,
                status: post.status,
                userId: post.userId,
        }
        );
    }

    async updatePost(postId: string, post: Post) {
        return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            postId,
            {
                title: post.title,
                content: post.content,
                featuredImage: post.featuredImage,
                status: post.status,
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