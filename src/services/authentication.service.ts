import router from '@/routes';
import { query } from './services';

export interface User {
  email: string;
  role: string;
  id: string
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const login = async (credentials: LoginCredentials): Promise<boolean> => {
  try {
    const sql = `
        SELECT 
            u.email,
            CASE
                WHEN i.no_identitas_klien IS NOT NULL THEN 'individu'
                WHEN p.no_identitas_klien IS NOT NULL THEN 'perusahaan'
                WHEN fd.no_front_desk IS NOT NULL THEN 'front_desk'
                WHEN ph.no_perawat_hewan IS NOT NULL THEN 'perawat'
                WHEN dh.no_dokter_hewan IS NOT NULL THEN 'dokter'
                ELSE 'unknown'
            END AS role
        FROM 
            public.user u
        LEFT JOIN klien k ON u.email = k.email
        LEFT JOIN individu i ON k.no_identitas = i.no_identitas_klien
        LEFT JOIN perusahaan p ON k.no_identitas = p.no_identitas_klien
        LEFT JOIN pegawai pg ON u.email = pg.email_user
        LEFT JOIN front_desk fd ON pg.no_pegawai = fd.no_front_desk
        LEFT JOIN tenaga_medis tm ON pg.no_pegawai = tm.no_tenaga_medis
        LEFT JOIN perawat_hewan ph ON tm.no_tenaga_medis = ph.no_perawat_hewan
        LEFT JOIN dokter_hewan dh ON tm.no_tenaga_medis = dh.no_dokter_hewan
        WHERE 
            u.email = '${credentials.email}' AND u.password = '${credentials.password}'; 
    `;
    const response = await query(sql);

    if (response.data && response.data.length > 0) {
      let noIdentitasKlienQueryResult;
      if (['individu', 'perusahaan'].includes(response.data[0].role)) {
        noIdentitasKlienQueryResult = await query(`
            SELECT no_identitas as "id"
            FROM public.klien k
            WHERE k.email = '${response.data[0].email}';
          `)
      } else {
        noIdentitasKlienQueryResult = await query(`
            SELECT no_pegawai as "id"
            FROM public.pegawai p
            WHERE p.email_user = '${response.data[0].email}';
          `)
      }
      const user: User = {
        email: response.data[0].email,
        role: response.data[0].role,
        id: noIdentitasKlienQueryResult.data[0].id
      };
      
      const token = generateSimpleToken(user);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

const generateSimpleToken = (user: User): string => {
  const payload = {
    email: user.email,
    role: user.role,
    exp: Date.now() + (60 * 60 * 1000)
  };
  
  return btoa(JSON.stringify(payload));
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  router.push('/login');
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token));
    const isValid = Date.now() < payload.exp;
    
    if (!isValid) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    
    return isValid;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return false;
  }
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};