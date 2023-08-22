import { Tag } from "../ui/Tag";
import { useTag } from "@/hooks/useTag";
import { GENRE_TAGS } from "@/utils/constants";

export const TagBox = () => {
  const resultFromTag = useTag();
  const { selectedTag, onSelect } = resultFromTag;

  return (
    <div className="flex w-full flex-wrap gap-2 rounded-md bg-white-100 p-4">
      {/* // <div className="hidden flex-wrap gap-2 rounded-md bg-white-100 p-2 sm:flex sm:w-1/3 sm:p-4 md:w-full"> */}
      {GENRE_TAGS.map((item) => {
        return (
          <Tag
            key={item.id}
            onClick={() => {
              onSelect(item.name);
            }}
            selected={item.name == selectedTag}
            canBeSelected={true}
          >
            {item.name}
          </Tag>
        );
      })}
    </div>
  );
};
