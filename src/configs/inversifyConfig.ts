import { Container } from 'inversify'
import { TYPES } from '../constants'
import * as controllers from '../controllers'
import * as services from '../services'
// import { Auth } from '../middleware/auth'
import { ErrorHandler } from '../utils'

//container
const container = new Container()

//middleware
// container.bind<Auth>(Auth).toSelf()

//controller
for (const i in controllers) {
  const Controller = controllers[i]
  container.bind<typeof Controller>(TYPES[Controller.name]).to(Controller)
}

//services
for (const i in services) {
  const Services = services[i]
  container.bind<typeof Services>(TYPES[Services.name]).to(Services)
}


container.bind<ErrorHandler>(ErrorHandler).toSelf()

export default container