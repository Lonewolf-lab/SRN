import { sendError, sendSuccess } from '../utils/response';

describe('response utils', () => {
  const createMockRes = () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    return { status, json };
  };

  it('sendSuccess uses defaults', () => {
    const res = createMockRes();

    sendSuccess(res as any, { id: 1 });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Success',
      data: { id: 1 },
    });
  });

  it('sendSuccess supports custom message and status', () => {
    const res = createMockRes();

    sendSuccess(res as any, { ok: true }, 'Created', 201);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Created',
      data: { ok: true },
    });
  });

  it('sendError uses defaults', () => {
    const res = createMockRes();

    sendError(res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error',
      error: null,
    });
  });

  it('sendError supports custom values', () => {
    const res = createMockRes();

    sendError(res as any, 'Invalid', { field: 'email' }, 400);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid',
      error: { field: 'email' },
    });
  });
});
