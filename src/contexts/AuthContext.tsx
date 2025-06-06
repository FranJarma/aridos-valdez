import type { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

import { supabase, type Database } from "@/lib/supabase";

export interface AuthUser extends User {
  profile?: Database["public"]["Tables"]["users"]["Row"];
}

interface AuthContextType {
  hasPermissions: (permission: string[]) => boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: AuthUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions = {
  admin: ["read", "write", "delete", "manage_users", "view_reports"],
  operator: ["read", "write", "view_movements"],
  viewer: ["read"],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      const session = await supabase.auth.getSession();
      const authUser = session.data.session?.user;
      if (authUser) {
        await loadUserProfile(authUser);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    initSession();
  }, []);

  const loadUserProfile = async (authUser: User) => {
    try {
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();

      setUser({ ...authUser, profile: profile || undefined });
    } catch (error) {
      console.error("Error loading user profile:", error);
      setUser(authUser);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    } else {
      window.location.href = "/dashboard";
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    } else {
      window.location.href = "/";
    }
  };

  const hasPermissions = (permissions: string[]): boolean => {
    if (!user?.profile?.role) return false;
    const userPerms = rolePermissions[user.profile.role] || [];
    return permissions.every((perm) => userPerms.includes(perm));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        loading,
        hasPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
