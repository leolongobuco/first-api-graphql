import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field(() => String)
  firstname: string

  @Field(() => String)
  email: string

  @Field(() => String)
  lastname: string

  @Field(() => String)
  password: string
}
