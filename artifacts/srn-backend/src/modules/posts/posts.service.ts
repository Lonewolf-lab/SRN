import { prisma } from '../../lib/prisma';
import { getCache, setCache, delCache, redis } from '../../lib/cache';

export const createPost = async (data: any, authorId: string) => {
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  
  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      isPremium: data.isPremium || false,
      authorId,
    },
  });

  // Invalidate list cache
  await invalidatePostsCache();

  return post;
};

export const getPosts = async (page: number = 1, limit: number = 10, search?: string) => {
  const cacheKey = `posts:list:${page}:${limit}:${search || 'none'}`;
  const cachedData = await getCache<any>(cacheKey);
  if (cachedData) return cachedData;

  const skip = (page - 1) * limit;

  const where: any = {};
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, name: true, avatar: true } }
      }
    }),
    prisma.post.count({ where }),
  ]);

  const result = {
    posts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };

  // Cache for 5 minutes
  await setCache(cacheKey, result, 300);

  return result;
};

export const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({ 
    where: { id },
    include: {
      author: { select: { id: true, name: true, avatar: true } }
    }
  });
  if (!post) throw new Error('Post not found');
  return post;
};

export const updatePost = async (id: string, userId: string, userRole: string, data: any) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error('Post not found');

  // Only author or ADMIN can update
  if (post.authorId !== userId && userRole !== 'ADMIN') {
    throw new Error('You do not have permission to update this post');
  }

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      isPremium: data.isPremium,
    },
  });

  await invalidatePostsCache();
  return updatedPost;
};

export const deletePost = async (id: string, userId: string, userRole: string) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error('Post not found');

  // Only author or ADMIN can delete
  if (post.authorId !== userId && userRole !== 'ADMIN') {
    throw new Error('You do not have permission to delete this post');
  }

  const deletedPost = await prisma.post.delete({ where: { id } });
  await invalidatePostsCache();
  return deletedPost;
};

const invalidatePostsCache = async () => {
  const keys = await redis.keys('posts:list:*');
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};
