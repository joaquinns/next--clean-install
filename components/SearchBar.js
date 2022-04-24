export default function SearchBar({ change }) {
  return (
    <div>
      <input
        className="p-2 text-md font-bold  w-1/2 my-2 mx-auto shadow-sm"
        type="text"
        placeholder="Cerca un artícle"
        onChange={change}
      />
    </div>
  );
}
