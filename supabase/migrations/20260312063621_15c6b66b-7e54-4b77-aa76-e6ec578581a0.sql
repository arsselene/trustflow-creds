
-- Drop overly permissive policies
DROP POLICY "Service role can insert VCs" ON public.verifiable_credentials;
DROP POLICY "Service role can insert notifications" ON public.notifications;
DROP POLICY "Service role can insert activity" ON public.activity_history;

-- Recreate with role check (service_role bypasses RLS anyway, so these aren't needed)
-- External API will use service_role key which bypasses RLS
