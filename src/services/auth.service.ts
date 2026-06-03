

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(data: {
  email: string;
  username: string;
  displayName: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  // console.log(result)

  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
}


export async function createWorkspace(data: {
  workspaceName: string;
  slug: string;
  description: string;
}) {
  const response = await fetch(`${API_URL}/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Workspace creation failed");
  }

  return result;
}

export async function joinWorkspace(data: {
  slug: string;
  inviteCode: string;
}) {
  const response = await fetch(`${API_URL}/workspaces/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Joining workspace failed");
  }

  return result;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // if using HTTP-only cookies
    body: JSON.stringify(data),
  });
  console.log(response)

  const result = await response.json();
  console.log(result)

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}

export async function requestPasswordReset(email: string) {
  const response = await fetch(
    `${API_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function verifyOtp(data: {
  email: string;
  otp: string;
}) {
  const response = await fetch(
    `${API_URL}/auth/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}


export async function resetPassword(data: {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await fetch(
    `${API_URL}/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}