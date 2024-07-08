export async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token", error);
    return null;
  }
}

export async function verifyToken() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/verify-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return await verifyToken();
      }
    }

    if (!response.ok) {
      throw new Error("Error verifying token");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying token", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
}
