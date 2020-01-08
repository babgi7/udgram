import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { updateUserTodo } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

const logger = createLogger('updateTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  const todoId = event.pathParameters.todoId

  logger.info('TodoId', todoId)

  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  await updateUserTodo({name: updatedTodo.name, 
                        dueDate: updatedTodo.dueDate,
                        done: updatedTodo.done}, todoId, jwtToken)
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: {}
    })
  }

}
