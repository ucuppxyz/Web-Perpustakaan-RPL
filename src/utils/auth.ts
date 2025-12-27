import { createClient } from './supabase/client';
import { projectId, publicAnonKey } from './supabase/info';

const supabase = createClient();

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  memberSince: string;
  booksRead: number;
  role?: 'admin' | 'reader';
}

// Signup with email/password
export async function signup(name: string, email: string, password: string): Promise<{ success: boolean; error?: string; user?: AuthUser }> {
  try {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dd63e494/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Signup failed' };
    }

    // After successful signup, sign in the user
    const signInResult = await signIn(email, password);
    return signInResult;

  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: 'Network error during signup' };
  }
}

// Sign in with email/password
export async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string; user?: AuthUser; accessToken?: string }> {
  try {
    console.log('Attempting sign in for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error.message);
      return { success: false, error: error.message };
    }

    if (!data.session) {
      console.error('No session created after sign in');
      return { success: false, error: 'No session created' };
    }

    console.log('Sign in successful, getting user profile...');

    // Get user profile from server
    const userProfile = await getUserProfile(data.session.access_token);
    
    if (!userProfile) {
      console.error('Failed to get user profile after sign in');
      return { success: false, error: 'Failed to get user profile' };
    }

    console.log('User profile retrieved successfully:', userProfile.name);

    return { 
      success: true, 
      user: userProfile,
      accessToken: data.session.access_token,
    };

  } catch (error) {
    console.error('Sign in exception:', error);
    return { success: false, error: 'Network error during sign in' };
  }
}

// Sign in with Google
export async function signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Google sign in error:', error);
      
      // Check if it's a provider not enabled error
      if (error.message.toLowerCase().includes('provider') && error.message.toLowerCase().includes('not') && error.message.toLowerCase().includes('enabled')) {
        return { 
          success: false, 
          error: 'Google login belum dikonfigurasi. Silakan ikuti instruksi di file SETUP_GOOGLE_AUTH.md untuk mengaktifkan Google OAuth.' 
        };
      }
      
      return { success: false, error: error.message };
    }

    return { success: true };

  } catch (error) {
    console.error('Google sign in error:', error);
    return { success: false, error: 'Network error during Google sign in' };
  }
}

// Sign out
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };

  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: 'Network error during sign out' };
  }
}

// Get current session
export async function getSession(): Promise<{ success: boolean; user?: AuthUser; accessToken?: string; error?: string }> {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Get session error:', error);
      return { success: false, error: error.message };
    }

    if (!data.session) {
      return { success: false };
    }

    // Get user profile from server
    const userProfile = await getUserProfile(data.session.access_token);
    
    if (!userProfile) {
      return { success: false, error: 'Failed to get user profile' };
    }

    return { 
      success: true, 
      user: userProfile,
      accessToken: data.session.access_token,
    };

  } catch (error) {
    console.error('Get session error:', error);
    return { success: false, error: 'Network error getting session' };
  }
}

// Get user profile from server
async function getUserProfile(accessToken: string): Promise<AuthUser | null> {
  try {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dd63e494/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to get user profile');
      return null;
    }

    const userData = await response.json();
    return userData;

  } catch (error) {
    console.error('Get user profile error:', error);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(accessToken: string, updates: Partial<AuthUser>): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-dd63e494/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error || 'Update failed' };
    }

    return { success: true };

  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: 'Network error updating profile' };
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.access_token) {
      const userProfile = await getUserProfile(session.access_token);
      callback(userProfile);
    } else {
      callback(null);
    }
  });
}