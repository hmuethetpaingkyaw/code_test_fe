import {
  SET_ITEMTYPE,
  SET_SHIPPINGTYPE,
  SET_SHIPPINGMODE,
  SET_PAYMENTTYPE,
  SET_PAYMENTGROUP,
  SET_CURRENCY,
  SET_COLLECTION,
  SET_CONTAINER,
} from 'store/types/other_maintenance'

const initialState = {
  item_types: [],
  shipping_types: [],
  shipping_modes: [],
  payment_types: [],
  payment_groups: [],
  currencies: [],
  collections: [],
  containers: [],
}
const OtherMaintenance = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMTYPE:
      return {
        ...state,
        item_types: action.payload,
      }
    case SET_SHIPPINGTYPE:
      return {
        ...state,
        shipping_types: action.payload,
      }
    case SET_SHIPPINGMODE:
      return {
        ...state,
        shipping_modes: action.payload,
      }
    case SET_PAYMENTTYPE:
      return {
        ...state,
        payment_types: action.payload,
      }
    case SET_PAYMENTGROUP:
      return {
        ...state,
        payment_groups: action.payload,
      }
    case SET_CURRENCY:
      return {
        ...state,
        currencies: action.payload,
      }
    case SET_COLLECTION:
      return {
        ...state,
        collections: action.payload,
      }

    case SET_CONTAINER:
      return {
        ...state,
        containers: action.payload,
      }

    default:
      return state
  }
}
export default OtherMaintenance
