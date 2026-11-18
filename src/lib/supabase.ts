import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kfisfduehoqeloshnsdc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaXNmZHVlaG9xZWxvc2huc2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5ODk2NzUsImV4cCI6MjExMDU2NTY3NX0.AvIi4mjie6BD4HKJHHVuU4BRYs7Q7B0m0MW-tHe8Tzw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'ramen' | 'side' | 'topping' | 'drink';
  description: string;
  badge?: string;
  spicy_level?: number;
  image_url?: string;
  order_index?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  menu_name?: string;
  content: string;
  password_hash: string;
  created_at: string;
}
