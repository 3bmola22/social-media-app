import React, { use, useContext, useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import Footer from "./../Footer/Footer";
import { CounterContext } from "../../Context/CounterContext";
import axios from "axios";
import PostCard from "../PostCard/PostCard";
import { Sort } from "iconsax-reactjs";
import { DotLoader } from "react-spinners";
import Loader from "../Loader/LoaderCardComment";
import { useQuery } from "@tanstack/react-query";
import LoaderCard from "../Loader/LoaderCard";
import CreatePost from "../CreatePost/CreatePost";
import { Helmet } from "react-helmet";
 
export default function Home() {
  // const [allPosts, setallPosts] = useState(null);
  // const [isLoading, setisLoading] = useState(true);
  // const [isErr, setisErr] = useState(false);
  function getAllPosts() {
    return axios.get(" https://route-posts.routemisr.com/posts", {
      params: { limit: 80, sort: "-createdAt" },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("apiUserToken")}`,
      },
    });
    // .then((res) => {
    //   console.log(res.data.data.posts);
    //   setallPosts(res.data.data.posts);
    //   console.log(allPosts);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   setisErr(true);
    // })
    // .finally(() => {
    //   setisLoading(false);
    // });
  }
  // useEffect(() => {
  //   getAllPosts();
  // }, []);
  // console.log(allPosts);
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });
  // console.log("data", data);
  // console.log("isLoading", isLoading);
  // console.log("isError", isError);
  // console.log("isFetching", isFetching);
  // console.log("error", error);

  if (isLoading) {
    return <LoaderCard />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <CreatePost />
      {data.data.data.posts?.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </>
  );
}
