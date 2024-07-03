export default function Form() {
  return (
    <div>
      <form>
        <input type='file' placeholder='Drag and drop or upload file...' />
        <button className='rounded-lg bg-stone-200 px-4 py-1 text-stone-950'>Upload to IPFS</button>
      </form>
    </div>
  );
}
