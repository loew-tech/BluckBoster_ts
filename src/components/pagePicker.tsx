const ASCII_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PAGES = ["#123?!", ...ASCII_UPPERCASE.split("")];

type PagePickerProps = {
  updateMovies: (s: string) => void;
};
export const PagePicker = ({ updateMovies }: PagePickerProps) => {
  return (
    <ul
      style={{
        display: "inline",
        listStyle: "none",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {PAGES.map((page, i) => {
        return (
          <li
            style={{ display: "inline", color: "blue" }}
            onClick={() => updateMovies(page)}
          >
            {i ? " | " : null}
            {page}
          </li>
        );
      })}
    </ul>
  );
};
