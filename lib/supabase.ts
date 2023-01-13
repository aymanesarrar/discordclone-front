import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xizrnnflqgzdyahkwtrr.supabase.co";
const supabaseKey = "";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase as default };
