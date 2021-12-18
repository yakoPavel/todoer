import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";

type ProviderType = "google" | "facebook" | "yahoo";

function getProvider(providerType: ProviderType) {
  switch (providerType) {
    case "google":
      return new GoogleAuthProvider();
    case "facebook":
      return new FacebookAuthProvider();
    case "yahoo":
      return new OAuthProvider("yahoo.com");
    default:
      throw new Error("Unsupported provider");
  }
}

/**
 * Signs in the user through one of the providers.
 *
 * @param providerType - A type of the provider to sign in through.
 */
export function signInThroughProvider(providerType: ProviderType) {
  const provider = getProvider(providerType);
  const auth = getAuth();

  return signInWithPopup(auth, provider);
}
