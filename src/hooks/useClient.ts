import axios from "axios";

import useUserContext from "@/context/UserContext";

/**
 * Returns an Axios client instance with the current user's auth token
 * set as a 'Authentication' header.
 *
 * @throws Will throw and error if the user is not authenticated.
 */
async function useClient() {
  const user = useUserContext();
  if (!user) {
    throw new Error("The user is not authenticated.");
  }

  const authToken = await user.getIdToken();
  const instance = axios.create({
    headers: {
      Authentication: authToken,
    },
  });

  return instance;
}

export { useClient };
