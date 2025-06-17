import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bvlxneatssnqfuytiomp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bHhuZWF0c3NucWZ1eXRpb21wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTA3NjY0MiwiZXhwIjoyMDY0NjUyNjQyfQ.zkOyPld7pRRxZCDKnVjGbViuY6wLA3xNdq5Di3Q6Vgc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;