'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { download, upload } from 'thirdweb/storage';
import { MediaRenderer } from 'thirdweb/react';
import { useDropzone } from 'react-dropzone';
import client from '@/lib/utils/thirdweb';

export default function Form() {
  const [storedUris, setStoredUris] = useState<string[]>([]);
  const [inputUri, setInputUri] = useState('');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uris = await upload({ client, files: acceptedFiles });
      console.log({ acceptedFiles, uris });

      const urisArray = Array.isArray(uris) ? uris : [uris];
      setStoredUris((prev) => [...prev, ...urisArray]);
    },
    [upload],
  );

  const handleFetchUri = async () => {
    const file = await download({
      client,
      uri: inputUri,
    });

    if (file) {
      console.log({ inputUri });

      setStoredUris([...storedUris, file.url]);
      setInputUri('');
      console.log({ inputUri });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='mt-12 flex flex-col items-center gap-4'>
      {storedUris.length > 0 ? (
        <div className='flex max-w-[130rem] flex-wrap gap-4 rounded-md border border-slate-600 p-4'>
          {storedUris.map((uri) => (
            <MediaRenderer key={uri} client={client} src={uri} alt='Image' />
          ))}
        </div>
      ) : null}
      <div className='flex flex-col gap-4 rounded-md border border-slate-600 p-6'>
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
        <span>Or fetch media by IPFS uri</span>
        <div className='flex flex-col gap-3'>
          <input
            onChange={(e) => setInputUri(e.target.value)}
            className='w-full border border-slate-600 bg-transparent px-4 py-2 outline-none focus:border-slate-400'
            type='text'
            placeholder='Enter IPFS uri...'
            value={inputUri}
          />
          <button
            disabled={!inputUri}
            className='rounded-md bg-slate-500 px-4 py-2 text-slate-900 duration-150 hover:bg-slate-400 disabled:cursor-not-allowed'
            onClick={handleFetchUri}
          >
            Add Uri
          </button>
        </div>
      </div>
    </div>
  );
}
