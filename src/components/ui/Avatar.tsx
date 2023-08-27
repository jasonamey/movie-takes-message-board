import Image from "next/image";

interface AvatarProps {
  imgSrc: string;
}

export const Avatar = ({ imgSrc }: AvatarProps) => {
  return (
    <Image src={imgSrc} width={40} height={40} alt="image icon for profile" />
  );
};
