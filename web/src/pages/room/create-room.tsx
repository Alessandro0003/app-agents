import { Link } from 'react-router-dom'

export const CreateRoom = () => {
  return (
    <div>
      <div>Create Room</div>
      <Link className="underline" to="/room">
        Acessar sala
      </Link>
    </div>
  )
}
