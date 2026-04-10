import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/LoaderCardComment";
import PostCard from "../PostCard/PostCard";
import LoaderCard from "../Loader/LoaderCard";
import LoaderCardComment from "../Loader/LoaderCardComment";

export default function PostDetails() {
  const { id } = useParams();
  function getSinglePost() {
    return axios.get(` https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("apiUserToken")}`,
      },
    });
  }
  const { data, isError, isLoading, error, isFetching } = useQuery({
    queryKey: [`getSinglePost`, id],
    queryFn: getSinglePost,
  });
//   console.log(data?.data.data.post);

  if (isLoading) {
    return <LoaderCardComment isLoading={true} />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      <PostCard post={data?.data.data.post} isPostDetails={true} />
    </>
  );
}
