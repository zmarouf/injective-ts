import { Exception } from '../exception'
import { ErrorContext, ErrorType } from '../types'

export class GrpcUnaryRequestException extends Exception {
  constructor(error: Error, context?: ErrorContext) {
    super(error, context)

    this.type = ErrorType.GrpcUnaryRequest
  }

  // eslint-disable-next-line class-methods-use-this
  protected parseMessage(): void {
    //
  }
}
