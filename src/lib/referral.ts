// Generate a unique referral code from user ID
export function generateReferralCode(userId: string): string {
  return "VL" + btoa(userId).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
}

// Get referral link
export function getReferralLink(code: string): string {
  return `https://t.me/vibelingo_bot?start=${code}`;
}

// Track referral in localStorage (simple version)
export function addReferral(userId: string) {
  const key = `vibelingo_referrals_${userId}`;
  const count = parseInt(localStorage.getItem(key) || "0");
  localStorage.setItem(key, String(count + 1));
  return count + 1;
}

export function getReferralCount(userId: string): number {
  return parseInt(localStorage.getItem(`vibelingo_referrals_${userId}`) || "0");
}
