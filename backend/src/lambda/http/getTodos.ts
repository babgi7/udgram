import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { getUserTodos } from '../../businessLogic/todos';
import { createLogger } from '../../utils/logger'
import { TodoItem } from '../../models/TodoItem';

const logger = createLogger('getTodos')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Event Processing', event)

  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1] 
  
    
  const userTodoItems: TodoItem[] = await getUserTodos(jwtToken) 

  
  let items = JSON.parse(JSON.stringify(userTodoItems))

  logger.info('User Todo items', items)

 
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items
    })
  }
  

}
