import RestService from './RestService';
import { type Post } from '@/types';

export type ServiceFactory = {
  posts: RestService<Post>;
};

export const serviecs = (): ServiceFactory => ({
  posts: new RestService<Post>('posts'),
});

export default serviecs;
