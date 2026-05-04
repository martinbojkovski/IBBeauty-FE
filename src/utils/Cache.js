// ─── Cache config ─────────────────────────────────────────────────────────────
const CACHE_KEY = "reservations_cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 60 minutes

export const readCache = () => {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { timestamp, data } = JSON.parse(raw);
        if (Date.now() - timestamp > CACHE_TTL_MS) {
            sessionStorage.removeItem(CACHE_KEY);
            return null;
        }
        return data;
    } catch {
        return null;
    }
};

export const writeCache = (data) => {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
    } catch {
        // sessionStorage full or unavailable — silently skip
    }
};