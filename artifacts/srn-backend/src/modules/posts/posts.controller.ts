import { Request, Response } from 'express';
import * as postsService from './posts.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess, sendError } from '../../utils/response';

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const post = await postsService.createPost(req.body, req.user.id);
  sendSuccess(res, post, 'Post created successfully', 201);
});

export const getPosts = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  
  const result = await postsService.getPosts(page, limit, search);
  sendSuccess(res, result, 'Posts fetched successfully');
});

export const getPostById = catchAsync(async (req: Request, res: Response) => {
  const post = await postsService.getPostById(req.params.id as string);
  
  // Premium content check
  if (post.isPremium) {
    if (!req.user) {
      return sendError(res, 'This is premium content. Please log in.', null, 401);
    }
    if (req.user.role === 'USER') {
      return sendError(res, 'This content is for Members only.', null, 403);
    }
  }

  sendSuccess(res, post, 'Post fetched successfully');
});

export const updatePost = catchAsync(async (req: Request, res: Response) => {
  const post = await postsService.updatePost(
    req.params.id as string,
    req.user.id,
    req.user.role,
    req.body
  );
  sendSuccess(res, post, 'Post updated successfully');
});

export const deletePost = catchAsync(async (req: Request, res: Response) => {
  await postsService.deletePost(
    req.params.id as string,
    req.user.id,
    req.user.role
  );
  sendSuccess(res, null, 'Post deleted successfully');
});
