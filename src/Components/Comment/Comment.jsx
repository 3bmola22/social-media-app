import { CardFooter } from "@heroui/react";
import React from "react";

export default function Comment({ PLACEHOLDER_IMAGE, comment }) {
  return (
    <CardFooter className="flex justify-between">
      <div className="flex gap-3">
        <img
          className="h-12.5 w-12.5"
          alt={comment.commentCreator.name}
          radius="sm"
          src={comment.commentCreator.photo}
          onError={(e) => {
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
        <div className="flex flex-col">
          <p className="text-lg">{comment.commentCreator.name}</p>
          {comment.content && <p>{comment.content}</p>}
          {comment.image && (
            <img
              src={comment.image}
              alt="Comment image"
              className="w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
      </div>
      <p className="text-small text-default-500">{comment.createdAt}</p>
    </CardFooter>
  );
}
