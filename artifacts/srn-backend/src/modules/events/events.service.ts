import { prisma } from '../../lib/prisma';

export const createEvent = async (data: any) => {
  return await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      date: new Date(data.date),
    },
  });
};

export const getEvents = async () => {
  return await prisma.event.findMany({
    orderBy: { date: 'asc' },
  });
};

export const getEventById = async (id: string) => {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) throw new Error('Event not found');
  return event;
};

export const registerForEvent = async (eventId: string, userId: string) => {
  // Check if already registered
  const existing = await prisma.eventRegistration.findUnique({
    where: {
      eventId_userId: { eventId, userId },
    },
  });

  if (existing) {
    throw new Error('You are already registered for this event');
  }

  return await prisma.eventRegistration.create({
    data: {
      eventId,
      userId,
    },
    include: {
      event: true,
    },
  });
};

export const getEventAttendees = async (eventId: string) => {
  const registrations = await prisma.eventRegistration.findMany({
    where: { eventId },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
        },
      },
    },
  });

  return registrations.map((reg: any) => reg.user);
};
