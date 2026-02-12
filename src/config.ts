// Global Configuration for the Application

// TOGGLE THIS TO 'true' WHEN DEPLOYING TO A REAL PHP SERVER
export const IS_PRODUCTION = false; 

export const API_BASE_URL = '/api'; // Path to your PHP files in the public folder

export const ENDPOINTS = {
    CONTACT: `${API_BASE_URL}/submit_contact.php`,
    LOGIN: `${API_BASE_URL}/auth_login.php`,
    FETCH_REQUESTS: `${API_BASE_URL}/fetch_requests.php`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth_forgot_password.php`,
};
