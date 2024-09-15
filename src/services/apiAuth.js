import supabase, { supabaseUrl } from "./supabase";

//  Creating user

export async function signUp({ fullName, email, password }) {
  // Checking if the email already exist
  // const { data: existingUser, error: userCheckError } =
  //   await supabase.auth.getUser(email);

  // if (existingUser) {
  //   throw new Error("❗ This email already exist. Try another one please");
  // }

  // if (userCheckError && userCheckError.status !== 404) {
  //   throw new Error(userCheckError.message);
  // }

  // creating a new user

  const { data: userData, error } = await supabase.auth.signUp({
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
    email,
    password,
  });

  if (error) throw new Error(error.message);

  // if (error) throw new Error(error.message);

  return { userData };
}

// Login
export async function login({ email, password }) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  //   console.log(data);

  return user;
}

// Logout

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// Getting the currentr user
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: user, error } = await supabase.auth.getUser();

  // const { data: user, error } = await supabase
  //   .from("auth.users")
  //   .select("id, email, fullName, avatar")
  //   .eq("id", session.user.id)
  //   .single();

  if (error) throw new Error(error.message);

  return user?.user;
}

// Updating user information

export async function updateCurrentUser({ password, fullName, avatar }) {
  //  1 - Update fullName or password
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  // 2 - Upload the avatar image
  if (!avatar) return;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);
  //  3 - Update avatar in the user
  const { data: updatedUser, error: errorUpdatingUser } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        fullName,
      },
    });

  if (errorUpdatingUser) throw new Error(errorUpdatingUser.message);

  return updatedUser;
}
