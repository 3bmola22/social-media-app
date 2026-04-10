import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { AddSquare, Like1, Share } from "iconsax-reactjs";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoaderCard from "../Loader/LoaderCard";
import LoaderCardComment from "../Loader/LoaderCardComment";
import { FaComment, FaRegComment, FaTrashAlt } from "react-icons/fa";
import CreateComment from "../CreateComment/CreateComment";
import { HiDotsVertical } from "react-icons/hi";
import { FaPencil } from "react-icons/fa6";
import { AuthContext } from "../../Context/AuthContext";

export default function PostCard({ post, isPostDetails = false }) {
  const PLACEHOLDER_IMAGE =
    "https://imgs.search.brave.com/JwpTlpaRBGbniJ_btlxHqPgsy7V0TUGufR2ObHaftZs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzM5LzIvdmliZS1s/b2dvLXBuZ19zZWVr/bG9nby0zOTk2NTIu/cG5n";
  // console.log(post);
  const { user, createdAt, image, body, topComment, id } = post;
  const { name, photo, _id } = user;
  // const comment = topComment;
  // console.log(post);
  const { userId } = useContext(AuthContext);
  function getAllComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`, {
      params: { limit: 20 },
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`apiUserToken`)}`,
      },
    });
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`getAllComments`],
    queryFn: getAllComments,
    enabled: isPostDetails,
  });

  // console.log(data?.data.data.comments);

  if (!body && !image) return;
  function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`apiUserToken`)}`,
      },
    });
  }
  const { mutate } = useMutation({ mutationFn: deletePost });
  return (
    <Card className="max-w-130 m-auto my-3">
      <CardHeader className="flex justify-between  items-center">
        <div className="flex gap-3">
          <img
            alt={name}
            height={40}
            radius="sm"
            src={photo}
            width={40}
            onError={(e) => {
              e.target.src = PLACEHOLDER_IMAGE;
            }}
          />
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
            <p className="text-small text-default-500">{createdAt}</p>
          </div>
        </div>

        {userId == _id && (
          <Dropdown>
            <DropdownTrigger>
              <HiDotsVertical className="cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="edit">
                <div className="flex justify-between">
                  <p>Edit</p> <FaPencil />
                </div>
              </DropdownItem>
              <DropdownItem
              onClick={mutate}
                key="delete"
                className="text-danger"
                color="danger flex justify-between"
              >
                <div className="flex justify-between">
                  <p>Delete</p> <FaTrashAlt />
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </CardHeader>
      <Divider />
      <CardBody>
        {body && <p>{body} </p>}
        {image && <img src={image} alt={body} />}
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-around">
        <div className=" flex gap-x-2 cursor-pointer items-center">
          <Like1 size="32" className="text-blue-900 " />
          Like
        </div>

        <Link
          to={`/postdetails/${id}`}
          className="flex gap-x-2 cursor-pointer items-center"
        >
          <FaRegComment size="32" className="text-blue-900 " />
          Comment
        </Link>
        <div className=" flex gap-x-2 cursor-pointer items-center">
          <Share size="32" className="text-blue-900 " />
          Share
        </div>
      </CardFooter>
      <Divider />
      <CreateComment
        postId={id}
        queryKey={isPostDetails ? [`getAllComments`] : ["getAllPosts"]}
      />
      {isPostDetails == false && topComment && (
        <Comment comment={topComment} PLACEHOLDER_IMAGE={PLACEHOLDER_IMAGE} />
      )}
      {isPostDetails &&
        data?.data.data.comments.map((currentComment) => (
          <Comment
            comment={currentComment}
            PLACEHOLDER_IMAGE={PLACEHOLDER_IMAGE}
            key={currentComment._id}
          />
        ))}
      {isPostDetails && isLoading && <LoaderCardComment />}
      {isPostDetails && isError && (
        <p className="text-red-600 text-center">
          {error.message} Please try again later
        </p>
      )}
    </Card>
  );
}
