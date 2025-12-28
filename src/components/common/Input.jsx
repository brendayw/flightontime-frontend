const Input = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="input-control"
      />
    </div>
  );
};

export default Input;
