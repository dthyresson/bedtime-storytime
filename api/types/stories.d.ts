import type {
  Animal as PAnimal,
  Color as PColor,
  Adjective as PAdjective,
  Activity as PActivity,
  Story as PStory,
} from '@prisma/client'
import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type {
  Story as RTStory,
  Animal as RTAnimal,
  Color as RTColor,
  Adjective as RTAdjective,
  Activity as RTActivity,
} from './shared-return-types'
import type {
  CreateStoryInput,
  UpdateStoryInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: stories: [Story!]! */
export interface StoriesResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTStory[] | Promise<RTStory[]> | (() => Promise<RTStory[]>)
}

/** SDL: story(id: String!): Story */
export interface StoryResolver {
  (
    args: { id: string },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTStory | null | Promise<RTStory | null> | (() => Promise<RTStory | null>)
}

/** SDL: createStory(input: CreateStoryInput!): Story! */
export interface CreateStoryResolver {
  (
    args: { input: CreateStoryInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTStory | Promise<RTStory> | (() => Promise<RTStory>)
}

/** SDL: updateStory(id: String!, input: UpdateStoryInput!): Story! */
export interface UpdateStoryResolver {
  (
    args: { id: string; input: UpdateStoryInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTStory | Promise<RTStory> | (() => Promise<RTStory>)
}

/** SDL: deleteStory(id: String!): Story! */
export interface DeleteStoryResolver {
  (
    args: { id: string },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTStory | Promise<RTStory> | (() => Promise<RTStory>)
}

export interface StoryTypeResolvers {
  /** SDL: animal: Animal! */
  animal: (
    args: undefined,
    obj: {
      root: StoryAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) => RTAnimal | Promise<RTAnimal> | (() => Promise<RTAnimal>)

  /** SDL: color: Color! */
  color: (
    args: undefined,
    obj: {
      root: StoryAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) => RTColor | Promise<RTColor> | (() => Promise<RTColor>)

  /** SDL: adjective: Adjective! */
  adjective: (
    args: undefined,
    obj: {
      root: StoryAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) => RTAdjective | Promise<RTAdjective> | (() => Promise<RTAdjective>)

  /** SDL: activity: Activity! */
  activity: (
    args: undefined,
    obj: {
      root: StoryAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) => RTActivity | Promise<RTActivity> | (() => Promise<RTActivity>)
}

type StoryAsParent = PStory & {
  animal: () => PAnimal | Promise<PAnimal> | (() => Promise<PAnimal>)
  color: () => PColor | Promise<PColor> | (() => Promise<PColor>)
  adjective: () =>
    | PAdjective
    | Promise<PAdjective>
    | (() => Promise<PAdjective>)
  activity: () => PActivity | Promise<PActivity> | (() => Promise<PActivity>)
}
