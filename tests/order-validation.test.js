import test from "node:test";
import assert from "node:assert/strict";

// Status transition matrix logic from /api/orders/[id]/route.js
const VALID_TRANSITIONS = {
  placed: ["confirmed", "cancelled"],
  confirmed: ["preparing", "cancelled"],
  preparing: ["out_for_delivery"],
  out_for_delivery: ["delivered"],
  delivered: [],
  cancelled: [],
};

function canTransition(currentStatus, newStatus) {
  const allowed = VALID_TRANSITIONS[currentStatus] || [];
  return allowed.includes(newStatus);
}

function calculateOrderTotal(items, deliveryFee = 40) {
  const subtotal = items.reduce((sum, item) => {
    const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
    const price = Number(item.price);
    if (isNaN(price) || price < 0) throw new Error("Invalid price");
    return sum + price * qty;
  }, 0);
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}

test("Order Calculation & Server-Side Price Security", async (t) => {
  await t.test("should accurately calculate subtotal and total given trusted DB items", () => {
    const items = [
      { food_id: "1", name: "Burger", price: 150, quantity: 2 },
      { food_id: "2", name: "Fries", price: 80, quantity: 1 },
    ];
    const calc = calculateOrderTotal(items, 40);
    assert.strictEqual(calc.subtotal, 380); // (150*2) + (80*1) = 380
    assert.strictEqual(calc.deliveryFee, 40);
    assert.strictEqual(calc.total, 420);
  });

  await t.test("should reject calculation if price is negative or invalid", () => {
    const items = [{ food_id: "1", name: "Burger", price: -50, quantity: 1 }];
    assert.throws(() => calculateOrderTotal(items), /Invalid price/);
  });

  await t.test("should clamp invalid or negative quantities to minimum 1", () => {
    const items = [{ food_id: "1", name: "Pizza", price: 200, quantity: -5 }];
    const calc = calculateOrderTotal(items, 40);
    assert.strictEqual(calc.subtotal, 200);
    assert.strictEqual(calc.total, 240);
  });
});

test("Order Status Lifecycle Transitions", async (t) => {
  await t.test("should allow valid progressive transitions", () => {
    assert.strictEqual(canTransition("placed", "confirmed"), true);
    assert.strictEqual(canTransition("confirmed", "preparing"), true);
    assert.strictEqual(canTransition("preparing", "out_for_delivery"), true);
    assert.strictEqual(canTransition("out_for_delivery", "delivered"), true);
  });

  await t.test("should allow cancellation from placed or confirmed states", () => {
    assert.strictEqual(canTransition("placed", "cancelled"), true);
    assert.strictEqual(canTransition("confirmed", "cancelled"), true);
  });

  await t.test("should reject invalid status jumps or backward transitions", () => {
    assert.strictEqual(canTransition("placed", "delivered"), false);
    assert.strictEqual(canTransition("out_for_delivery", "preparing"), false);
    assert.strictEqual(canTransition("delivered", "cancelled"), false);
    assert.strictEqual(canTransition("cancelled", "confirmed"), false);
  });
});
