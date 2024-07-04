'use client';

import { useCallback, useState } from 'react';
import { upload } from 'thirdweb/storage';
import { MediaRenderer } from 'thirdweb/react';
import { useDropzone } from 'react-dropzone';
import client from '@/lib/utils/thirdweb';
import Image from 'next/image';

export default function Form() {
  const [storedUris, setStoredUris] = useState<string[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uris = await upload({ client, files: acceptedFiles });
      console.log({ acceptedFiles, uris });

      const urisArray = Array.isArray(uris) ? uris : [uris];
      setStoredUris((prev) => [...prev, ...urisArray]);
    },
    [upload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='flex flex-col items-center gap-4'>
      {storedUris.length > 0 ? (
        <div className='flex max-w-[130rem] flex-wrap gap-4 rounded-md border border-slate-600 p-4'>
          {storedUris.map((uri) => (
            <MediaRenderer key={uri} client={client} src={uri} alt='Image' />
          ))}
        </div>
      ) : null}
      <div>
        <div
          className='mx-auto flex max-w-[70rem] cursor-pointer flex-col items-center justify-between gap-2 rounded-md bg-slate-500 px-10 pb-6 pt-10 text-slate-800 duration-150 hover:bg-slate-400'
          {...getRootProps({})}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
          <Image src='drag-drop.svg' alt='drag and drop' width={50} height={50} />
        </div>
      </div>
    </div>
  );
}
