import React from 'react'
import { Button, FileInput, Select, TextInput,Alert } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { app } from '../firebase';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function CreatePost() {

  const [file,setFile]=useState(null)
  const [fileErr,setFileErr]=useState(null)
  const[fileProgress,setFileProgress]=useState(null)
  // const [fileUploading,setFileUploading]=useState(false)
  const [formData,setFormData]=useState({})


  const handleImgupload= async()=>{
    
    try {
      if(!file){
        setFileErr('please select an image')
      }
      const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setFileErr(null)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setFileProgress(progress.toFixed(0));
      },
      (error) => {
        setFileErr(
          "something went wrong"
        );
        
        setFileProgress(null);
        
       
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileErr(null)
          setFileProgress(null)
          setFormData({ ...formData, image: downloadURL });
        
        });
      }
    );

      
    } catch (error) {
      setFileErr(`upload img failed`)
      setFileProgress(null)
      console.log(`upload img failed ${error}`)
    }
  }


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
    <form className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput
          type='text'
          placeholder='Title'
          required
          id='title'
          className='flex-1'
        />
        <Select>
          <option value='uncategorized'>Select a category</option>
          <option value='javascript'>JavaScript</option>
          <option value='reactjs'>React.js</option>
          <option value='nextjs'>Next.js</option>
        </Select>
      </div>
      <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
        <FileInput type='file' accept='image/*'  onChange={(e)=>setFile(e.target.files[0])}/>
        <Button
          type='button'
          gradientDuoTone='purpleToBlue'
          size='sm'
          outline
          onClick={handleImgupload}
          disabled={fileProgress}
        >
          {fileProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={fileProgress}
                  text={`${fileProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          
        </Button>
        
      </div>
      {
          fileErr && (<Alert color="failure">{fileErr}</Alert>)
        }

        {
          formData.image && (
            <img src={formData.image} className=' w-full object-cover h-72'/>
          )
        }
      <ReactQuill
        theme='snow'
        placeholder='Write something...'
        className='h-72 mb-12 text-2xl placeholder:text-gray-100'
        required
      />
      <Button type='submit' gradientDuoTone='purpleToPink'>
        Publish
      </Button>
    </form>
  </div>
  )
}

export default CreatePost