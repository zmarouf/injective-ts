import {
  DerivativeOrder,
  OrderInfo,
  OrderTypeMap,
  SpotOrder,
} from '@injectivelabs/chain-api/injective/exchange/v1beta1/exchange_pb'
import {
  MsgBatchUpdateOrders as BaseMsgBatchUpdateOrders,
  OrderData,
} from '@injectivelabs/chain-api/injective/exchange/v1beta1/tx_pb'
import { amountToCosmosSdkDecAmount } from '../../../../utils/numbers'
import { MsgBase } from '../../MsgBase'
import snakecaseKeys, { SnakeCaseKeys } from 'snakecase-keys'

export declare namespace MsgBatchUpdateOrders {
  export interface Params {
    subaccountId: string
    spotMarketIdsToCancelAll?: string[]
    derivativeMarketIdsToCancelAll?: string[]
    binaryOptionsMarketIdsToCancelAll?: string[]
    spotOrdersToCancel?: {
      marketId: string
      subaccountId: string
      orderHash: string
    }[]
    derivativeOrdersToCancel?: {
      marketId: string
      subaccountId: string
      orderHash: string
    }[]
    binaryOptionsOrdersToCancel?: {
      marketId: string
      subaccountId: string
      orderHash: string
    }[]
    spotOrdersToCreate?: {
      orderType: OrderTypeMap[keyof OrderTypeMap]
      triggerPrice?: string
      marketId: string
      feeRecipient: string
      price: string
      quantity: string
    }[]
    derivativeOrdersToCreate?: {
      orderType: OrderTypeMap[keyof OrderTypeMap]
      triggerPrice?: string
      feeRecipient: string
      marketId: string
      price: string
      margin: string
      quantity: string
    }[]
    binaryOptionsOrdersToCreate?: {
      orderType: OrderTypeMap[keyof OrderTypeMap]
      triggerPrice?: string
      feeRecipient: string
      marketId: string
      price: string
      margin: string
      quantity: string
    }[]
    injectiveAddress: string
  }

  export type Proto = BaseMsgBatchUpdateOrders

  export type Object = BaseMsgBatchUpdateOrders.AsObject
}

/**
 * @category Messages
 */
export default class MsgBatchUpdateOrders extends MsgBase<
  MsgBatchUpdateOrders.Params,
  MsgBatchUpdateOrders.Proto,
  MsgBatchUpdateOrders.Object
