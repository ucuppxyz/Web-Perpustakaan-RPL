import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client with service role for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-dd63e494/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint
app.post("/make-server-dd63e494/signup", async (c) => {
  try {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ error: 'Name, email, and password are required' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    if (!data.user) {
      return c.json({ error: 'Failed to create user' }, 500);
    }

    // Store additional user data in KV store
    const userId = data.user.id;
    const userData = {
      name,
      email,
      memberSince: new Date().toISOString(),
      booksRead: 0,
      avatar: '',
      role: 'reader' as const, // Default role is reader
    };

    await kv.set(`user:${userId}`, JSON.stringify(userData));

    return c.json({ 
      success: true, 
      user: {
        id: userId,
        email,
        name,
      }
    });

  } catch (error) {
    console.log(`Signup server error: ${error}`);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-dd63e494/user/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log(`Get user error: ${error?.message}`);
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    // Get user data from KV store
    const userDataJson = await kv.get(`user:${user.id}`);
    
    if (!userDataJson) {
      // If user data doesn't exist in KV (e.g., Google sign-in), create it
      const userData = {
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        memberSince: new Date().toISOString(),
        booksRead: 0,
        avatar: user.user_metadata?.avatar_url || '',
        role: 'reader' as const, // Default role is reader
      };
      await kv.set(`user:${user.id}`, JSON.stringify(userData));
      return c.json(userData);
    }

    const userData = JSON.parse(userDataJson);
    return c.json(userData);

  } catch (error) {
    console.log(`Get profile server error: ${error}`);
    return c.json({ error: 'Internal server error while getting profile' }, 500);
  }
});

// Update user profile endpoint
app.put("/make-server-dd63e494/user/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log(`Update user auth error: ${error?.message}`);
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    const updates = await c.req.json();
    
    // Get current user data
    const currentDataJson = await kv.get(`user:${user.id}`);
    const currentData = currentDataJson ? JSON.parse(currentDataJson) : {};

    // Merge updates with current data
    const updatedData = {
      ...currentData,
      ...updates,
    };

    await kv.set(`user:${user.id}`, JSON.stringify(updatedData));

    return c.json({ success: true, user: updatedData });

  } catch (error) {
    console.log(`Update profile server error: ${error}`);
    return c.json({ error: 'Internal server error while updating profile' }, 500);
  }
});

// Seed demo accounts endpoint (for testing/demo purposes only)
app.post("/make-server-dd63e494/seed-demo-accounts", async (c) => {
  try {
    console.log('=== Seed Demo Accounts Started ===');
    
    const demoAccounts = [
      {
        name: 'Admin Demo',
        email: 'admin@perpustakaandigital.com',
        password: 'Demo123!Admin',
        role: 'admin' as const,
        booksRead: 50,
      },
      {
        name: 'Pembaca Demo',
        email: 'pembaca@perpustakaandigital.com',
        password: 'Demo123!Pembaca',
        role: 'reader' as const,
        booksRead: 15,
      },
    ];

    const results = [];

    for (const account of demoAccounts) {
      try {
        console.log(`Processing account: ${account.email}`);
        
        // Check if user already exists
        const { data: existingUser, error: listError } = await supabase.auth.admin.listUsers();
        
        if (listError) {
          console.log(`Error listing users: ${listError.message}`);
          results.push({ 
            email: account.email, 
            status: 'error',
            error: `List users error: ${listError.message}`
          });
          continue;
        }
        
        const userExists = existingUser?.users.some(u => u.email === account.email);

        if (userExists) {
          console.log(`User ${account.email} already exists`);
          results.push({ 
            email: account.email, 
            status: 'already_exists',
            message: 'User already exists'
          });
          continue;
        }

        console.log(`Creating user: ${account.email}`);
        
        // Create user with Supabase Auth
        const { data, error } = await supabase.auth.admin.createUser({
          email: account.email,
          password: account.password,
          user_metadata: { name: account.name },
          email_confirm: true
        });

        if (error) {
          console.log(`Error creating user ${account.email}: ${error.message}`);
          results.push({ 
            email: account.email, 
            status: 'error',
            error: error.message 
          });
          continue;
        }

        if (!data.user) {
          console.log(`Failed to create user ${account.email}: No user data returned`);
          results.push({ 
            email: account.email, 
            status: 'error',
            error: 'Failed to create user - no user data returned'
          });
          continue;
        }

        // Store additional user data in KV store
        const userId = data.user.id;
        console.log(`Storing user data in KV for user ID: ${userId}`);
        
        const userData = {
          name: account.name,
          email: account.email,
          memberSince: new Date().toISOString(),
          booksRead: account.booksRead,
          avatar: '',
          role: account.role,
        };

        await kv.set(`user:${userId}`, JSON.stringify(userData));
        console.log(`User ${account.email} created successfully`);

        results.push({ 
          email: account.email, 
          status: 'created',
          role: account.role,
          userId: userId,
          message: 'Demo account created successfully'
        });

      } catch (error) {
        console.log(`Exception while processing ${account.email}: ${error}`);
        results.push({ 
          email: account.email, 
          status: 'error',
          error: String(error)
        });
      }
    }

    console.log('=== Seed Results ===', JSON.stringify(results, null, 2));

    return c.json({ 
      success: true, 
      results,
      message: 'Demo account seeding completed'
    });

  } catch (error) {
    console.log(`Seed demo accounts fatal error: ${error}`);
    return c.json({ 
      success: false,
      error: `Internal server error during seeding: ${error}` 
    }, 500);
  }
});

Deno.serve(app.fetch);