/* eslint-disable no-unused-vars */
import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRowVertical";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import FormRowVertical from "../../ui/FormRowVertical";
import { useUpdateUser } from "./useUpdateUser";
import { useNavigate } from "react-router-dom";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {user} = useUser();
  const {name, email, _id:id} = user;

  const [fullName, setFullName] = useState(name);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();


  const { isUpdating, updateUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar, email, id},
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
          navigate("/");
        },
      }
    );
  }

  function handleCancel() {
    setFullName(name);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input value={email} disabled />
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
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
