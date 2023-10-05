import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  const status = error.status || 400;
  response.status(status).send(error.message);
};
