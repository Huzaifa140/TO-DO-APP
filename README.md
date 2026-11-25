# Glass Todo (React + Vite + Supabase)

Glassmorphism todo app with signup / login and private per-user tasks.

## 1. Supabase setup
1. Create a project at https://supabase.com
2. SQL Editor -> paste everything from `supabase/schema.sql` -> Run
   (creates the `todos` table + Row Level Security so users only see their own todos)
3. Project Settings -> API -> copy **Project URL** and **anon public key**
4. (Development tip) Authentication -> Providers -> Email -> turn off "Confirm email"
   if you want to log in right after signing up without verifying the email.

## 2. Run locally
```bash
cp .env.example .env      # then paste your URL + anon key
npm install
npm run dev
```

## Flow
Sign up -> redirected to Login -> Log in -> Todos page (add, edit, complete, delete).

## Structure
```
src/
  components/   reusable UI (GlassCard, Navbar, TodoForm, TodoItem, ...)
  pages/        Login, Signup, Todos
  context/      AuthContext (Supabase session)
  hooks/        useTodos (CRUD)
  lib/          supabaseClient
```
