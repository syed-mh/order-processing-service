import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

/**
 * Here is my implementation of the exponential
 * retry mechanism that would enable users to
 * safely re-attempt failed API calls due to
 * hypothetical server rate limits or network
 * connectivity issues.
 *
 * The retry mechanism is configured to try a
 * maximum of 5 times in an effort to not overaload
 * edge devices or servers when an API stops
 * responding as expected for any given reason.
 *
 * The retries would occur at (relative to the failed call):
 * - 1 second   (+1)
 * - 3 seconds  (+2)
 * - 7 seconds  (+4)
 * - 15 seconds (+8)
 * - 31 seconds (+16)
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    const maxRetries = 5;

    // Set up retry count if it doesn't exist on the request config
    if (!config.retryCount) config.retryCount = 0;

    // Retry with exponential backoff
    if (config.retryCount < maxRetries) {
      config.retryCount += 1;
      const delay = Math.pow(2, config.retryCount) * 1000; // 1s, 2s, 4s, etc.

      console.log({ config });

      await new Promise((resolve) => setTimeout(resolve, delay));
      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;
