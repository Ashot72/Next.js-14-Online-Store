"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import MessageBox from "@/components/common/message-box";

interface CategoryFormProps {
  parentId?: string;
  isOpen?: boolean;
  name?: string;
}

export default function CategoryForm(
  { parentId, isOpen, name }: CategoryFormProps,
) {
  const [open, setOpen] = useState(isOpen);
  const ref = useRef<HTMLFormElement | null>(null);

  const [formState, action] = useFormState(
    actions.createOrUpdateCategory.bind(null, { parentId, name }),
    { errors: {}, success: false },
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!isOpen) {
        setOpen(false);
      }
    }
  }, [formState, isOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Input
          className="w-96"
          size="sm"
          name="name"
          placeholder="Enter category name"
          defaultValue={name}
          isInvalid={!!formState.errors.name}
          errorMessage={formState.errors.name?.join(", ")}
        />

        {formState.errors.form &&
          (
            <div>
              <MessageBox
                message={formState.errors.form.join(", ")}
                color="warning"
              />
            </div>
          )}
        <FormButton>
          Save
        </FormButton>
      </div>
    </form>
  );

  return (
    <div className="px-16">
      <Button
        color="primary"
        variant="light"
        className="mb-2"
        onPress={() => setOpen(!open)}
      >
        {open ? "Hide" : name ? "Update" : "Add"}
      </Button>
      {open && form}
    </div>
  );
}
