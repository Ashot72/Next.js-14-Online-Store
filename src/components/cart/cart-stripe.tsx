"use client";

import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import * as actions from "@/actions";
import MessageBox from "@/components/common/message-box";
import { PUBLISHABLE_STRIPE_KEY } from "@/stripe";

interface CartStripeProps {
  email: string;
  total: number;
}

export default function CartStripe({ email, total }: CartStripeProps) {
  const [token, setToken] = useState("");

  const [formState, action] = useFormState(
    actions.createPayment.bind(null, { token, total }),
    { errors: {} },
  );

  useEffect(() => {
    if (token) {
      action();
    }
  }, [token, action]);

  return (
    <>
      <StripeCheckout
        token={({ id }: { id: string }) => setToken(id)}
        amount={total * 100}
        email={email}
        stripeKey={PUBLISHABLE_STRIPE_KEY}
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
    </>
  );
}
