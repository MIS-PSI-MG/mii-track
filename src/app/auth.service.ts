import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    const supabaseUrl = 'http://localhost:8000';
    const supabaseKey = process.env['SUPABASE_KEY'];

    const supabase = createClient(supabaseUrl, supabaseKey);
  }
  getAuth() {
    return this.supabase.auth.listen();
  }
}
