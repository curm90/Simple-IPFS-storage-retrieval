'use client';

import { useCallback, useState } from 'react';
import { upload } from 'thirdweb/storage';
import { useDropzone } from 'react-dropzone';
import client from '@/lib/utils/thirdweb';

export default function Form() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log({ acceptedFiles });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
