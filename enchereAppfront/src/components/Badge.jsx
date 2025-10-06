export default function Badge({ children, variant, className = "", ...props }) {
  const variantStyles = {
    success: "bg-green-200 text-green-600",
    warning: "bg-yellow-200 text-yellow-600",
    secondary: "bg-blue-200 text-blue-600",
  };

  return (
    <span
      className={`flex items-center justify-center gap-2 px-2 py-1 rounded-3xl font-semibold ${
        variantStyles[variant] || ""
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
