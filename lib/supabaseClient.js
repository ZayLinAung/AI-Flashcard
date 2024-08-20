// // When users login through Clerk, bearer token will pass down to Supbase at anytime we want to make a request 

// import { createClient } from "@supabase/supabase-js"

// export const supabaseClient = async (supabaseToken) => {
//     const supabase = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//         {
//             global: { headers: { Authorization: `Bearer ${supabaseToken}` } }
//         });

//     return supabase
// }