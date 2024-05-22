import { redirect, useLoaderData } from "react-router-dom";
import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import DOMPurify from "dompurify";
import { singlePostData, userData } from "../../lib/DummyData";
import "./singlePage.scss";
import { useAuthContext } from "../../context/Auth.Context";
import apiRequest from "./../../lib/apiRequest";
import { useState } from "react";
function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  console.log("posts from single post ", post);
  const { currentUser } = useAuthContext();
  //console.log(currentUser);

  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      redirect("/login");
    }
    try {
      await apiRequest.post("/posts/save", { postId: post.id });
    } catch (error) {
      setSaved((prev) => !prev);
      console.log(error);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src={"/pin.png"} alt="location image" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="user image" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="logo" />
              <div className="featureText">
                <span>Utilites</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is Responsible</p>
                ) : (
                  <p>Tenant is Responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="logo" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="logo" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="size image" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="bed image" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="bathroom image" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school}
                  m away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src={"/chat.png"} alt="chat logo" />
              Send a Message
            </button>
            <button
              style={{ backgroundColor: saved ? "#fece51" : "#fff" }}
              onClick={handleSave}
            >
              <img src={"/save.png"} alt="chat logo" />
              {saved ? "Saved Place" : "Save a Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
