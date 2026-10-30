import Redis from 'ioredis';

declare global {
  // eslint-disable-next-line no-var
  var globalRedis: Redis | undefined;
}

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis =
  globalThis.globalRedis ??
  new Redis(redisUrl, {
    maxRetriesPerRequest: 2,
    lazyConnect: true,
    retryStrategy(times) {
      if (times > 3) return null;
      return Math.min(times * 100, 2000);
    },
  });

redis.on('error', (err) => {
  // Silent fallback so Next.js doesn't crash if Redis is unavailable in local testing
  if (process.env.NODE_ENV === 'development') {
    // Info level only in dev
  } else {
    console.warn('⚠️ [Redis Connection Warning]:', err.message);
  }
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.globalRedis = redis;
}
