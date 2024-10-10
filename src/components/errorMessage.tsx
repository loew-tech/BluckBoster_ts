import { MessageHeader, Message, Icon } from "semantic-ui-react";

type ErrorMessageProps = {
  msg: string;
};
export const ErrorMessage = ({ msg }: ErrorMessageProps) => {
  return (
    <div className="error-text">
      {/* @TODO: why is icon not showing up? */}
      <Message icon="frown">
        <MessageHeader>Whoops, something went wrong</MessageHeader>
        <p>{msg}</p>
      </Message>
    </div>
  );
};
