import { MessageHeader, Message, Icon } from "semantic-ui-react";

import "./errorMessage.css";

type ErrorMessageProps = {
  msg: string;
};
export const ErrorMessage = ({ msg }: ErrorMessageProps) => {
  return (
    <div className="error-text">
      <Message>
        <Icon name="frown" />
        <MessageHeader>Whoops, something went wrong</MessageHeader>
        <p>{msg}</p>
      </Message>
    </div>
  );
};
