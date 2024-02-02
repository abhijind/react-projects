import { Account, Client, ID } from "appwrite";
import config from "../config/config";

export class AuthService {

    private client = new Client();

    private account;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(email: string, password: string, name: string) {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            // call another method - login.
            return this.login(email, password);
        }
        return userAccount;
    }

    async login(email: string, password: string) {
        return await this.account.createEmailSession(email, password);
    }

    async getCurrentUser() {
        return await this.account.get() ?? null;
    }

    async logout() {
        return await this.account.deleteSessions();
    }
}

const authService = new AuthService();

export default authService;