import { useGetRoom } from "../hooks/queries"

export const ListRoomContaiers = () => {
  const { data: rooms, isLoading } = useGetRoom({})

  console.log(rooms)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <pre>{JSON.stringify(rooms, null, 2)}</pre>
    </div>
  )
}