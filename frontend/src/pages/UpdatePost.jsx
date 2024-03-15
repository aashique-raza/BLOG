import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdatePost() {
    const [formData,setFormData]=useState({})
    const [UpdateError,setUpdateError]=useState(null)
    const [UpdatePostLoading,setUpdatePostLoading]=useState(false)
    const [fileErr,setFileErr]=useState(null)
  const[fileProgress,setFileProgress]=useState(null)
  const [file, setFile] = useState(null);
//   const [imageUploadProgress, setImageUploadProgress] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
  
//   const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  const navigate = useNavigate();
  const { UserData } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (data.success === false) {
          return setUpdateError(data.msg);
        }

        // console.log(data)
        setUpdateError(null);
        setFormData(data.posts[0]);
      };

      fetchPost();
    } catch (error) {
        setUpdateError("something went wrong");
      console.log(error.message);
    }
  }, [postId]);

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


  const handleUpdatePostSubmit=async(e)=>{
    e.preventDefault()
    // console.log('hiii')

    try {
        setUpdatePostLoading(true)
     
      setUpdateError(null)
      const res = await fetch(`/api/post//updatepost/${formData._id}/${UserData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result=await res.json()

      if(result.success===false){
        setUpdatePostLoading(false)
        return setUpdateError(result.msg)
      }

      setUpdatePostLoading(false)
      setUpdateError(null)
    //   console.log(result)
      navigate(`/post/${result.updatedPost.slug}`)



      
    } catch (error) {
        setUpdateError('something went wrong')
      setUpdatePostLoading(false)
      console.log(`update post post failed ${error}`)
    }
  }





  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdatePostSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImgupload}
            disabled={fileProgress}
          >
            {fileProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={fileProgress}
                  text={`${fileProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {fileErr && <Alert color="failure">{fileErr}</Alert>}

        {formData.image && (
          <img src={formData.image} className=" w-full object-cover h-72" />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12 text-2xl placeholder:text-gray-100"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          disabled={UpdatePostLoading}
        >
          {UpdatePostLoading ? "updating..." : "update"}
        </Button>
      </form>
      {UpdateError && <Alert color={"failure"}>{UpdateError}</Alert>}
    </div>
  );
}

export default UpdatePost;
