
-- Function to get user claims
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT
LANGUAGE sql STABLE
AS '
  SELECT coalesce(current_setting(''request.jwt.claims'', true)::jsonb ->> ''role'', ''student'');
';

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON users FOR SELECT USING (get_user_role() = 'admin');
