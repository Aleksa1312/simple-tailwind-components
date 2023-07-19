import Image from "next/image";
import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

interface IAvatarProps {
  children: React.ReactNode | React.ReactNode[];
}

interface IAvatarComponent extends FC<IAvatarProps> {
  Image: FC<IAvatarImageProps>;
  Fallback: FC<IAvatarFallbackProps>;
}

const Avatar: IAvatarComponent = (props) => {
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

const AvatarImage: FC<IAvatarImageProps> = (props) => {
  return (
    <Image
      className={twMerge("w-12 h-12 rounded-full", props.className)}
      width={200}
      height={200}
      src={props.src}
      alt={props.alt}
    />
  );
};

interface IAvatarFallbackProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const AvatarFallback: FC<IAvatarFallbackProps> = (props) => {
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

Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export default Avatar;
