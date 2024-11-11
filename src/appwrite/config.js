import conf from "../config/config";
import { Client, ID,Databases,Storage,Query } from "appwrite";

export class Service{
client = new Client();
databases;
bucket;

     constructor(){
          this.client
          .setEndpoint(conf.appWriteUrl)
          .setProject(conf.appWriteProjectId);
          this.databases=new Databases(this.client);
          this.bucket=new Storage(this.client);
     }

     async createPost({title,slug,content,featuredImage,status,userId}){
     try{
          return await this.databases.createDocument(
               conf.appWriteDatabaseId,
               conf.appWriteCollectionId,
               slug,
               {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,               
               }
          );
     } catch (error) {
          console.error("Failed to create post:", error);
          throw error;
     }
     }

     async updatePost(slug,{title,content,featuredImage,status}){
          try{
               return await this.databases.updateDocument(
                    conf.appWriteDatabaseId,
                    conf.appWriteCollectionId,
                    slug,
                    {
                         title,
                         content,
                         featuredImage,
                         status,
                    }
               );
          }catch(err){
               console.error("Failed to updatepost:", err);
                          
          }
     }

     async deletePost(slug){
          try{
                     await this.databases.deleteDocument(
                    conf.appWriteDatabaseId,
                    conf.appWriteCollectionId,
                    slug
               );
               return true;
          }catch(err){
               console.error("Appwrite service::deletepost:: err", err);
               return false;
          }
     }

     async getPost(slug){
          try{
               return  await this.databases.getDocument(
                    conf.appWriteDatabaseId,
                    conf.appWriteCollectionId,
                    slug
               );
               
          }catch(err){
               console.error("Appwrite services:: getPost ::error", err);
               return false;
          }
     }

     async getPosts(queries=[Query.equal("status","active")]){
          try{
               return await this.databases.listDocuments(
                    conf.appWriteDatabaseId,
                    conf.appWriteCollectionId,
                    queries
               )
          }catch(err){
               console.error("Appwrite services:: getposts ::error", err);
               return false;
          }
     }

     async uploadFile(file){
          try{
              return this .bucket.createFile(
                    conf.appWriteBucketId,
                    ID.unique(),
                    file
              );
          }catch(err){
               console.error("Appwrite services:: uploadFile ::error", err);
               return false;
          }
     }

     async deleteFile(fileId){
          try{
                    this.bucket.deleteFile(
                    conf.appWriteBucketId,
                    fileId
               );
               return true;
          }catch(err){
               console.error("Appwrite services:: deleteFile ::error", err);
               return false;
          }
     }

     getFilePreview(fileId){
          return this.bucket.getFilePreview(
              conf.appWriteBucketId,
              fileId
          )
      }
  

}

const service=new Service();
export default service;