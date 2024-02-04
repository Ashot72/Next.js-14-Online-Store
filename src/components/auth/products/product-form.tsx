"use client";

import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import MessageBox from "@/components/common/message-box";
import { Product } from "@prisma/client";

interface IProductFormProps {
  categoryId: string;
  product?: Product;
  placement: "left-end" | "right-end" | "right-start" | "left-start";
}

export default function ProductForm(
  { categoryId, product, placement }: IProductFormProps,
) {
  const [picture, setPicture] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [formState, action] = useFormState(
    actions.createOrUpdateProduct.bind(null, {
      categoryId,
      productId: product?.id,
    }),
    { errors: {}, success: false },
  );

  useEffect(() => {
    if (product) {
      setPicture(product.picture);
    }
  }, [product]);

  useEffect(() => {
    if (formState.success) {
      if (open) {
        setOpen(false);
      }
    }
  }, [formState, open]);

  const getPicture = (e: any) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      () => setPicture(reader.result as string),
      false,
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const setDefault = () => {
    formState.errors = {};
    setOpen(false);
    setPicture("");
  };

  const onPress = () => {
    if (product) {
      setPicture(product.picture);
    }
  };

  return (
    <Popover
      backdrop="blur"
      placement={placement}
      isOpen={open}
      onOpenChange={() => setOpen(true)}
    >
      <PopoverTrigger>
        <Button
          onPress={onPress}
          color="primary"
          variant="light"
          className="px-16"
        >
          {product ? "Edit" : "Add"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">{product ? "Update" : "Add"}</h3>
            <input name="image" type="hidden" defaultValue={picture} />
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter Name"
              defaultValue={product ? product.name : ""}
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Enter Description"
              defaultValue={product ? product.description : ""}
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            <Input
              name="price"
              label="Price"
              labelPlacement="outside"
              type="number"
              min="0.00"
              max="1000.00"
              step="0.01"
              placeholder="0.00"
              defaultValue={product && product.price.toString()}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              isInvalid={!!formState.errors.price}
              errorMessage={formState.errors.price?.join(", ")}
            />
            <Input
              name="count"
              label="Count"
              labelPlacement="outside"
              type="number"
              min="0"
              max="1000.00"
              step="1"
              placeholder="0"
              defaultValue={product && product.count.toString()}
              isInvalid={!!formState.errors.count}
              errorMessage={formState.errors.count?.join(", ")}
            />
            <input
              className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-gray-50 file:text-gray-700
                                    hover:file:bg-gray-100
                                    "
              name="imagePicker"
              type="file"
              accept="image/png"
              onChange={getPicture}
            />
            {
              <div className="text-xs text-center text-rose-700">
                {formState.errors.image?.join(", ")}
              </div>
            }

            <div className="flex justify-center">
              {picture &&
                (
                  <Image
                    className="rounded-lg"
                    src={picture}
                    alt="Product Picture"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    width={0}
                    height={0}
                  />
                )}
            </div>
            {formState.errors.form &&
              (
                <div>
                  <MessageBox
                    message={formState.errors.form.join(", ")}
                    color="warning"
                  />
                </div>
              )}
            <div className="flex justify-center gap-3">
              <FormButton variant="bordered">
                Save
              </FormButton>
              <Button onPress={setDefault}>
                Close
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
