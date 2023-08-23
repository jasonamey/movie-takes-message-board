import { TagBox } from "../side-info/TagBox";
import { StatusBox } from "../side-info/StatusBox";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui";
import useMobileMenu from "@/hooks/useMobileMenu";

export const MobileMenu = () => {
  const session = useSession();
  const { onClose } = useMobileMenu();
  return (
    <>
      <div
        onClick={() => onClose()}
        className="
          fixed
          inset-0
          z-40 
          overflow-y-auto
          overflow-x-hidden 
          bg-black 
          bg-opacity-30 
          outline-none
          focus:outline-none"
      >
        <div className="relative h-full">
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 flex h-full w-3/5 animate-enter flex-col items-end gap-4 bg-white-300 px-6 pt-[116px]"
          >
            <StatusBox />
            <TagBox />
            {session && (
              <Button variant="submit" onClick={() => void signOut()}>
                Log Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
