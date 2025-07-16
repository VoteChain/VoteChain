// Find all our documentation at https://docs.near.org
import {
  NearBindgen,
  near,
  call,
  view,
  UnorderedMap,
  assert,
} from "near-sdk-js";
import { UserProfile } from "./models/UserProfile"; // Import the model
import { UserManager } from "./logic/UserManager"; // Import the logic manager
import { AccountId } from "./types/common";

@NearBindgen({})
class VoteChain {
  // Schema tells NEAR how to serialize collections
  static schema = {
    userProfiles: UnorderedMap,
  };

  // ====================
  // Storage Definitions
  // ====================
  // User profiles
  userProfiles: UnorderedMap<UserProfile> = new UnorderedMap<UserProfile>(
    "user_profiles"
  );

  /**
   * Get a user profile
   * @param walletId - Account ID of the user
   */
  @view({})
  get_user({ walletId }: { walletId: AccountId }): UserProfile | null {
    // Delegate again to manager logic
    return new UserManager(this.userProfiles).getUser(walletId);
  }

  @call({})
  add_user({
    walletId,
    name,
    about = "",
    email = "",
  }: {
    walletId: AccountId;
    name: string;
    about: string;
    email: string;
  }): void {
    // Delegate logic to the UserManager class
    new UserManager(this.userProfiles).addUser(walletId, name, about, email);
  }

  // Expose a method to update a user
  @call({})
  update_user({
    walletId,
    name,
    about,
    email,
  }: {
    walletId: AccountId;
    name: string;
    about: string;
    email: string;
  }) {
    new UserManager(this.userProfiles).updateUser(walletId, name, about, email);
  }
}
