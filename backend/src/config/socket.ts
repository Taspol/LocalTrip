import { Server as SocketIOServer } from 'socket.io';
import { logger } from '../utils/logger';

export const setupSocketIO = (io: SocketIOServer): void => {
  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    // Handle user joining a room (e.g., trip planning session)
    socket.on('join-trip', (tripId: string) => {
      socket.join(`trip-${tripId}`);
      logger.debug(`Client ${socket.id} joined trip room: ${tripId}`);
      socket.to(`trip-${tripId}`).emit('user-joined', {
        userId: socket.id,
        message: 'A user joined the trip planning session',
      });
    });

    // Handle leaving a trip room
    socket.on('leave-trip', (tripId: string) => {
      socket.leave(`trip-${tripId}`);
      logger.debug(`Client ${socket.id} left trip room: ${tripId}`);
      socket.to(`trip-${tripId}`).emit('user-left', {
        userId: socket.id,
        message: 'A user left the trip planning session',
      });
    });

    // Handle real-time location sharing
    socket.on('location-update', (data: { tripId: string; location: { lat: number; lng: number } }) => {
      socket.to(`trip-${data.tripId}`).emit('location-update', {
        userId: socket.id,
        location: data.location,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle chat messages in trip planning
    socket.on('trip-message', (data: { tripId: string; message: string; userId: string }) => {
      io.to(`trip-${data.tripId}`).emit('trip-message', {
        userId: data.userId,
        message: data.message,
        timestamp: new Date().toISOString(),
      });
      logger.debug(`Message sent to trip ${data.tripId}: ${data.message}`);
    });

    // Handle trip updates (when someone modifies the trip)
    socket.on('trip-update', (data: { tripId: string; update: any }) => {
      socket.to(`trip-${data.tripId}`).emit('trip-update', {
        update: data.update,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error(`Socket error for client ${socket.id}:`, error);
    });
  });

  logger.info('Socket.IO server configured and ready for real-time connections');
};
