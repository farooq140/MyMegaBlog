import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
      client = new Client();
      account;
      constructor(){
          this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        const cl=new Client();
        this.account=new Account(cl);
      }
     async createAccount({email,password,name}){
        try{
         const userAccount= this.account.create(ID.unique(),email,password,name);
         if(userAccount){
          //call another method
          return this.login({email,password});
         }     else{

          return userAccount
         }

        }catch(err){
             console.error(err);
              throw err; 
        }
     }
     async login({email,password}){
       try{
       return  await this.account.createEmailPasswordSession(email,password);
       }catch(err){
         console.error(err);
         throw err;
       }
     } 
     async getCurrentUser(){
          try{
               return await this.account.get();
          }catch(err){
            console.log("Appwrite services::getCurrentUser:: error ",err);
            throw err;
          }
          return null;
     }   
     async logout(){
       try{
         return await this.account.deleteSessions("current");
       }catch(err){
          console.log("Appwrite services::logout:: error ",err);
         throw err;
       }
     }
     
}
const authService=new AuthService();
export default authService;