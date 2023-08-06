const Search = ({ searchText, onChange }) => {
  return (
    <div>
      <label htmlFor="searchInput">Search Order ID: </label>
      <input
        type="text"
        id="searchInput"
        value={searchText}
        onChange={onChange}
        placeholder="Enter Order ID..."
      />
    </div>
  );
}

export default Search
