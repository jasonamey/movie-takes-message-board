import { type MovieSearched } from "@/types";
import { cn } from "@/utils/helpers";

interface SearchInputProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  choices?: MovieSearched[];
  setMovie: (item: MovieSearched) => void;
  className: string;
}

export const SearchInput = ({
  searchValue,
  setSearchValue,
  choices = [],
  setMovie,
  className,
}: SearchInputProps) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        className="w-full cursor-pointer rounded-md border-none bg-white-200 px-6 py-4"
        type="text"
        value={searchValue}
        onChange={changeHandler}
        placeholder="Search for Movie..."
      />
      {choices?.length > 0 && (
        <ul className="dropdown-content absolute left-0 top-16 z-20 block w-full rounded-md bg-white-100 text-gray shadow-xl">
          {choices?.map((item: MovieSearched) => (
            <li
              key={item.id}
              className="flex cursor-pointer items-center gap-4 border-b-[1px] border-white-300 p-2 text-sm hover:bg-white-200"
              onClick={() => setMovie(item)}
            >
              <div>
                <span>{item.title}</span>
                {item.year && <span> - {item.year}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
