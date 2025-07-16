import { near } from "near-sdk-js";
import { AccountId } from "../types/common";

/**
 * Represents a user profile
 *
 * Note: Passwords are not stored on-chain for security reasons.
 * NEAR uses public-key cryptography for authentication.
 */
export class UserProfile {
  // Constructor with public fields
  constructor(
    public walletId: AccountId,
    public name: string,
    public about: string = "",
    public email: string = "",
    public dateJoined: string = near.blockTimestamp().toString()
  ) {}

  /**
   * Register or update user profile
   *
   * @param name - User's display name
   * @param about - About text
   * @param email - Email text
   */
  updateProfile(
    name: string = this.name,
    about: string = this.about,
    email: string = this.email
  ) {
    this.name = name;
    this.about = about;
    this.email = email;
  }
}
