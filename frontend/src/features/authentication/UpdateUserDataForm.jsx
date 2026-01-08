/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import { useUser } from "./useUser";
import FormRowVertical from "../../ui/FormRowVertical";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { user, isLoading } = useUser();
  const { isUpdating, updateUser } = useUpdateUser();

  // Handle different user field names (name/fullName, _id/id, photo/image)
  const userName = user?.name || user?.fullName || "";
  const userEmail = user?.email || "";
  const userId = user?._id || user?.id || "";

  const [fullName, setFullName] = useState(userName);
  const [avatar, setAvatar] = useState(null);

  // Update form when user data loads or changes
  useEffect(() => {
    if (user) {
      setFullName(userName);
    }
  }, [user, userName]);

  if (isLoading) return <Spinner />;
  if (!user) return <div>Please log in to update your account</div>;

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar, email: userEmail, id: userId },
      {
        onSuccess: () => {
          setAvatar(null);
          // Form will update automatically via useUser hook
        },
      }
    );
  }

  function handleCancel() {
    setFullName(userName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input value={userEmail} disabled />
      </FormRowVertical>
      <FormRowVertical label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
