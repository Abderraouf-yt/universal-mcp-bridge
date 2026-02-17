import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sumijpcsizwvzolbiqne.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_wlj22_IUxs7GVsPBjsBmWg_2p1JbAr8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
