import { ReactNode } from "react";
import { GridColumn, GridRow } from "semantic-ui-react";

type MoevieElementRowProps = {
  sectionTitle: string;
  content: ReactNode;
};
export const MovieElementRow = ({
  sectionTitle,
  content,
}: MoevieElementRowProps) => {
  return (
    <GridRow>
      <GridColumn>
        <h3>{sectionTitle}</h3>
      </GridColumn>
      <GridColumn>{content}</GridColumn>
    </GridRow>
  );
};
