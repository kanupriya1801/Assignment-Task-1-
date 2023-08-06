const Dropdown = ({ options, onChange, selectedItem }) => {
  return (
    <select
      name="currency"
      id="currency"
      value={selectedItem}
      onChange={onChange}
      aria-label="Select currency"
    >
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
