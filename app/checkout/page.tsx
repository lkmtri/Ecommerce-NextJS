"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/components/store/cart-store";
import { Button } from "@/components/ui/button";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const formattedAmount = (amount: number) => {
    return (amount / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center"> Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    ${formattedAmount(item.price * item.quantity)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}>
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}>
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-4 border-t pt-2 text-lg font-semibold">
            <span>Total: </span>
            <span>${formattedAmount(total)}</span>
          </div>
        </CardContent>
      </Card>

      <form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant="default" className="w-full">
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}
