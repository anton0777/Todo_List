export class TaskRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getTasks = async (userId) => {
    return this.prisma.task.findMany({
      where: {
        userId: userId,
        parentId: null,
      },
    });
  };

  getTask = async (userId, taskId) => {
    return this.prisma.task.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
      include: { subtasks: true },
    });
  };

  createTask = async (userId, taskData) => {
    return this.prisma.task.create({
      data: {
        ...taskData,
        userId: userId,
      },
    });
  };

  updateTask = async (userId, taskId, taskData) => {
    return this.prisma.task.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: taskData,
    });
  };

  deleteTask = async (userId, taskId) => {
    return this.prisma.$transaction([
      this.prisma.file.deleteMany({
        where: { taskId: taskId },
      }),
      this.prisma.task.delete({
        where: {
          id: taskId,
          userId: userId,
        },
      }),
    ]);
  };
}
