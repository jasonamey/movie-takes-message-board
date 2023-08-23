import React from "react";
import useSort from "../../hooks/useSort";
import { DropDownPicker } from "../";
import { Button } from "../";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export const HeaderBar = () => {
  const { status } = useSession();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log("There was an error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  const { selectedFilter, selectFilter } = useSort();

  return (
    <>
      <div className="flex w-full items-center justify-between bg-blue-300 p-3 text-white-100 sm:flex-row sm:rounded-md md:p-4">
        <div className=" flex w-4/6 items-center gap-4 sm:w-auto">
          <svg
            className="hidden sm:block"
            width="44"
            height="44"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <path
              fill="white"
              d="M224,216H183.36A103.95,103.95,0,1,0,128,232h96a8,8,0,0,0,0-16ZM40,128a88,88,0,1,1,88,88A88.1,88.1,0,0,1,40,128Zm88-24a24,24,0,1,0-24-24A24,24,0,0,0,128,104Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,128,72Zm24,104a24,24,0,1,0-24,24A24,24,0,0,0,152,176Zm-32,0a8,8,0,1,1,8,8A8,8,0,0,1,120,176Zm56-24a24,24,0,1,0-24-24A24,24,0,0,0,176,152Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,176,120ZM80,104a24,24,0,1,0,24,24A24,24,0,0,0,80,104Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,80,136Z"
            />
          </svg>
          <p className="hidden text-xl font-bold tracking-wide sm:block">
            Suggestions
          </p>
          <div className="w-[200px]">
            <DropDownPicker
              selected={selectedFilter}
              selectFn={selectFilter}
              choices={[
                { id: "most-votes", name: "Most Votes" },
                { id: "most-comments", name: "Most Comments" },
                { id: "least-comments", name: "Least Comments" },
                { id: "least-votes", name: "Least Votes" },
              ]}
              label={selectedFilter ? selectedFilter : `Sort By:`}
              width={200}
              color="blue"
            />
          </div>
        </div>
        <div className="flex items-end gap-1 md:flex-row">
          {status === "authenticated" && (
            <>
              <Link
                className={
                  "sm:text-md order-last cursor-pointer rounded-lg bg-purple px-2 py-2 text-center text-sm font-medium transition-colors active:scale-95 disabled:opacity-50 sm:inline-flex sm:px-4 sm:py-2  md:mr-2 "
                }
                href="/create"
              >
                + Add Take!
              </Link>
              <div className="hidden sm:block">
                <Button
                  variant="submit"
                  disabled={isLoading}
                  onClick={() => void signOut()}
                >
                  Log Out
                </Button>
              </div>
            </>
          )}
          {status !== "authenticated" && (
            <Button
              variant="submit"
              disabled={isLoading}
              onClick={() => void loginWithGoogle()}
            >
              Log In
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
