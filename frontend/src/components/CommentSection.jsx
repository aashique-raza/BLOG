import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShowComment from "./ShowComment";

function CommentSection({ postId }) {
  const { UserData } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [getCommentError, setgetCommentError] = useState(null);
//   console.log(comments)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError("maximum 200 words allowed..");
      return;
    }
    try {
      const res = await fetch("/api/comment/createcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: UserData._id,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setCommentError(data.msg);
        return;
      }

      setComment("");
      setCommentError(null);
      window.location.reload();
    } catch (error) {
      setCommentError("something went wrong " + error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);

        const data = await res.json();
        // console.log(data)

        if (data.success === false) {
          setgetCommentError(data.msg);
          return;
        }
        setgetCommentError(null);
        setComments(data.comments);
      } catch (error) {
        setgetCommentError("something went wrong");
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {UserData ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={UserData.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{UserData.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {UserData && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((com) => (
            <ShowComment key={com._id} comment={com} />
          ))}
        </>
      )}
    </div>
  );
}

export default CommentSection;
