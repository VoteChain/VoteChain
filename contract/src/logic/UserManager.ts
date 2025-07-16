import { UnorderedMap, assert, near } from "near-sdk-js"; // NEAR collection
import { UserProfile } from "../models/UserProfile"; // Import the UserProfile class
import { AccountId } from "../types/common";

// A class that handles all user-related logic using an injected UnorderedMap
export class UserManager {
  // User profiles
  constructor(private users: UnorderedMap<UserProfile>) {} // Inject the map

  // Add a new user
  addUser(walletId: AccountId, name: string, about: string, email: string) {
    // Check if user already exist
    const old = this.users.get(walletId); // Fetch user
    if (old) throw new Error("User already exist"); // Fail if found

    const user = new UserProfile(walletId, name, about, email); // Create a new user
    this.users.set(walletId, user); // Save it to the UnorderedMap
  }

  // Get an existing user
  getUser(walletId: AccountId) {
    return this.users.get(walletId); // Retrieve by walletId
  }

  // Update an existing user
  updateUser(walletId: AccountId, name: string, about: string, email: string) {
    const raw = this.users.get(walletId); // Fetch user
    if (!raw) throw new Error("User not found"); // Fail if not found

    // Reconstruct it as a proper UserProfile instance
    const user = new UserProfile(raw.walletId, raw.name, raw.about, raw.email);

    user.updateProfile(name, about, email); // Update via model method
    this.users.set(walletId, user); // Save updated user
  }

  // Remove user
  removeUser(walletId: AccountId){
    // Remove the user
    this.users.remove(walletId);
  }
}
