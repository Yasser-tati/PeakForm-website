-- Enable Row Level Security for all tables
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "client" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "coach" ENABLE ROW LEVEL SECURITY;

-- Create policies for the user table
-- Policy to allow users to select their own user data
CREATE POLICY select_own_user ON "user" 
FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to update their own user data
CREATE POLICY update_own_user ON "user" 
FOR UPDATE USING (auth.uid() = user_id);

-- CRITICAL: Policy to allow authenticated users to insert their own user record on registration
CREATE POLICY insert_own_user ON "user" 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for the client table
-- Policy to allow users to select their own client data
CREATE POLICY select_own_client ON client 
FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to update their own client data
CREATE POLICY update_own_client ON client 
FOR UPDATE USING (auth.uid() = user_id);

-- CRITICAL: Policy to allow authenticated users to insert their own client record
CREATE POLICY insert_own_client ON client 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for the coach table
-- Policy to allow users to select their own coach data
CREATE POLICY select_own_coach ON coach 
FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to update their own coach data
CREATE POLICY update_own_coach ON coach 
FOR UPDATE USING (auth.uid() = user_id);

-- CRITICAL: Policy to allow authenticated users to insert their own coach record
CREATE POLICY insert_own_coach ON coach 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Note: These policies may already exist in your database. If you run this script and get 
-- errors about policies already existing, that's okay. You can drop the existing policies first 
-- with DROP POLICY if you need to recreate them.

-- You can check existing policies with this query (you can run this in the Supabase SQL Editor):
-- SELECT * FROM pg_policies WHERE schemaname = 'public'; 