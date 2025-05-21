import "./pagePicker.css";

const ASCII_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PAGES = ["#123?!", ...ASCII_UPPERCASE.split("")];

type PagePickerProps = {
  updateMovies: (s: string) => void;
};
export const PagePicker = ({ updateMovies }: PagePickerProps) => {
  return (
    <div style={{ backgroundColor: "lightblue", height: "100%" }}>
      <ul>
        {PAGES.map((page) => {
          return (
            <li key={page} onClick={() => updateMovies(page)}>
              {page}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
