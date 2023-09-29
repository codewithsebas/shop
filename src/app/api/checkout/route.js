import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "90.00",
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: "90.00",
            },
          },
        },
        items: [
          {
            name: "Hola 1",
            description: "1",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "45.00",
            },
          },
          {
            name: "Hola 2",
            description: "2",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "45.00",
            },
          },
        ],
      },
    ],
  });

  const response = await client.execute(request);
  console.log(response);

  return NextResponse.json({
    id: response.result.id,
  });
}
