import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next)
      .then(result => next(result))
      .catch(next);
  };
};
