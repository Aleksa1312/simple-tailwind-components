import React from "react";
import { twMerge } from "tailwind-merge";

interface IAvatarProps {
  children: React.ReactNode | React.ReactNode[];
}

const Avatar = (props: IAvatarProps) => {
  return (
    <>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Avatar.Image) {
            return child;
          }
          if (child.type === Avatar.Fallback) {
            return child;
          }
        }
      })}
    </>
  );
};

interface IAvatarImageProps {
  className?: string;
  src: string;
  alt: string;
}

Avatar.Image = (props: IAvatarImageProps) => {
  return <img className={twMerge("w-12 h-12 rounded-full", props.className)} src={props.src} alt={props.alt} />;
};

interface IAvatarFallbackProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

Avatar.Fallback = (props: IAvatarFallbackProps) => {
  return (
    <div
      className={twMerge(
        "p-3 rounded-full w-12 text-white bg-blue-500 h-12 flex items-center justify-center",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Avatar;
