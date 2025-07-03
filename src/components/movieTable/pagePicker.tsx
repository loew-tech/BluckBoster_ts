import { useState } from "react";
import "./pagePicker.css";

const ASCII_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PAGES = ["#123?!", ...ASCII_UPPERCASE.split("")];

type PagePickerProps = {
  activePage?: string;
  updateMovies: (s: string) => void;
};
export const PagePicker = ({ activePage, updateMovies }: PagePickerProps) => {
  const [currentPage, setCurrentPage] = useState<string>(activePage || "A");

  const selectPage = (page: string) => {
    if (page === currentPage) {
      return;
    }
    setCurrentPage(page);
    updateMovies(page);
  };

  return (
    <div className="page-picker">
      <ul>
        {PAGES.map((page) => {
          return (
            <li>
              <span
                onClick={() => selectPage(page)}
                className={page === currentPage ? "active-page" : ""}
              >
                {page}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
