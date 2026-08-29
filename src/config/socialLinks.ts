// Social Links Configuration - uses environment variables only
export const socialLinks = {
  // Main social profiles
  github: import.meta.env.VITE_GITHUB_URL,
  linkedin: import.meta.env.VITE_LINKEDIN_URL,
  email: import.meta.env.VITE_EMAIL,
  phone: import.meta.env.VITE_PHONE,
  leetcode: import.meta.env.VITE_LEETCODE_URL,
  
  // GitHub repository URLs
  repositories: {
    portfolio: import.meta.env.VITE_GITHUB_PORTFOLIO_URL,
  },
  
  // Formatted display names (extracted from environment variables)
  display: {
    github: import.meta.env.VITE_GITHUB_URL?.replace('https://', ''),
    linkedin: import.meta.env.VITE_LINKEDIN_URL?.replace('https://', ''),
    email: import.meta.env.VITE_EMAIL,
    phone: import.meta.env.VITE_PHONE,
    leetcode: import.meta.env.VITE_LEETCODE_URL?.replace('https://', ''),
  }
};

export default socialLinks;
