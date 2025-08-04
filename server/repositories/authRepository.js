export class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    registerUser = async (parsedDate) => {
        return this.prisma.user.create({
            data: parsedDate
        })
    }

    loginUser = async (email) => {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }
}