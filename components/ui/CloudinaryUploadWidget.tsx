"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryUploadWidgetProps {
    onUploadSuccess: (files: Array<{ name: string; url: string }>) => void;
}

export default function CloudinaryUploadWidget({ onUploadSuccess }: CloudinaryUploadWidgetProps) {
    const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);

    return (
        <div>
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
                onSuccess={(result: any) => {
                    if (result.event === "success") {
                        const newFile = {
                            name: result.info.original_filename,
                            url: result.info.secure_url
                        };
                        const updatedFiles = [...uploadedFiles, newFile];
                        setUploadedFiles(updatedFiles);
                        onUploadSuccess(updatedFiles);
                    }
                }}
                options={{
                    multiple: true,
                    maxFiles: 5,
                    maxFileSize: 100000000, // 100MB
                    sources: ['local', 'url', 'camera'],
                    resourceType: 'auto',
                }}
            >
                {({ open }) => (
                    <div>
                        <button
                            type="button"
                            onClick={() => open()}
                            className="w-full bg-stone-900 border border-stone-700 rounded p-3 text-left text-stone-400 hover:border-white transition-colors cursor-pointer"
                        >
                            📎 파일 업로드 (최대 100MB, 5개까지)
                        </button>
                        {uploadedFiles.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {uploadedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-stone-400">
                                        <span>✓</span>
                                        <span className="truncate">{file.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </CldUploadWidget>
        </div>
    );
}
