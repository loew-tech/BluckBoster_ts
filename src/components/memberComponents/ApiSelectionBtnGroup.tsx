import { useState } from "react";

import { getAPIChoiceFromCookie } from "../../utils/cookieUtils";
import { setAPIChoice } from "../../utils/utils";
import { Button, ButtonGroup, ButtonOr, Icon, Label } from "semantic-ui-react";
import { GRAPHQL_API, REST_API } from "../../constants/constants";

export const ApiSelectionBtnGroup = () => {
  const api = getAPIChoiceFromCookie();

  const [activeButton, setActiveButton] = useState<string>(api);

  const toggleActiveButton = (selection: string) => {
    setActiveButton(selection);
    if (
      selection !== api &&
      (selection === REST_API || selection === GRAPHQL_API)
    ) {
      setAPIChoice(selection);
    }
  };

  return (
    <div>
      <div>
        <Label className="active-api-label">
          <Icon name="database" />
          Currently running on {activeButton}
        </Label>
      </div>
      <ButtonGroup style={{ marginTop: "1rem" }}>
        <Button
          onClick={() => toggleActiveButton("REST")}
          className={activeButton === "REST" ? "selected" : ""}
        >
          REST
        </Button>
        <ButtonOr />
        <Button
          onClick={() => toggleActiveButton("GraphQL")}
          className={activeButton === "GraphQL" ? "selected" : ""}
        >
          GraphQL
        </Button>
      </ButtonGroup>
    </div>
  );
};
