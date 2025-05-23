import { useState, useEffect } from "react";

function Avatar({ children, className, ...props }) {
  return (
    <div
      className={`
        relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function AvatarImage({ src, alt = "", className, ...props }) {
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsError(true);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (isError || !src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`
        aspect-square h-full w-full object-cover
        ${isLoaded ? "opacity-100" : "opacity-0"}
        ${className}
      `}
      {...props}
    />
  );
}

// AvatarFallback component
function AvatarFallback({ children, className, ...props }) {
  return (
    <div
      className={`
        flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
