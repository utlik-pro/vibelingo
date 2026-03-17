// Generate a unique referral code from user ID
export function generateReferralCode(userId: string): string {
  return "VL" + btoa(userId).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
}

// Get referral link
export function getReferralLink(code: string): string {
  return `https://t.me/vibelingo_learn_bot?start=${code}`;
}

// Fetch referral count from server (reads bot's referrals.json)
export async function fetchReferralCount(code: string): Promise<number> {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const res = await fetch(`${baseUrl}/api/referrals/${code}`);
    if (res.ok) {
      const data = await res.json();
      return data.count || 0;
    }
  } catch {
    // fallback to localStorage
  }
  return getLocalReferralCount(code);
}

// Local fallback
function getLocalReferralCount(code: string): number {
  return parseInt(localStorage.getItem(`vibelingo_referrals_${code}`) || "0");
}

// Legacy sync function (for initial render)
export function getReferralCount(userId: string): number {
  const code = generateReferralCode(userId);
  return parseInt(localStorage.getItem(`vibelingo_referrals_${code}`) || "0");
}

// Cache the server count into localStorage
export async function syncReferralCount(userId: string): Promise<number> {
  const code = generateReferralCode(userId);
  const count = await fetchReferralCount(code);
  localStorage.setItem(`vibelingo_referrals_${code}`, String(count));
  return count;
}
