import Joi, {Schema} from 'joi'
import {newFirebaseAdmin} from '@features/firebase'
import type {HTTPResponse, APIHandler} from '@types'

type StatusCode = number
const StatusMethodNotAllowed: StatusCode = 405
const StatusOK: StatusCode = 200
const StatusBadRequest: StatusCode = 400
// const StatusUnauthorized: StatusCode = 401
// const StatusForbidden: StatusCode = 403
const StatusInternalServerError: StatusCode = 500

const ErrMethodNotAllowed = new Error('error: method not allowed')

const newResponse = <TData = unknown>(status: StatusCode, data: TData): HTTPResponse<TData> => {
  if (status >= StatusBadRequest) {
    if (data instanceof Error) {
      return {
        status,
        success: false,
        message: data.message,
      }
    }

    if (typeof data === 'string') {
      return {
        status,
        success: false,
        message: data,
      }
    }

    throw new Error('error: invalid parameters')
  }

  return {
    status,
    success: true,
    data,
  }
}

type BodySchema = {
  token: string
}

const bodySchema: Schema<BodySchema> = Joi.object({
  token: Joi.string().required(),
})

const verify: APIHandler<any, BodySchema> = async (req, res) => {
  try {
    const {auth} = newFirebaseAdmin()

    if (req.method !== 'POST') {
      return res.status(StatusMethodNotAllowed).json(newResponse(StatusMethodNotAllowed, ErrMethodNotAllowed))
    }

    const {error: validationError} = bodySchema.validate(req.body)
    if (validationError) {
      return res.status(StatusBadRequest).json(newResponse(StatusBadRequest, validationError))
    }

    const {token} = req.body
    const decodedToken = await auth.verifyIdToken(token)

    return res.status(StatusOK).json(newResponse(StatusOK, decodedToken))
  } catch (e) {
    if (e instanceof Error) {
      return res.status(StatusBadRequest).json(newResponse(StatusBadRequest, e))
    }

    const internalServerError = new Error('error: internal server error')
    return res.status(StatusInternalServerError).json(newResponse(StatusInternalServerError, internalServerError))
  }
}

export default verify
