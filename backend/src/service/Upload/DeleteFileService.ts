import path from 'path'
import fs from 'fs'

class DeleteFileService {
  async execute({ imageUrl }: {imageUrl: string}) {
    const fileName = path.basename(imageUrl)
  
    if (fileName === 'image-default.png') {
      return { message: 'Image default has been preserved' }
    }

    const filePath = path.join(__dirname, '..', '..', '..', 'uploads', fileName)
  
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return { message: 'Image deleted successfuly' }
    } else {
      return { error: true, message: "Image not found"  }
    }
  }
}
export { DeleteFileService }