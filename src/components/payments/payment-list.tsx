import PaymentView from "@/components/payments/payment-view";
import { Avatar, Card, CardHeader, Chip } from "@nextui-org/react";
import db from "@/db";
import { auth } from "@/auth";
import MessageBox from "@/components/common/message-box";
import { Payments } from "@prisma/client";

export default async function PaymentList() {
  const session = await auth();

  if (!session || !session.user) {
    return <div>You must sign in to do this</div>;
  }

  const user = session.user;

  let payments: Payments[];
  try {
    payments = await db.payments.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    if (err instanceof Error) {
      return <MessageBox message={err.message} color="danger" />;
    } else {
      return <div>Something went wrong...</div>;
    }
  }

  const formatDate = (date: Date) =>
    date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

  const total = (payment: Payments) =>
    payment.products.reduce((total, item) => (item.price * item.qty) + total, 0);

  const renderedPayments = payments.map((payment) => (
    <Card key={payment.id}>
      <CardHeader className="justify-between gap-3">
        <div className="flex gap-5">
          <Avatar isBordered src={user.image || ""} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small leading-none font-semibold text-default-600">
              {user?.name}
            </h4>
            <h5 className="text-small tracking-tight text-primary-600">
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </h5>
          </div>
        </div>
        <div className="flex gap-3">
          <Chip className="bg-opacity-75" color="primary">
            {`Total: $${total(payment).toFixed(2)}`}
          </Chip>
          <Chip className="bg-opacity-75" color="primary">
            {formatDate(payment.createdAt)}
          </Chip>
        </div>
      </CardHeader>

      {payment.products.map((p) => (
        <PaymentView
          key={p.id}
          paymentProduct={p}
        />
      ))}
    </Card>
  ));

  return (
    <div className="space-y-3 px-16">
      {renderedPayments}
    </div>
  );
}
