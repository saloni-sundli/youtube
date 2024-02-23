import tw from "tailwind-styled-components";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";

const SearchComponent = ({
  gpt,
  gptSuggestion,
  searchGptQuery,
  search,
  searchQuery,
  setSearchGptQuery,
  setSearchQuery,
  setShowSuggestions,
  result,
  showSuggestions,
  searchQueryResult,
}) => {
  return (
    <>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder={gpt ? "Gpt Search" : "Search"}
          className={
            gpt
              ? "py-1 px-5 my-1 mx-1 loading placeholder:text-[#fff] placeholder:font-medium font-medium text-white"
              : ""
          }
          value={gpt ? searchGptQuery : searchQuery}
          onChange={(e) => {
            gpt
              ? setSearchGptQuery(e.target.value)
              : setSearchQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              search();
              setSearchQuery("");
              setSearchGptQuery("");
            }
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <div className={gpt ? "w-full h-full loading" : ""}></div>
        <Button
          onClick={gpt ? gptSuggestion : search}
        >
          <FiSearch />
        </Button>
      </SearchBox>
      {showSuggestions && (
        <Suggestions>
          {searchQueryResult &&
            searchQueryResult.map((item) => (
              <Suggestion key={item}>
                <FiSearch size={14} /> {item}
              </Suggestion>
            ))}
        </Suggestions>
      )}

      {gpt && searchQuery && (
        <Suggestions>
          <Suggestion>{result}</Suggestion>
        </Suggestions>
      )}
    </>
  );
};

SearchComponent.propTypes = {
  gpt: PropTypes.bool,
  gptSuggestion: PropTypes.func,
  searchGptQuery: PropTypes.string,
  search: PropTypes.func,
  searchQuery: PropTypes.string,
  setSearchGptQuery: PropTypes.func,
  setSearchQuery: PropTypes.func,
  setShowSuggestions: PropTypes.func,
  result: PropTypes.string,
  showSuggestions: PropTypes.bool,
  searchQueryResult: PropTypes.array,
};

export default SearchComponent;

const SearchInput = tw.input`flex-1 py-2 px-6 rounded-l-full placeholder:text-gray-300 focus:outline-none bg-[#1a1a1b]  text-white placeholder:text-sm shadow-inner shadow-[#0006] placeholder:tracking-wider`;
const SearchBox = tw.div`rounded-full overflow-hidden border-2 shadow-md border-[#322] flex items-center w-[100%] gap-0 shadow-[#0006]`;
const Button = tw.button`bg-opacity-60 rounded-r-full px-4 py-2 text-lg hover:animate-pulse shadow-md shadow-[#0001] ease-in-out hover:shadow-sm`;
const Suggestions = tw.ul`fixed my-4 top-14 bg-gray-950 w-[42rem] rounded-md shadow-sm shadow-black z-50 text-justify`;
const Suggestion = tw.li`text-gray-300 hover:text-white flex items-center gap-2 transition-all duration-200 ease-in py-3 px-5 cursor-pointer hover:bg-gray-600`;
