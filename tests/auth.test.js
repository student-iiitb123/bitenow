import test from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../app/lib/auth.js";

test("Password Hashing & Verification", async (t) => {
  await t.test("should hash password correctly and verify valid password", async () => {
    const plainPassword = "mySecurePassword123";
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(plainPassword, salt);

    assert.notStrictEqual(plainPassword, hash);
    const isValid = await bcrypt.compare(plainPassword, hash);
    assert.strictEqual(isValid, true);
  });

  await t.test("should reject invalid password during comparison", async () => {
    const plainPassword = "mySecurePassword123";
    const wrongPassword = "wrongPassword456";
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(plainPassword, salt);

    const isValid = await bcrypt.compare(wrongPassword, hash);
    assert.strictEqual(isValid, false);
  });
});

test("JWT Token Lifecycle", async (t) => {
  await t.test("should generate and verify a valid JWT token", () => {
    const payload = { id: "507f1f77bcf86cd799439011", email: "user@example.com", role: "customer" };
    const token = generateToken(payload);

    assert.ok(token);
    assert.strictEqual(typeof token, "string");

    const decoded = verifyToken(token);
    assert.ok(decoded);
    assert.strictEqual(decoded.id, payload.id);
    assert.strictEqual(decoded.email, payload.email);
    assert.strictEqual(decoded.role, payload.role);
  });

  await t.test("should return null for tampered JWT token", () => {
    const payload = { id: "507f1f77bcf86cd799439011", email: "user@example.com", role: "customer" };
    const token = generateToken(payload);
    const tamperedToken = token.slice(0, -4) + "abcd";

    const decoded = verifyToken(tamperedToken);
    assert.strictEqual(decoded, null);
  });
});
