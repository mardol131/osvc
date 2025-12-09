"use client";

import Categories from "./Categories";
import SearchBar from "./SearchBar";
import CardExample from "./CardExample";
import Sort from "./Sort";

export default function HubSearch() {
  return (
    <div className=" flex items-center justify-center md:px-10 px-4 md:py-30 py-20">
      <div className=" w-full grid grid-cols-[1fr_4fr] gap-5 max-w-400">
        <Categories />
        <div className="flex items-start flex-col gap-10">
          <div className="w-full flex gap-5">
            <SearchBar />
            <Sort />
          </div>
          <div className="grid grid-cols-3 gap-10">
            {/* Sem přijde výsledky vyhledávání */}
            <CardExample />
          </div>
        </div>
      </div>
    </div>
  );
}
