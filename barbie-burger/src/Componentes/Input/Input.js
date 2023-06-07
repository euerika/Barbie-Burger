import "../../../src/Componentes/Input/Input.css";

export const CampoTexto = ({
  type,
  value,
  name,
  placeholder,
  onChange,
  label,
  className = "input-container",
  classNameLabel = "input-label",
  classNameInput = "input",
  ...props
}) => {
  return (
    <>
      <div className={className}>
        <label className={classNameLabel}>{label}</label>
        <input
          type={type}
          className={classNameInput}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
      </div>
    </>
  )
}

