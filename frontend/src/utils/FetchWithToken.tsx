export async function fetchWithToken(url: string, options: RequestInit = {}) {

    // Get token from local storage
    const token = localStorage.getItem("token");

    // Add bearer token to headers
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
    };

    // Make fetch request
    const response = await fetch(url, {
        ...options,
        headers
    });

    return response;
}