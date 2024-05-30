import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./dbConnect";
import UserModel from "./models/UserModel";
import SellerModel from "./models/SellerModel";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        if (credentials == null) return null;

        const user = await UserModel.findOne({ email: credentials.email });
        const seller = await SellerModel.findOne({
          email: credentials.email,
        });

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return user;
          }
        }

        if (seller) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            seller.password
          );
          if (isMatch) {
            return seller;
          }
        }
        return null;
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/register",
    newSeller: "/seller/sellerinfo",
    error: "/",
  },
  callbacks: {
    async jwt({ user, seller, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          isOwner: user.isOwner,
        };
      }
      if (seller) {
        token.seller = {
          _id: seller._id,
          email: seller.email,
          name: seller.name,
          isSeller: seller.isSeller,
        };
      }
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        };
      }
      if (trigger === "update" && session) {
        token.seller = {
          ...token.seller,
          email: session.seller.email,
          name: session.seller.name,
        };
      }
      if (trigger === "github" && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        };
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
        session.seller = token.seller;
      }
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
