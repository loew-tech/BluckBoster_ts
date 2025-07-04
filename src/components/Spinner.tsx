import "./spinner.css";

type SpinnerProps = {
  message?: string;
};
export const Spinner = ({ message = "Loading..." }: SpinnerProps) => (
  <div className="spinner">{message}</div>
);
