import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getUploadUrl } from '../../businessLogic/todos'

const logger = createLogger('UploadUrl')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Caller event', event)
  const todoId = event.pathParameters.todoId

  logger.info('TodoId', todoId)

  const url: string = getUploadUrl(todoId)
  
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },    
    body: JSON.stringify({
      uploadUrl: url
    })
  }
}
