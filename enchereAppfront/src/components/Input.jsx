export default function Input({ ...props }) {
  return (
    <div className="w-auto">
      <input
        className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none `}
        {...props}
      />
    </div>
  );
}
