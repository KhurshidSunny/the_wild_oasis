/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import Spinner from "../../ui/Spinner";

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { isLoading, signup } = useSignup();

  function onSubmit(data) {
    const { fullName, email, password, passwordConfirm, image } = data;

    signup(
      {
        fullName,
        email,
        password,
        passwordConfirm,
        image: image?.[0], // file input returns array
      },
      {
        onSettled: () => reset(),
      }
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords must match",
          })}
        />
      </FormRow>

      <FormRow label="Profile image (optional)">
        <Input
          type="file"
          id="image"
          accept="image/*"
          disabled={isLoading}
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
