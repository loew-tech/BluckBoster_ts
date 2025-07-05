import { ReactNode } from "react";
import { GridColumn, GridRow } from "semantic-ui-react";

type MoevieElementRowProps = {
  sectionTitle: string;
  content: ReactNode;
  key: string;
};
export const MovieElementRow = ({
  sectionTitle,
  content,
  key,
}: MoevieElementRowProps) => {
  return (
    <GridRow key={key}>
      <GridColumn>
        <h3>{sectionTitle}</h3>
      </GridColumn>
      <GridColumn>{content}</GridColumn>
    </GridRow>
  );
};
