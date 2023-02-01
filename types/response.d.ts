import { Profile } from "./profile";

export interface ProfileResponse {
  type: string;
  data: Profile;
  message: string;
}
