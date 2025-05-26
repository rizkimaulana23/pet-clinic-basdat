import { getCurrentUser } from "./authentication.service"

const rolePermissions: Record<string, string[]> = {
  'admin': ['*'],
  'dokter': [
    'dashboard:view', 
    'dashboard:update', 
    'perawatan:view', 
    'perawatan:create', 
    'perawatan:update',
    'vaksinasi:view',
    'vaksinasi:create',
    'vaksinasi:update'
  ],
  'perawat': [
    'dashboard:view',
    'dashboard:update',
    'perawatan:view',
    'perawatan:create',
    'vaksinasi:view'
  ],
  'front_desk': [
    'dashboard:view',
    'dashboard:update',
    'obat:view',
    'hewan:view',
    'hewan:create',
    'klien:view',
    'klien:create',
    'kunjungan:view',
    'kunjungan:create',
    'kunjungan:update'
  ],
  'individu': [
    'dashboard:view',
    'dashboard:update',
    'hewan:view',
    'hewan:create',
    'hewan:update',
    'kunjungan:view'
  ],
  'perusahaan': [
    'dashboard:view',
    'dashboard:update',
    'hewan:view',
    'hewan:create',
    'hewan:update',
    'kunjungan:view'
  ]
};

export const hasPermission = (permission: string): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  const userRole = user.role;
  const permissions = rolePermissions[userRole] || [];
  
  return permissions.includes('*') || permissions.includes(permission);
};

export const hasAnyPermission = (permissions: string[]): boolean => {
  return permissions.some(permission => hasPermission(permission));
};

export const canAccessRoute = (routePermissions: string[]): boolean => {
  return hasAnyPermission(routePermissions);
};