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
import { useSession } from "next-auth/react";
import { CartProducts } from "@prisma/client";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import MessageBox from "@/components/common/message-box";
import { lnToBr } from "@/helper";

export default function CartView(
  { cartProduct }: { cartProduct: CartProducts },
) {
  const { data: session } = useSession();

  const [formStateAdd, actionAdd] = useFormState(actions.add, { errors: {} });
  const [formStateRemove, actionRemove] = useFormState(actions.remove, {
    errors: {},
  });

  const user = session?.user;
  return (
    <Card>
      <CardHeader className="justify-between gap-3">
        <div className="flex gap-5">
          <Avatar isBordered src={user?.image || ""} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small leading-none font-semibold text-default-600">
              {user?.name}
            </h4>
            <h5 className="text-small tracking-tight text-primary-600">
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </h5>
          </div>
        </div>
        <div className="flex gap-3">
          <form action={actionAdd}>
            <input type="hidden" name="productId" value={cartProduct.id} />
            <FormButton color="primary" variant="solid" size="sm">
              +
            </FormButton>
          </form>
          <div className="mt-1">{cartProduct.qty}</div>
          <form action={actionRemove} className="flex gap-3">
            <input type="hidden" name="productId" value={cartProduct.id} />
            <FormButton color="primary" variant="solid" size="sm">
              -
            </FormButton>
          </form>
        </div>
        {formStateAdd.errors.form &&
          (
            <div>
              <MessageBox
                message={formStateAdd.errors.form?.join(", ")}
                color="warning"
              />
            </div>
          )}
        {formStateRemove.errors.form &&
          (
            <div>
              <MessageBox
                message={formStateRemove.errors.form?.join(", ")}
                color="warning"
              />
            </div>
          )}
      </CardHeader>
      <CardBody className="p-3 text-small">
        <h1 className="text-center text-lg pb-2">{cartProduct.name}</h1>
        <div className="flex gap-3 px-16">
          <Image
            src={cartProduct.picture}
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
                __html: lnToBr(cartProduct.description),
              }}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between gap-3 px-20">
        <div className="flex gap-1">
          <p className="text-small">Price:</p>
          <p className="font-semibold text-small">${cartProduct.price}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-small">Qty:</p>
          <p className="font-semibold text-small">{cartProduct.qty}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
