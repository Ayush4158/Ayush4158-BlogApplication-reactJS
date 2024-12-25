import conf from "../conf/conf";
import {Client , Account, ID } from "appwrite"

export class AuthService {

  client = new Client()
  Account
  constructor(){
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount({email, password, name}){
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name)
      if(userAccount){
        return this.login({email, password})
      }else{
        return userAccount
      }
    } catch (error) {
      console.log("createAccount error: ", error)
      return false;
    }
  }

  async login({email, password}){
    try {
      return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
      console.log("login : ", error)
      return false;
    }
  }

  async logout(){
    try {
      return await this.account.deleteSessions()
    } catch (error) {
      console.log("logout : ", error)
      return false
    }
  }

  async getCurrentUser(){
    try {
      return await this.account.get()
    } catch (error) {
      console.error("getCurrentUser : ", error)
    }

    return null;
  }

}

const authService = new AuthService()
export default authService