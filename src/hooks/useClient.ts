import axios, { AxiosInstance } from "axios";

import { useUserContext } from "@/context/UserContext";

/**
 * Returns an Axios client instance with the current user's auth token
 * set as a 'Authorization' header.
 *
 * @param options.throwIfNotAuthenticated - Whether or not the hook should
 *   throw an error if the user is not authenticated. Defaults to true.
 *
 * @throws Will throw an error if the user is not authenticated.
 *   This can be configured through options.
 */
function useClient(): Promise<AxiosInstance>;
function useClient({
  throwIfNotAuthenticated,
}: {
  throwIfNotAuthenticated?: true;
}): Promise<AxiosInstance>;
function useClient({
  throwIfNotAuthenticated,
}: {
  throwIfNotAuthenticated: false;
}): Promise<AxiosInstance> | null;
function useClient({
  throwIfNotAuthenticated = true,
}: {
  throwIfNotAuthenticated?: boolean;
} = {}) {
  const user = useUserContext();
  if (!user) {
    if (throwIfNotAuthenticated) {
      throw new Error("The user is not authenticated.");
    } else {
      return null;
    }
  }

  const generateAxiosInstance = async () => {
    const authToken = await user.getIdToken();
    return axios.create({
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    });
  };

  return generateAxiosInstance();
}

export { useClient };
