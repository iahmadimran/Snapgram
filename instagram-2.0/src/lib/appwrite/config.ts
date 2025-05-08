import { Client, Account, Storage, Databases, Avatars } from 'appwrite';


export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  endpointUrl: import.meta.env.VITE_APPWRITE_ENDPOINT_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.endpointUrl);

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)

