import request from 'supertest';
import app from '../../src/app';

export function api() {
  return {
    get: (url: string) => request(app).get(url),
    post: (url: string) => request(app).post(url),
    patch: (url: string) => request(app).patch(url),
    delete: (url: string) => request(app).delete(url)
  };
}