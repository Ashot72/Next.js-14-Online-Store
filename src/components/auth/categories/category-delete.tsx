"use client";

import { useFormState } from "react-dom";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import DeleteConfirm from "@/components/common/delete-confirm";
import MessageBox from "@/components/common/message-box";

export default function CategoryDelete(
  { id, name }: { id: string; name: string },
) {
  const [pending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formState, action] = useFormState(
    actions.deleteCategory.bind(null, { id }),
    { errors: {} },
  );

  useEffect(() => {
    if (formState.errors) {
      setIsPending(false);
    }
  }, [formState]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const onConfirmClick = (isOpen: boolean) => {
    if (!isOpen) {
      setIsPending(true);
      action();
    }
    setIsOpen(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Button
          type="submit"
          color="primary"
          variant="light"
          isLoading={pending}
        >
          Delete
        </Button>

        {formState.errors.form &&
          (
            <div>
              <MessageBox
                message={formState.errors.form.join(", ")}
                color="warning"
              />
            </div>
          )}
      </form>
      <DeleteConfirm
        title={`category '${name}'`}
        isOpen={isOpen}
        onConfirmClick={onConfirmClick}
      />
    </div>
  );
}
