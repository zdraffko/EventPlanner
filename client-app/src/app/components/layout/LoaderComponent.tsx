import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface IProps {
  content?: string;
}

const LoaderComponent: React.FC<IProps> = ({ content = "Loading" }) => (
  <Dimmer active inverted>
    <Loader>{content}</Loader>
  </Dimmer>
);

export default LoaderComponent;
