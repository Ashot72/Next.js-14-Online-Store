"use client";

import { useFormState } from "react-dom";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Image from "next/image";
import { ProductWithData } from "@/db/queries/products";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";
import MessageBox from "@/components/common/message-box";
import { lnToBr } from "@/helper";

export default function ProductView({ product }: { product: ProductWithData }) {
  const [formState, action] = useFormState(actions.addToCart, { errors: {} });

  return (
    <Card>
      <CardHeader className="justify-between gap-3">
        <div className="flex gap-5">
          <Avatar isBordered src={product.user.image || ""} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small leading-none font-semibold text-default-600">
              {product.user.name}
            </h4>
            <h5 className="text-small tracking-tight text-primary-600">
              <a href={`mailto:${product.user.email}`}>{product.user.email}</a>
            </h5>
          </div>
        </div>
        <form action={action}>
          <input type="hidden" name="productId" value={product.id} />
          <FormButton color="primary" variant="solid">
            Add to Cart
          </FormButton>
        </form>
        {formState.errors.form &&
          (
            <div>
              <MessageBox
                message={formState.errors.form.join(", ")}
                color="warning"
              />
            </div>
          )}
      </CardHeader>
      <CardBody className="p-3 text-small">
        <h1 className="text-center text-lg pb-2">{product.name}</h1>
        <div className="flex gap-3 px-16">
          <Image
            src={product.picture}
            alt="Product Picture"
            style={{
              width: "200px",
              height: "100%",
            }}
            width={0}
            height={0}
            className="rounded-lg mt-2"
          />

          <div className="leading-6">
            <span
              dangerouslySetInnerHTML={{
                __html: lnToBr(product.description),
              }}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between gap-3 px-20">
        <div className="flex gap-1">
          <p className="text-small">Price:</p>
          <p className="font-semibold text-small">${product.price}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-small">Count:</p>
          <p className="font-semibold text-small">{product.count}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
