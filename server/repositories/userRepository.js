export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getUsers = async () => {
    return this.prisma.user.findMany();
  };

  getUser = async (id) => {
    return this.prisma.user.findUnique({
      where: { id },
    });
  };

  createUser = async (userData) => {
    return this.prisma.user.create({
      data: userData,
    });
  };

  updateUser = async (id, userData) => {
    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  };

  deleteUser = async (id) => {
    return this.prisma.$transaction([
      this.prisma.task.deleteMany({
        where: { userId: id },
      }),
      this.prisma.user.delete({
        where: { id },
      }),
    ]);
  };
}
