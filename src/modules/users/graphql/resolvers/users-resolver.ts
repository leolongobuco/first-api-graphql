import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { prisma } from '../../../../database/prisma-client'
import { User } from '../../infra/prisma/repositories/users-repository'
import bcrypt from 'bcrypt'

interface UserInput {
  firstname: string
  lastname: string
  email: string
  password: string
}

@Resolver(User)
export class UsersResolver {
  @Query(() => [User])
  async getUser(): Promise<User[]> {
    return prisma.users.findMany()
  }

  @Mutation(() => User)
  async createUser(
    @Arg('email') email: string,
    @Arg('firstname') firstname: string,
    @Arg('lastname') lastname: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 8)
    const user = await prisma.users.create({
      data: {
        email,
        firstname,
        lastname,
        password: passwordHash,
      },
    })
    return user
  }
}
