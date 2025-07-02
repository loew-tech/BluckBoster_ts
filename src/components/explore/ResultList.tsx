import { Container } from "semantic-ui-react";

interface Item {
  label?: string;
  link?: string;
}

interface Props {
  title: string;
  items: (string | Item)[];
}

export const ResultList = ({ title, items }: Props) => {
  return (
    <Container text className="explore-container">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => {
          if (typeof item === "string") {
            return <li key={index}>{item}</li>;
          } else {
            return (
              <li key={index}>
                {item.link ? <a href={item.link}>{item.label}</a> : item.label}
              </li>
            );
          }
        })}
      </ul>
    </Container>
  );
};
