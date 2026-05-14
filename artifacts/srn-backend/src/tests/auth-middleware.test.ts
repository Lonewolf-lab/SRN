const mockRedisGet = jest.fn();
const mockFindUnique = jest.fn();
const mockVerifyAccessToken = jest.fn();

jest.mock('../lib/cache', () => ({
  redis: {
    get: (...args: any[]) => mockRedisGet(...args),
  },
}));

jest.mock('../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: (...args: any[]) => mockFindUnique(...args),
    },
  },
}));

jest.mock('../utils/jwt', () => ({
  verifyAccessToken: (...args: any[]) => mockVerifyAccessToken(...args),
}));

import { protect } from '../middleware/auth';
import { optionalProtect } from '../middleware/optionalAuth';

describe('auth middleware: protect', () => {
  const createMockRes = () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    return { status, json };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 401 when token is missing', async () => {
    const req = { headers: {}, cookies: {} };
    const res = createMockRes();
    const next = jest.fn();

    await protect(req as any, res as any, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns 401 when token is blacklisted', async () => {
    mockRedisGet.mockResolvedValue('1');

    const req = { headers: { authorization: 'Bearer token-1' }, cookies: {} };
    const res = createMockRes();
    const next = jest.fn();

    await protect(req as any, res as any, next);

    expect(mockRedisGet).toHaveBeenCalledWith('blacklist:token-1');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns 401 when decoded user does not exist', async () => {
    mockRedisGet.mockResolvedValue(null);
    mockVerifyAccessToken.mockReturnValue({ id: 'u1' });
    mockFindUnique.mockResolvedValue(null);

    const req = { headers: { authorization: 'Bearer token-2' }, cookies: {} };
    const res = createMockRes();
    const next = jest.fn();

    await protect(req as any, res as any, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('calls next and attaches req.user for valid token', async () => {
    const user = { id: 'u1', role: 'USER' };
    mockRedisGet.mockResolvedValue(null);
    mockVerifyAccessToken.mockReturnValue({ id: 'u1' });
    mockFindUnique.mockResolvedValue(user);

    const req: any = { headers: {}, cookies: { accessToken: 'cookie-token' } };
    const res = createMockRes();
    const next = jest.fn();

    await protect(req, res as any, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user).toEqual(user);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('returns 401 when token verification throws', async () => {
    mockRedisGet.mockResolvedValue(null);
    mockVerifyAccessToken.mockImplementation(() => {
      throw new Error('invalid token');
    });

    const req = { headers: { authorization: 'Bearer bad-token' }, cookies: {} };
    const res = createMockRes();
    const next = jest.fn();

    await protect(req as any, res as any, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns 500 when unexpected middleware error occurs', async () => {
    mockRedisGet.mockRejectedValue(new Error('redis down'));

    const req = { headers: { authorization: 'Bearer token-3' }, cookies: {} };
    const res = createMockRes();
    const next = jest.fn();

    await protect(req as any, res as any, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('auth middleware: optionalProtect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('continues when no token is present', async () => {
    const req: any = { headers: {}, cookies: {} };
    const next = jest.fn();

    await optionalProtect(req, {} as any, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user).toBeUndefined();
  });

  it('continues when token is blacklisted', async () => {
    mockRedisGet.mockResolvedValue('1');

    const req: any = { headers: { authorization: 'Bearer t1' }, cookies: {} };
    const next = jest.fn();

    await optionalProtect(req, {} as any, next);

    expect(mockRedisGet).toHaveBeenCalledWith('blacklist:t1');
    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user).toBeUndefined();
  });

  it('attaches req.user for valid optional auth token', async () => {
    const user = { id: 'u2', role: 'MEMBER' };
    mockRedisGet.mockResolvedValue(null);
    mockVerifyAccessToken.mockReturnValue({ id: 'u2' });
    mockFindUnique.mockResolvedValue(user);

    const req: any = { headers: { authorization: 'Bearer t2' }, cookies: {} };
    const next = jest.fn();

    await optionalProtect(req, {} as any, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user).toEqual(user);
  });

  it('continues when token verification fails', async () => {
    mockRedisGet.mockResolvedValue(null);
    mockVerifyAccessToken.mockImplementation(() => {
      throw new Error('bad token');
    });

    const req: any = { headers: { authorization: 'Bearer t3' }, cookies: {} };
    const next = jest.fn();

    await optionalProtect(req, {} as any, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user).toBeUndefined();
  });

  it('continues when unexpected error occurs', async () => {
    mockRedisGet.mockRejectedValue(new Error('redis down'));

    const req: any = { headers: { authorization: 'Bearer t4' }, cookies: {} };
    const next = jest.fn();

    await optionalProtect(req, {} as any, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
