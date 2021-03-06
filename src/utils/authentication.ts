import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification as sendEmailVerificationFirebase,
  sendPasswordResetEmail as sendPasswordResetEmailFirebase,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";

/** Creates an account with an email and a password for the user. */
export const signUpWithPassword = (email: string, password: string) =>
  createUserWithEmailAndPassword(getAuth(), email, password);

/** Signs-in the user with an email and a password.  */
export const signInWithPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(getAuth(), email, password);

/** Signs-out the user. */
export const signOut = () => firebaseSignOut(getAuth());

/** Sends an email verification letter to the user's email.  */
export const sendEmailVerification = () => {
  const { currentUser } = getAuth();

  if (!currentUser) {
    throw new Error(
      "We must have a signed-in user before sending a verification email!",
    );
  }

  return sendEmailVerificationFirebase(currentUser);
};

/** Sends a password reset letter to the specified  */
export const sendPasswordResetEmail = (email: string) =>
  sendPasswordResetEmailFirebase(getAuth(), email);

/**
 * Waits until the Firebase SDK checks the user's authentication token.
 * When the app is loaded it takes some time for Firebase to check the token
 * saved locally.
 */
export async function waitForInitialAuthChecking() {
  if (waitForInitialAuthChecking.done) return;

  const auth = getAuth() as Auth & { operations: Promise<unknown> };
  await auth.operations;
  waitForInitialAuthChecking.done = true;
}
waitForInitialAuthChecking.done = false;
