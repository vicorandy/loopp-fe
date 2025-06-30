import { useState } from 'react';
import { Search } from 'lucide-react';
import { serviceCategories } from './libs/types';

const suggestions = [...serviceCategories
];

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    // your search logic
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setIsFocused(false);
    handleSearch();
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          placeholder="What do you need to find?"
          className="flex-1 px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[transparent] focus:border-transparent placeholder-gray-400 text-base"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex-shrink-0"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {isFocused && filteredSuggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl z-45 py-2">
          {filteredSuggestions.slice(0,5).map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-6 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
