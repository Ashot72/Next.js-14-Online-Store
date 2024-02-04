import { CartProducts } from "@prisma/client";
import { CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { lnToBr } from "@/helper";

export default function PaymentView(
  { paymentProduct }: { paymentProduct: CartProducts },
) {
  return (
    <>
      <CardBody className="p-3 text-small">
        <h1 className="text-center text-lg pb-2">{paymentProduct.name}</h1>
        <div className="flex gap-3 px-16">
          <Image
            src={paymentProduct.picture}
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
                __html: lnToBr(paymentProduct.description),
              }}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between gap-3 px-20">
        <div className="flex gap-1">
          <p className="text-small">Price:</p>
          <p className="font-semibold text-small">${paymentProduct.price}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-small">Qty:</p>
          <p className="font-semibold text-small">{paymentProduct.qty}</p>
        </div>
      </CardFooter>
    </>
  );
}
