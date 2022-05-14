import React, {useState} from "react";

import { Alert, Toastr } from "@bigbinary/neetoui";

import API from "apis/records";

const DeleteAlert = ({ refetch, onClose, selectedRecord }) => {

const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const response = await API.destroy(selectedRecord.id);
      onClose();
      refetch();
      Toastr.success(response.notice);
    } catch (err) {
      Toastr.error(err);
      setDeleting(false);
    }
  };
  return (
    <Alert
      isOpen
      onSubmit={handleDelete}
      onClose={onClose}
      message="Are you sure you want to continue? This cannot be undone."
      title={`Delete ${selectedRecord.title}`}
      isSubmitting={deleting}
    />
  );
};

export default DeleteAlert;
