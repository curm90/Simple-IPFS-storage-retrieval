'use client';

import { useCallback, useState } from 'react';
import { upload } from 'thirdweb/storage';
import { MediaRenderer } from 'thirdweb/react';
import { useDropzone } from 'react-dropzone';
import client from '@/lib/utils/thirdweb';

export default function Form() {
  const [storedUris, setStoredUris] = useState<string[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uris = await upload({ client, files: acceptedFiles });
      console.log({ acceptedFiles, uris });
      setStoredUris(uris);
    },
    [upload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      {storedUris.map((uri) => (
        <MediaRenderer key={uri} client={client} src={uri} alt='Image' />
      ))}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}