> {
  static fromJSON(params: MsgBatchUpdateOrders.Params): MsgBatchUpdateOrders {
    return new MsgBatchUpdateOrders(params)
  }

  public toProto() {
    const { params } = this

    const message = new BaseMsgBatchUpdateOrders()
    message.setSender(params.injectiveAddress)

    if (
      params.spotMarketIdsToCancelAll &&
      params.spotMarketIdsToCancelAll.length > 0
    ) {
      message.setSpotMarketIdsToCancelAllList(params.spotMarketIdsToCancelAll)
      message.setSubaccountId(params.subaccountId)
    }

    if (
      params.derivativeMarketIdsToCancelAll &&
      params.derivativeMarketIdsToCancelAll.length > 0
    ) {
      message.setDerivativeMarketIdsToCancelAllList(
        params.derivativeMarketIdsToCancelAll,
      )
      message.setSubaccountId(params.subaccountId)
    }

    if (
      params.binaryOptionsMarketIdsToCancelAll &&
      params.binaryOptionsMarketIdsToCancelAll.length > 0
    ) {
      message.setBinaryOptionsMarketIdsToCancelAllList(
        params.binaryOptionsMarketIdsToCancelAll,
      )
      message.setSubaccountId(params.subaccountId)
    }

    if (params.spotOrdersToCancel && params.spotOrdersToCancel.length > 0) {
      const orderDataList = params.spotOrdersToCancel.map(
        ({ marketId, subaccountId, orderHash }) => {
          const orderData = new OrderData()
          orderData.setMarketId(marketId)
          orderData.setSubaccountId(subaccountId)
          orderData.setOrderHash(orderHash)

          return orderData
        },
      )

      message.setSpotOrdersToCancelList(orderDataList)
    }

    if (
      params.derivativeOrdersToCancel &&
      params.derivativeOrdersToCancel.length > 0
    ) {
      const orderDataList = params.derivativeOrdersToCancel.map(
        ({ marketId, subaccountId, orderHash }) => {
          const orderData = new OrderData()
          orderData.setMarketId(marketId)
          orderData.setSubaccountId(subaccountId)
          orderData.setOrderHash(orderHash)

          return orderData
        },
      )

      message.setDerivativeOrdersToCancelList(orderDataList)
    }
    if (
      params.binaryOptionsOrdersToCancel &&
      params.binaryOptionsOrdersToCancel.length > 0
    ) {
      const orderDataList = params.binaryOptionsOrdersToCancel.map(
        ({ marketId, subaccountId, orderHash }) => {
          const orderData = new OrderData()
          orderData.setMarketId(marketId)
          orderData.setSubaccountId(subaccountId)
          orderData.setOrderHash(orderHash)

          return orderData
        },
      )

      message.setDerivativeOrdersToCancelList(orderDataList)
    }

    if (params.spotOrdersToCreate && params.spotOrdersToCreate.length > 0) {
      const orderDataList = params.spotOrdersToCreate.map((args) => {
        const orderInfo = new OrderInfo()
        const paramsFromArgs = {
          ...args,
          price: amountToCosmosSdkDecAmount(args.price).toFixed(),
          triggerPrice: amountToCosmosSdkDecAmount(
            args.triggerPrice || 0,
          ).toFixed(),
          quantity: amountToCosmosSdkDecAmount(args.quantity).toFixed(),
        }

        orderInfo.setSubaccountId(params.subaccountId)
        orderInfo.setFeeRecipient(paramsFromArgs.feeRecipient)
        orderInfo.setPrice(paramsFromArgs.price)
        orderInfo.setQuantity(paramsFromArgs.quantity)

        const order = new SpotOrder()
        order.setMarketId(paramsFromArgs.marketId)
        order.setOrderType(paramsFromArgs.orderType)
        order.setOrderInfo(orderInfo)

        if (paramsFromArgs.triggerPrice) {
          order.setTriggerPrice(paramsFromArgs.triggerPrice)
        }

        return order
      })

      message.setSpotOrdersToCreateList(orderDataList)
    }

    if (
      params.derivativeOrdersToCreate &&
      params.derivativeOrdersToCreate.length > 0
    ) {
      const orderDataList = params.derivativeOrdersToCreate.map((args) => {
        const paramsFromArgs = {
          ...args,
          price: amountToCosmosSdkDecAmount(args.price).toFixed(),
          margin: amountToCosmosSdkDecAmount(args.margin).toFixed(),
          triggerPrice: amountToCosmosSdkDecAmount(
            args.triggerPrice || 0,
          ).toFixed(),
          quantity: amountToCosmosSdkDecAmount(args.quantity).toFixed(),
        }

        const orderInfo = new OrderInfo()
        orderInfo.setSubaccountId(params.subaccountId)
        orderInfo.setFeeRecipient(paramsFromArgs.feeRecipient)
        orderInfo.setPrice(paramsFromArgs.price)
        orderInfo.setQuantity(paramsFromArgs.quantity)

        const order = new DerivativeOrder()
        order.setMarketId(paramsFromArgs.marketId)
        order.setOrderType(paramsFromArgs.orderType)
        order.setOrderInfo(orderInfo)
        order.setMargin(paramsFromArgs.margin)

        if (paramsFromArgs.triggerPrice) {
          order.setTriggerPrice(paramsFromArgs.triggerPrice)
        }

        return order
      })

      message.setDerivativeOrdersToCreateList(orderDataList)
    }
    if (
      params.binaryOptionsOrdersToCreate &&
      params.binaryOptionsOrdersToCreate.length > 0
    ) {
      const orderDataList = params.binaryOptionsOrdersToCreate.map((args) => {
        const paramsFromArgs = {
          ...args,
          price: amountToCosmosSdkDecAmount(args.price).toFixed(),
          margin: amountToCosmosSdkDecAmount(args.margin).toFixed(),
          triggerPrice: amountToCosmosSdkDecAmount(
            args.triggerPrice || 0,
          ).toFixed(),
          quantity: amountToCosmosSdkDecAmount(args.quantity).toFixed(),
        }
        const orderInfo = new OrderInfo()
        orderInfo.setSubaccountId(params.subaccountId)
        orderInfo.setFeeRecipient(paramsFromArgs.feeRecipient)
        orderInfo.setPrice(paramsFromArgs.price)
        orderInfo.setQuantity(paramsFromArgs.quantity)

        const order = new DerivativeOrder()
        order.setMarketId(paramsFromArgs.marketId)
        order.setOrderType(paramsFromArgs.orderType)
        order.setOrderInfo(orderInfo)
        order.setMargin(paramsFromArgs.margin)

        if (paramsFromArgs.triggerPrice) {
          order.setTriggerPrice(paramsFromArgs.triggerPrice)
        }

        return order
      })

      message.setDerivativeOrdersToCreateList(orderDataList)
    }

    return message
  }

  public toData() {
    const proto = this.toProto()

    return {
      '@type': '/injective.exchange.v1beta1.MsgBatchUpdateOrders',
      ...proto.toObject(),
    }
  }

  public toAmino() {
    const proto = this.toProto()
    const message = {
      ...snakecaseKeys(proto.toObject()),
    }

    /*
    const web3Message = proto.toObject() as any

    delete web3Message.spotMarketIdsToCancelAllList
    delete web3Message.derivativeMarketIdsToCancelAllList
    delete web3Message.spotOrdersToCancelList
    delete web3Message.derivativeOrdersToCancelList
    delete web3Message.spotOrdersToCreateList
    delete web3Message.derivativeOrdersToCreateList
    // delete web3Message.subaccountId

    /*
    if (web3Message.derivativeMarketIdsToCancelAllList !== undefined) {
      web3Message.derivative_market_ids_to_cancel_all =
        web3Message.derivativeMarketIdsToCancelAllList

      delete web3Message.derivativeMarketIdsToCancelAllList
    }

    if (web3Message.spotMarketIdsToCancelAllList !== undefined) {
      web3Message.spot_market_ids_to_cancel_all =
        web3Message.spotMarketIdsToCancelAllList

      delete web3Message.spotMarketIdsToCancelAllList
    }

    if (web3Message.spotOrdersToCancelList !== undefined) {
      web3Message.spot_orders_to_cancel = web3Message.spotOrdersToCancelList

      delete web3Message.spotOrdersToCancelList
    }

    if (web3Message.derivativeOrdersToCancelList !== undefined) {
      web3Message.derivative_orders_to_cancel =
        web3Message.derivativeOrdersToCancelList

      delete web3Message.derivativeOrdersToCancelList
    }

    if (web3Message.spotOrdersToCreateList !== undefined) {
      web3Message.spot_orders_to_create = web3Message.spotOrdersToCreateList

      delete web3Message.spotOrdersToCreateList
    }

    if (web3Message.derivativeOrdersToCreateList !== undefined) {
      web3Message.derivative_orders_to_create =
        web3Message.derivativeOrdersToCreateList

      delete web3Message.derivativeOrdersToCreateList
    }

    if (!web3Message.subaccountId) {
      delete web3Message.subaccountId
    }*/

    return {
      type: 'exchange/MsgBatchUpdateOrders',
      value: message as unknown as SnakeCaseKeys<MsgBatchUpdateOrders.Object>,
    }
  }

  public toWeb3() {
    const amino = this.toAmino()
    const { value } = amino

    return {
      '@type': '/injective.exchange.v1beta1.MsgBatchUpdateOrders',
      ...value,
    }
  }

  public toDirectSign() {
    const proto = this.toProto()

    return {
      type: '/injective.exchange.v1beta1.MsgBatchUpdateOrders',
      message: proto,
    }
  }
}
