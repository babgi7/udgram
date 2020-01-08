import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { TodoItem } from '../../models/TodoItem'
import { createTodo } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import * as uuid from 'uuid'

const logger = createLogger('createTodo')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Event Processing', event.body)

  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  const todoId = uuid.v4()

  const newItem: TodoItem = await createTodo(
    {
      todoId,
      createdAt: new Date().toISOString(),
      name: newTodo.name,
      dueDate: newTodo.dueDate,
      done: false,
      attachmentUrl: null
    }
    , jwtToken)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newItem
    })
  }
}
