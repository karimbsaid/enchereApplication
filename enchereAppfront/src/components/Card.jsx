const Card = ({ children, ...props }) => {
  return (
    <div
      className={`rounded-2xl shadow-lg p-4 border border-gray-200 ${props.className}`}
    >
      {children}
    </div>
  );
};

export default Card;
