import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRegFileImage } from "react-icons/fa6";
import { Bounce, toast } from "react-toastify";

export default function CreatePost() {
  const query = useQueryClient();
  const [isUploaded, setisUploaded] = useState(false);
  const textInput = useRef(null);
  const imageInput = useRef(null);
  function handlePreviewImage(e) {
    // console.log(e.target.files[0]);
    const path = URL.createObjectURL(e.target.files[0]);
    setisUploaded(path);
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  function handleRemoveImage() {
    // console.log("clc");
    setisUploaded(false);
    imageInput.current.value = "";
  }
  function prepareDate() {
    const formData = new FormData();
    if (textInput.current.value) {
      formData.append(`body`, textInput.current.value);
    }
    if (imageInput.current.files[0]) {
      formData.append(`image`, imageInput.current.files[0]);
    }
    return formData;
  }
  function creationPost() {
    return axios.post(
      `https://route-posts.routemisr.com/posts`,
      prepareDate(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`apiUserToken`)}`,
        },
      },
    );
  }
  const { mutate, data, isPending } = useMutation({
    mutationFn: creationPost,
    onSuccess: () => {
      toast.success("post created!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      (setisUploaded(false),
        query.invalidateQueries({ queryKey: [`getAllPosts`] }),
        console.log("done"));
        // ,
        // (textInput.current.value = ""),
        // (imageInput.current.files[0] = "")
    },
    onError: () => {
      toast.error("Failed to create post!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  });
  return (
    <>
      <div className="max-w-130 m-auto my-3 p-4 rounded-lg bg-slate-50">
        <div className=" flex gap-3">
          <Avatar
            isBordered
            radius="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          <input
            onClick={onOpen}
            type="text"
            placeholder="Type Now"
            className="bg-slate-200 w-full rounded-md p-3"
          ></input>
        </div>
        <div className="model">
          {/* <Button onPress={onOpen}>Open Modal</Button> */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="bg-slate-200">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <textarea
                      ref={textInput}
                      className="w-full h-20 p-2 border rounded-md bg-slate-300"
                      placeholder="Type Now"
                    ></textarea>
                    {isUploaded && (
                      <div className="relative">
                        <img
                          alt="Card background"
                          className="object-cover rounded-xl"
                          src={isUploaded}
                        />
                        <AiFillCloseCircle
                          onClick={handleRemoveImage}
                          className="absolute top-2.5 right-2.5 z-10 size-8 text-danger-700 cursor-pointer"
                        />
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter className="flex items-center">
                    <label>
                      <FaRegFileImage className="size-7 cursor-pointer" />
                      <input
                        type="file"
                        onChange={handlePreviewImage}
                        hidden
                        ref={imageInput}
                      />
                    </label>

                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        onClose();
                        mutate();
                      }}
                    >
                      Create
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
}
