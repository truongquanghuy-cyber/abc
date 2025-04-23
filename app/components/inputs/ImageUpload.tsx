"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { useCallback } from "react";

import React from "react";

declare global {
  let cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="khvyhq1c"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
                        relative
                        cursor-pointer
                        hover:opacity-70
                        transition
                        border-dashed
                        border-2
                        p-20
                        border-neutral-300
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-4
                        text-neutral-600
                    "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
// "use client";

// import { CldUploadWidget } from "next-cloudinary";
// import Image from "next/image";
// import { TbPhotoPlus } from "react-icons/tb";
// import { useState, useCallback } from "react";

// import toast from "react-hot-toast";

// interface ImageUploadProps {
//   onChange: (value: string) => void;
//   value: string;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
//   const [uploading, setUploading] = useState(false);

//   // const handleUpload = useCallback(
//   //   (result: any) => {
//   //     console.log("Response từ Cloudinary:", result);

//   //     if (result.event === "success") {
//   //       const uploadeUrl = result.info.secure_url;

//   //       console.log("ảnh đã upload", uploadeUrl);
//   //       if(!uploadeUrl)  return;

//   //       onChange(uploadeUrl);
//   //       toast.success("Upload thành công")

//   //     } else {
//   //       toast.error("Upload thất bại, vui lòng thử lại!!!");
//   //     }
//   //     setUploading(false);
//   //   },
//   //   [onChange]
//   // );

//   // const handleUpload = useCallback((result: any) => {
//   //   console.log("Response từ Cloudinary:", result); // Debug toàn bộ response

//   //   if (result.event === "success") {
//   //     const uploadedUrl = result.info?.secure_url; // Lấy URL từ info

//   //     if (!uploadedUrl) {
//   //       toast.error("Không lấy được URL ảnh. Vui lòng thử lại!");
//   //       return;
//   //     }

//   //     console.log("Ảnh đã upload:", uploadedUrl); // Log URL để kiểm tra
//   //     onChange(uploadedUrl);
//   //     toast.success("Upload thành công!");
//   //   } else {
//   //     toast.error("Upload thất bại, vui lòng thử lại!");
//   //   }

//   //   setUploading(false);
//   // }, [onChange]);
//   const handleUpload = useCallback(async (result: any) => {
//   if (result.event === "success") {
//     const uploadedUrl = result.info?.secure_url;

//     if (!uploadedUrl) {
//       toast.error("Không lấy được URL ảnh. Vui lòng thử lại!");
//       return;
//     }

//     console.log("Ảnh đã upload:", uploadedUrl);

//     // Gửi URL đến backend
//     try {
//       await fetch("/api/save-image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ imageUrl: uploadedUrl }),
//       });

//       onChange(uploadedUrl);
//       toast.success("Upload thành công!");
//     } catch (error) {
//       console.error("Lỗi khi lưu ảnh:", error);
//       toast.error("Không thể lưu ảnh. Vui lòng thử lại!");
//     }
//   } else {
//     toast.error("Upload thất bại, vui lòng thử lại!");
//   }

//   setUploading(false);
// }, [onChange]);

//   return (
//     <CldUploadWidget
//       onUpload={handleUpload}
//       uploadPreset="osb3kg3m"
//       options={{
//         maxFiles: 1,
//       }}
//       onOpen={() => setUploading(true)}
//       onClose={() => setUploading(false)}
//     >
//       {({ open }) => (
//         <div
//           onClick={() => !uploading && open?.()}
//           className={`
//             relative cursor-pointer hover:opacity-70 transition border-dashed
//             border-2 p-20 border-neutral-300 flex flex-col justify-center items-center
//             gap-4 text-neutral-600 ${uploading ? "opacity-50 pointer-events-none" : ""}
//           `}
//         >
//           {uploading ? (
//             <div className="text-lg font-semibold text-neutral-500">
//               Uploading...
//             </div>
//           ) : (
//             <>
//               <TbPhotoPlus size={50} />
//               <div className="font-semibold text-lg">Click to upload</div>
//             </>
//           )}

//           {value && !uploading && (
//             <div className="absolute inset-0 w-full h-full">
//               <Image
//                 alt="Uploaded Image"
//                 src={value}
//                 fill
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </CldUploadWidget>
//   );
// };

// export default ImageUpload;