// This app runs in a single Docker instance. Requests are limited per process.
export function createTestimonialLimiter(limit = 5, windowMs = 60 * 60 * 1000, maxKeys = 10000) {
  const attempts = new Map<string, { count: number; expires: number }>();
  return (key: string, now = Date.now()): boolean => {
    const entry = attempts.get(key);
    if (entry && entry.expires > now) {
      if (entry.count >= limit) return false;
      entry.count++;
      return true;
    }
    if (attempts.size >= maxKeys) {
      for (const [k, value] of attempts) if (value.expires <= now) attempts.delete(k);
      if (attempts.size >= maxKeys && !entry) return false;
    }
    attempts.set(key, { count: 1, expires: now + windowMs });
    return true;
  };
}

export const allowTestimonialSubmission = createTestimonialLimiter();
