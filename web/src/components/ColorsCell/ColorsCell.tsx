import type { ColorsQuery, ColorsQueryVariables } from 'types/graphql'

import { useParams } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import { StoryOptionList, StoryOptionLink } from 'src/components/StoryOptions'

export const QUERY: TypedDocumentNode<ColorsQuery, ColorsQueryVariables> = gql`
  query ColorsQuery {
    colors {
      id
      name
      code
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ colors }: CellSuccessProps<ColorsQuery>) => {
  const { adjectiveId, animalId, activityId } = useParams()

  return (
    <StoryOptionList>
      {colors.map((item) => (
        <StoryOptionLink
          key={`color-${item.id}-${item.name}`}
          options={{
            adjectiveId,
            animalId,
            colorId: item.id,
            activityId,
          }}
          id={item.id}
          code={item.code}
          name={item.name}
        />
      ))}
    </StoryOptionList>
  )
}
