import { prisma } from '../../lib/prisma';

export const createPost = async (data: any, authorId: string) => {
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  
  return await prisma.post.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      isPremium: data.isPremium || false,
      authorId,
    },
  });
};

export const getPosts = async (page: number = 1, limit: number = 10, search?: string) => {
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

  return {
    posts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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

  return await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      isPremium: data.isPremium,
    },
  });
};

export const deletePost = async (id: string, userId: string, userRole: string) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error('Post not found');

  // Only author or ADMIN can delete
  if (post.authorId !== userId && userRole !== 'ADMIN') {
    throw new Error('You do not have permission to delete this post');
  }

  return await prisma.post.delete({ where: { id } });
};
