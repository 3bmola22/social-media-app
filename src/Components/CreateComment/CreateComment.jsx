import { Input } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaRegCommentDots, FaRegFileImage } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

export default function CreateComment({ postId, queryKey }) {
  const query = useQueryClient();
  const form = useForm({
    defaultValues: { body: "", image: "" },
  });
  const { register, handleSubmit, reset } = form;
  function createComment(formData) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`apiUserToken`)}`,
        },
      },
    );
  }
  const { data, isPending, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      console.log("d", data.data.message);
      reset();
      query.invalidateQueries({ queryKey: queryKey });
    },
    onError: () => {
      console.log("ff");
    },
    onSettled: () => {},
  });
  const formData = new FormData();
  function handleCreateComment(values) {
    console.log(values.body);
    console.log(values.image[0]);
    if (!values.body && !values.image[0]) return;
    if (values.body) {
      formData.append("content", values.body);
    }
    if (values.image[0]) {
      formData.append("image", values.image[0]);
    }
    mutate(formData);
  }
  return (
    <div className=" w-120 m-auto my-3 ">
      <form onSubmit={handleSubmit(handleCreateComment)}>
        <Input
          {...register("body")}
          //   label="text"
          labelPlacement="outside"
          placeholder="Your comment ......"
          endContent={
            <button
              type="submit"
              disabled={isPending}
              className={
                isPending
                  ? `cursor-not-allowed bg-amber-500 p-2 rounded-md`
                  : "cursor-pointer p-2 bg-blue-600 rounded-md "
              }
            >
              {isPending ? (
                <ImSpinner9 className="animate-spin" />
              ) : (
                <FaRegCommentDots className="text-2xl  pointer-events-none shrink-0 text-white" />
              )}
            </button>
          }
          type="text"
        />
        <label htmlFor="img" className="cursor-pointer">
          <div className=" bg-blue-600 rounded-sm flex items-center justify-center p-2 my-3">
            <FaRegFileImage size={"30px"} color="white" />
          </div>

          <input {...register("image")} id="img" type="file" hidden />
        </label>
      </form>
    </div>
  );
}
