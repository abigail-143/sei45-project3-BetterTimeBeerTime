import React, { useRef, useState } from "react";
import styles from "./submitContent.module.css";
// import "./SubmitContent.css";

const SubmitContent = (props) => {
  const [image, setImage] = useState({contentPhoto: ""});
  const drinkNameRef = useRef();
  const shopNameRef = useRef();
  const reviewRef = useRef();
  const contentTagRef = useRef();
  const [showImage, setShowImage] =useState(true)
  //   const fetchData = useFetch();

  //should get user detail from the start and useContext send to here
  // const getUser = async () => {
  //   const decoded = userCtx.accessToken;
  //   const res = await fetchData("/beer/getuser", "POST", {
  //     username: decoded.username,
  //   });
  //   if (res.ok) {
  //     setUser(res.data);
  //   } else {
  //     alert(JSON.stringify(res.data));
  //     console.log(res.data);
  //   }
  // };

  const publishNewPost = async (newImage) => {
    const res = await fetchData("/putNewContent/" + user.userId, "PUT", {
      contentPhoto: newImage,
      drinkName: drinkNameRef.current.value,
      shopName: shopNameRef.current.value,
      contentReview: reviewRef.current.value,
      contentTag: contentTagRef.current.value,
    });
    if (res.ok) {
      setUser(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };
  // function to upload photo
  // const createPost = async (newImage) => {
  //   const res = await fetch("http://localhost:5002/upload", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newImage),
  //   });
  // };

  //function to convert photo file into base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // convert file into base64 and standby for upload
  const handleFileUpload = async (e) => {
    setShowImage(false)
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage({ ...image, contentPhoto: base64 });
  };

  // upload to data based and keep at state
  const handleSubmit = (e) => {
    e.preventDefault();
    publishNewPost(image);
    console.log(image);
  };

  return (
    <>
      <div className={styles.backdrop}>
        <img
          src="../picture/Arrow 1.jpg"
          className={styles.arrow}
          onClick={() => {
            props.setSubmitContent(false);
          }}
        />
        <div className={styles.modal}>
          <div className="row">
            <div className="col-md-5">
              <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload">
                  {showImage && <img src={"../picture/upload-image-icon (1).png"} className={styles.uploadphoto} alt="" />}
                  <img src={image.contentPhoto} className={styles.contentphoto}/>
                </label>
                <input
                  type="file"
                  label="Image"
                  name="contentPhoto"
                  className={styles.upload}
                  id="file-upload"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload(e)}
                ></input>
              </form>


            </div>
            <div className="col-md-7">
              <div className="container">
                <br />
                <br />
                <br />
                <div className={styles.font}>Drink</div>
                <input
                  type="text"
                  ref={drinkNameRef}
                  className={styles.inputBox}
                  placeholder="Name of the drink"
                  onChange
                ></input>
                <br />
                <div className={styles.font}>Bar</div>
                <input
                  type="text"
                  ref={shopNameRef}
                  className={styles.inputBox}
                  placeholder="Name of the bar"
                  onChange
                ></input>
                <br />
                <div className={styles.font}>Review</div>
                <textarea
                  type="text"
                  ref={reviewRef}
                  className={styles.textBox}
                  name="Review"
                  rows="5"
                  placeholder="Leave a review"
                  onChange
                ></textarea>
                <br />
                <div className={styles.font}>Tgs</div>
                <input
                  type="text"
                  ref={contentTagRef}
                  className={styles.inputBox}
                  placeholder="Start with #hashing"
                  onChange
                ></input>
                <br />
                <br />
                <button
                  type="button"
                  className={styles.button}
                  onClick={publishNewPost}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitContent;
