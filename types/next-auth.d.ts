import NextAuth, {
  DefaultSession,
  DefaultUser,
  DefaultSeller,
} from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string | null;
      isAdmin?: boolean;
      isOwner?: boolean;
      isSeller?: boolean;
    } & DefaultSession["user"];

    seller: {
      _id?: string;
      isSeller?: boolean;
    } & DefaultSession["seller"];
  }

  export interface User extends DefaultUser {
    _id?: string;
    isAdmin?: boolean;
    isOwner?: boolean;
    isSeller?: boolean;
  }

  export interface Seller extends DefaultSeller {
    _id?: string;
    isSeller?: boolean;
  }
}
