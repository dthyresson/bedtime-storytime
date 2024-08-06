export const schema = gql`
  type Story {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    story: String!
    summary: String!
    pictureUrl: String!
    animalId: String!
    colorId: String!
    adjectiveId: String!
    activityId: String!
    animal: Animal!
    color: Color!
    adjective: Adjective!
    activity: Activity!
  }

  type Query {
    stories: [Story!]! @requireAuth
    story(id: String!): Story @requireAuth
  }

  input CreateStoryInput {
    title: String!
    story: String!
    summary: String!
    pictureUrl: String!
    animalId: String!
    colorId: String!
    adjectiveId: String!
    activityId: String!
  }

  input UpdateStoryInput {
    title: String
    story: String
    summary: String
    pictureUrl: String
    animalId: String
    colorId: String
    adjectiveId: String
    activityId: String
  }

  type Mutation {
    createStory(input: CreateStoryInput!): Story! @requireAuth
    updateStory(id: String!, input: UpdateStoryInput!): Story! @requireAuth
    deleteStory(id: String!): Story! @requireAuth
  }
`
