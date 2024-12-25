import conf from '../conf/conf'
import { Client,ID,Databases,Storage,Query } from 'appwrite'

export class Service{

  client = new Client()
  databases
  bucket

  constructor(){
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId)
      this.databases = new Databases(this.client)
      this.bucket = new Storage(this.client)
  }

  async createPost({title , slug, content, featuredImage, status, userId}){
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        },
      )
    } catch (error) {
      console.log("createPost : ", error)
    }
  }

  async updatePost( slug, {title, content,featuredImage,status}){
    try {
      return await this.databases.updateDocument(
        configs.appwriteDatabaaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )
    } catch (error) {
      console.log("updatePost : " , error)
    }
  }

  async deletePost(slug){
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      console.log("deletePost : " , error)
    }
  }


  async getPost(slug){
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log("getpost : ", error)
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log("getpost : ", error)
    }
  }


  //file upload service

  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("uploadFile : " , error)
    }
  }

  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      console.log("deleteFile : " , error)
    }
  }

  getFilePreview(fileId){
    try {
      return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      )
    } catch (error) {
      console.log("getFilePreview : " , error)
    }
  }
}

const service = new Service()
export default service