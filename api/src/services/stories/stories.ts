import type {
  StoriesResolver,
  StoryTypeResolvers,
  StoryResolver,
  StoryOptionsResolver,
  CreateStoryResolver,
  UpdateStoryResolver,
  DeleteStoryResolver,
} from 'types/stories'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const stories: StoriesResolver = async () => {
  return db.story.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const story: StoryResolver = async ({ id }) => {
  return db.story.findUnique({
    where: { id },
  })
}

export const createStory: CreateStoryResolver = async ({ input }) => {
  // simulate a 20 second delay
  await new Promise((resolve) => setTimeout(resolve, 5_000))
  const buildStory = (input) => {
    return {
      ...input,
      title: `The ${input.adjectiveId} ${input.animalId} ${input.colorId} ${input.activityId} story`,
      story: `Once upon a time, there was a ${input.adjectiveId} ${input.animalId} who lived in a ${input.colorId} ${input.activityId}.`,
      summary: `Summary of ${input.adjectiveId} ${input.animalId} ${input.colorId} ${input.activityId}`,
      pictureUrl: `${input.adjectiveId}-${input.animalId}-${input.colorId}-${input.activityId}.png`,
    }
  }
  return db.story.create({
    data: buildStory(input),
  })
}

export const updateStory: UpdateStoryResolver = async ({ id, input }) => {
  return db.story.update({
    data: input,
    where: { id },
  })
}

export const deleteStory: DeleteStoryResolver = async ({ id }) => {
  return db.story.delete({
    where: { id },
  })
}

export const storyOptions: StoryOptionsResolver = async ({ input }) => {
  const adjective =
    input.adjectiveId !== ''
      ? await db.adjective.findUnique({
          where: { id: input.adjectiveId },
        })
      : null

  const animal =
    input.animalId !== ''
      ? await db.animal.findUnique({
          where: { id: input.animalId },
        })
      : null

  const color =
    input.colorId !== ''
      ? await db.color.findUnique({
          where: { id: input.colorId },
        })
      : null

  const activity =
    input.activityId !== ''
      ? await db.activity.findUnique({
          where: { id: input.activityId },
        })
      : null

  const options = {
    adjective,
    animal,
    color,
    activity,
  }

  logger.debug(options, '>>> storyOptions')

  return options
}

export const Story: StoryTypeResolvers = {
  animal: (_obj, { root }) => {
    return db.story.findUnique({ where: { id: root?.id } }).animal()
  },
  color: (_obj, { root }) => {
    return db.story.findUnique({ where: { id: root?.id } }).color()
  },
  adjective: (_obj, { root }) => {
    return db.story.findUnique({ where: { id: root?.id } }).adjective()
  },
  activity: (_obj, { root }) => {
    return db.story.findUnique({ where: { id: root?.id } }).activity()
  },
}
