const Button = ({
  type = "button",
  disabled = false,
  variant = "simple",
  outline = false,
  children,
  ...props
}) => {
  const variantStyles = {
    success: {
      solid: "bg-green-200 text-green-600",
      outline: "border border-green-600 text-green-600 bg-transparent",
    },
    warning: {
      solid: "bg-yellow-200 text-yellow-600",
      outline: "border border-yellow-600 text-yellow-600 bg-transparent",
    },
    ghost: {
      solid: "bg-red-200 text-red-600",
      outline: "border border-red-600 text-red-600 bg-transparent",
    },
    simple: {
      solid: "bg-black text-white hover:bg-gray-600",
      outline:
        "border border-black text-black bg-transparent  hover:bg-gray-100",
    },
  };

  const disabledStyles = "opacity-50 cursor-none pointer-events-none";
  const styleType = outline ? "outline" : "solid";
  const varStyle = variantStyles[variant][styleType];

  return (
    <button
      type={type}
      className={`flex items-center gap-2 px-4 py-1 rounded-lg transition whitespace-nowrap cursor-pointer

    ${varStyle} ${disabled ? disabledStyles : ""} ${props.className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
