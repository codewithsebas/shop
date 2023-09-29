"use client"

import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PayPalScriptProvider options={{
        clientId: "AYS7Kg1bSN1LBfnWN4EZYL12Q3p-Vt1pJJNjU-hTOZST5uKMycp60IyOHhi8tnNKQcFpWkOWVQcPUWh9"
      }}>
        <PayPalButtons

          createOrder={async (): Promise<any> => {
            const res = await fetch('/api/checkout', {
              method: "POST"
            })
            const order = await res.json()
            console.log(order)
            return order.id
          }}

          onApprove={async (data, actions): Promise<void> => {
            console.log(data)
            const action = await actions.order?.capture()
            console.log(action)
          }}

          onCancel={(data) => {
            console.log("Orden cancelada", data)
          }}

          onError={(error) => {
            console.log(error);

          }}
        />
      </PayPalScriptProvider>
      <Button>Shop New</Button>
      <ModeToggle></ModeToggle>
    </main>
  )
}
