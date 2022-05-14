import React, { useState, useEffect } from "react";

import EmptyListImage from "images/EmptyList";
import { Button } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import API from "apis/records";
import EmptyState from "components/Common/EmptyState";

import NewRecordPane from "./Pane/Create";

import RecordsTable from "./RecordsTable";

function Records() {
  const [records, setRecords] = useState([]);
  const [showNewRecordPane, setShowNewRecordPane] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await API.fetch();
      setRecords(response.data.records);
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Container>
      <Header
        title="Files"
        actionBlock={
          <Button
            onClick={() => setShowNewRecordPane(true)}
            label="Add New File"
            icon="ri-add-line"
          />
        }
      />
      {records.length ? (
        <RecordsTable fetchRecords={fetchRecords} records={records} />
      ) : (
        <div className="h-screen w-screen">
          <EmptyState
            image={EmptyListImage}
            title="Looks like you don't have any Files!"
          />
        </div>
      )}

      <NewRecordPane
        showPane={showNewRecordPane}
        setShowPane={setShowNewRecordPane}
        fetchRecords={fetchRecords}
      />
    </Container>
  );
}

export default Records;
