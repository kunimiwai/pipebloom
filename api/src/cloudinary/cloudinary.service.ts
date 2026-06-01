import { Injectable } from "@nestjs/common"
import { v2 as cloudinary } from "cloudinary"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class CloudinaryService {
  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
      api_key: config.get("CLOUDINARY_API_KEY"),
      api_secret: config.get("CLOUDINARY_API_SECRET"),
    })
  }

  async uploadImage(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: "pipebloom" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      upload.end(file.buffer)
    })
  }

  async deleteImage(publicId: string) {
    return cloudinary.uploader.destroy(publicId)
  }
}
