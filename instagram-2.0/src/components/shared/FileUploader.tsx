import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

function FileUploader({ fieldChange, mediaUrl }: FileUploaderProps) {

  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState(mediaUrl)

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", '.jpeg', '.jpg', '.svg']
    }
  })

  return (
    <div className='flex flex-center flex-col bg-dark-3 cursor-pointer rounded-xl' {...getRootProps()}>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
          <>
            <div className='flex flex-1 justify-center w-full p-4 lg:p-8'>
              <img src={fileUrl} alt="Images cannot be shown because I am using free plan of appwrite and I can't afford paid version now." className='file_uploader-img' />
            </div>
              <p className='file_uploader-label'>Click or drag photo to replace</p>
          </>
        ) : (
          <div className='file_uploader-box'>
            <img
              src='/assets/icons/file-upload.svg'
              width={70}
              height={55}
              alt='file-upload'
            />

            <h3 className='base-medium text-light-2 mb-2 mt-4.5'>Drag photo here..</h3>
            <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

            <Button className='shad-button_dark-4'>Select from Computer</Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader
