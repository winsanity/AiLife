/**
 * AiLife
 */

export function resetNetwork() {
  return {
    type: 'reset_network'
  }
}

export function setNetwork(state) {
  return {
    type: 'set_network',
    ...state
  }
}
