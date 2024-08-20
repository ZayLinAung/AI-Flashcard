// import { supabaseClient } from "./supabaseClient";



// // Retreive sets from 'sets' table based on userId
// export const getSets = async ({ userId, token }) => {
//     const supabase = await supabaseClient(token);
//     const { data: sets } = await supabase.from("sets").select("*").eq("user_id", userId);
//     return sets
// }

// // Retreive cards from 'cards' table based on userId and setId
// export const getCards = async ({ userId, token }) => {
//     const supabase = await supabaseClient(token);
//     const { data: cards } = await supabase.from("cards").select("*").eq("user_id", userId);
//     return cards
// }
