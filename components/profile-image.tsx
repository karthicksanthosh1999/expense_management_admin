"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { Button } from "./ui/button";
import api from "@/lib/api";
import { useAuth } from "@/context/hooks/authHooks";
import { data } from "framer-motion/client";
import { toast } from "react-hot-toast";

export default function ProfileImage() {

  const {user} = useAuth()

  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState("")
  const [file, setFile] = useState<File | null>(null);
  const [showUpdateBtn, setShowUpdateButton] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(()=>{
    api.get(`/api/profile-image?id=${user?.id}`)
      .then(res => setExistingImage(res.data?.data?.profileImage))
      .catch(err=>console.log(err));
  },[user, preview])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setFile(file)
    setPreview(imageUrl);
  };

  const removeImage = async() => {
    await api.delete(`/api/profile-image?profileImage=${existingImage}&id=${user?.id}` )
    setFile(null);
    setPreview(null);
    setExistingImage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImage = async (file: File, oldImage?: string) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("id", user?.id);
  if (oldImage) {
    formData.append("oldImage", oldImage);
  }
  const {data} = await api.post("/api/profile-image",formData, 
    {
      headers: {
        "Content-Type":
        "multipart/form-data",
      },
    }
  );
  toast.success("Profile Updated Successfully")
  return data;
};
  return (
     <div className="flex flex-col items-center justify-center">
      <div
        onClick={() => inputRef.current?.click()}
        className="relative w-36 h-36 rounded-full border-2 border-dashed border-gray-300 cursor-pointer overflow-hidden group hover:border-primary transition">
        {/* IMAGE PREVIEW */}
        {preview ? (
          <Image
            src={preview}
            alt="Profile Preview"
            fill
            className="object-cover"
          />
        ) : existingImage ? (
            <Image
            src={existingImage}
            alt="Profile Preview"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-muted text-muted-foreground">
            <Camera className="w-8 h-8 mb-1" />
            <p className="text-xs">Upload</p>
          </div>
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        </div>

        {/* HIDDEN INPUT */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          />
      </div>
        {/* REMOVE AND UPDATE BUTTON */}
        {preview && file &&  (
          <div className="flex items-center gap-2 mt-2">
          <Button
            type="button"
            onClick={removeImage}
            className="text-white shadow cursor-pointer"
          >
            Clear
          </Button>
          
            <Button
              type="button"
              onClick={()=>uploadImage(file)}
              className="text-white shadow cursor-pointer bg-green-800"
            >
              Upload
            </Button>
          </div>
        )}

        {
          existingImage && (
          <Button
            type="button"
            onClick={removeImage}
            className="text-white shadow cursor-pointer mt-2"
          >
            Clear
          </Button>
          )
        }
    </div>
  );
}