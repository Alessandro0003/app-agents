import type { Room } from "../schemas"


export namespace GetRoom {
  export type Args = {}

  export type Response = Room[]
}