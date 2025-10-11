export class AuthRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  registerUser = async (parsedDate) => {
    return this.prisma.user.create({
      data: parsedDate,
      select: {
        email: true,
        name: true,
      }
    });
  };

  loginUser = async (email) => {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        name: true,
      },
    });
  };

  hashedPassword = async (email) => {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        password: true,
      },
    });
  };

  userId = async (email) => {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });
  };
}
