import React from "react";
import { useHistory } from "react-router-dom";

import { BackButton } from "@core/core/components/base";

export default function PrevPageIcon(props: { link?: string }) {
  const history = useHistory();
  const { link } = props;
  return (
    <BackButton
      onClick={() => {
        if (link === undefined) {
          history.goBack();
        } else {
          history.push(link);
        }
      }}
    />
  );
}
