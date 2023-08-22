import { useEffect } from "react";
import { api } from "@/utils/api";
import { SideInfo } from "@/components/side-info";
import { MobileMenu } from "@/components/mobile-menu";
import useMobileMenu from "@/hooks/useMobileMenu";
import useSort from "@/hooks/useSort";
import { useTag } from "@/hooks/useTag";
import { PageLayout } from "@/components";
import { HeaderBar } from "@/components/header-bar";
import { TakesList } from "@/components/take-list";
import { sortTakesResponse } from "@/utils/helpers";
import TakeSkeleton from "@/components/take-list/TakeSkeleton";

export default function Home() {
  const { data, isLoading } = api.takes.getAll.useQuery();
  const mobileMenu = useMobileMenu();
  const { selectedFilter } = useSort();
  const { selectedTag } = useTag();

  if (data !== undefined) {
    if (selectedFilter !== "") {
      const filter = selectedFilter.toLowerCase().split(" ");
      sortTakesResponse(data, filter);
    }
  }

  const { onClose, isOpen } = mobileMenu;
  useEffect(() => {
    window.addEventListener("resize", onClose);
    return () => {
      window.removeEventListener("resize", onClose);
    };
  });
  return (
    <>
      <PageLayout className="items-start sm:px-4 lg:flex-row">
        <SideInfo />
        {isOpen && <MobileMenu />}
        <div className="z-0 w-full">
          <HeaderBar />
          {isLoading || data === undefined ? (
            <TakeSkeleton cards={4} />
          ) : (
            <TakesList
              takes={
                selectedTag === "All"
                  ? data
                  : data.filter(
                      (item) =>
                        item.genre.toLowerCase() === selectedTag.toLowerCase()
                    )
              }
            />
          )}
        </div>
      </PageLayout>
    </>
  );
}
