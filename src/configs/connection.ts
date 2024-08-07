import {connect} from 'mongoose'
import { environment } from '../environment'
import { messages } from '../constants'

export class Connection {
     async connect(): Promise<void> {
      return connect((environment.url as string))
        .then(() => {
          console.log(messages.CONNECTION_SUCCESS)
        })
        .catch((error: Error) => {
          console.log(error)
        })
    }
  }