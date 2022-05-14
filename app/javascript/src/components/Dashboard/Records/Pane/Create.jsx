import React from "react";

import { Pane, Typography } from "neetoui";

import Form from "./Form";


export default function NewRecordPane({ fetchRecords, showPane, setShowPane }) {
  const onClose = () => setShowPane(false);

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add new Record
        </Typography>
      </Pane.Header>
      <Form
        onClose={onClose}
        refetch={fetchRecords}
      />
    </Pane>
  );
}
