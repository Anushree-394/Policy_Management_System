/**
 * Role Constants and Utilities
 * Defines user roles and permission checks
 */

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  VIEWER: 'viewer',
};

/**
 * Check if user has required role
 * @param {string} userRole - User's current role
 * @param {string|string[]} requiredRoles - Required role(s)
 * @returns {boolean}
 */
export const hasRole = (userRole, requiredRoles) => {
  if (!userRole || !requiredRoles) return false;
  
  const rolesArray = Array.isArray(requiredRoles) 
    ? requiredRoles 
    : [requiredRoles];
  
  return rolesArray.includes(userRole);
};

/**
 * Check if user has admin role
 * @param {string} userRole - User's current role
 * @returns {boolean}
 */
export const isAdmin = (userRole) => {
  return userRole === ROLES.ADMIN;
};

/**
 * Check if user has manager or admin role
 * @param {string} userRole - User's current role
 * @returns {boolean}
 */
export const isManagerOrAdmin = (userRole) => {
  return userRole === ROLES.ADMIN || userRole === ROLES.MANAGER;
};

