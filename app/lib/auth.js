import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "bitenow-dev-secret-change-in-production";
const JWT_EXPIRES_IN = "7d";

/**
 * Generate a JWT token for a user or restaurant
 * @param {Object} payload - { id, email, role }
 * @returns {string} JWT token
 */
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify a JWT token
 * @param {string} token
 * @returns {Object|null} decoded payload or null
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Extract the auth token from request headers
 * Checks Authorization: Bearer <token> header
 * @param {Request} request
 * @returns {string|null}
 */
export function getTokenFromRequest(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}

/**
 * Authenticate a request and return the decoded user
 * Returns { success: false, response, status } if auth fails
 * Returns { success: true, user } if auth succeeds
 */
export async function authenticate(request) {
  const token = getTokenFromRequest(request);

  if (!token) {
    return {
      success: false,
      response: { success: false, message: "Authentication required" },
      status: 401,
    };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      success: false,
      response: { success: false, message: "Invalid or expired token" },
      status: 401,
    };
  }

  return { success: true, user: decoded };
}

/**
 * Authenticate and verify the user is a restaurant owner
 */
export async function authenticateRestaurant(request) {
  const auth = await authenticate(request);
  if (!auth.success) return auth;

  if (auth.user.role !== "restaurant") {
    return {
      success: false,
      response: { success: false, message: "Restaurant access required" },
      status: 403,
    };
  }

  return auth;
}

/**
 * Authenticate and verify the user is a customer
 */
export async function authenticateCustomer(request) {
  const auth = await authenticate(request);
  if (!auth.success) return auth;

  if (auth.user.role !== "customer") {
    return {
      success: false,
      response: { success: false, message: "Customer access required" },
      status: 403,
    };
  }

  return auth;
}
