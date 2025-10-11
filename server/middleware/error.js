import { ZodError } from 'zod';

const errorHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      meta: {
        name: err.constructor.name,
        error: err.issues,
      },
    });
  }

  if (err?.constructor?.name.startsWith('Prisma')) {
    if (err.code === 'P2002') {
      return res.status(400).json({
        message: 'A new user cannot be created with this email',
        meta: {
          name: err.constructor.name,
          code: err.code,
          target: err.meta.target,
        },
      });
    }
    return res.status(400).json({
      message: 'Database error occurred',
      meta: {
        name: err.constructor.name,
        code: err.code,
        error: err.message.replace(/\n/g, ''),
      },
    });
  }

  return res.status(500).json({
    message: err.message.replace(/\n/g, '') || 'Unknown error',
    meta: {
      error: err.message.replace(/\n/g, '') || 'Unknown error',
      stack: err.stack.replace(/\n/g, ''),
    },
  });
};

export default errorHandler;
