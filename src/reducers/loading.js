/**
 * AiLife
 */

const initialState = {
  loadingCount:0,
  prompt:undefined,
  enable:true
}

export default (state = initialState ,action) => {
  if (action.type === 'loading_start') {
    let {prompt} = action
    return {
      ...state,
      loadingCount: (state.loadingCount + 1),
      prompt: prompt
    }
  } else if (action.type === 'loading_end') {
    return {
      ...state,
      loadingCount: (state.loadingCount - 1),
      prompt: undefined
    }
  } else if (action.type === 'ebable_loading') {
    return {
      ...state,
      enable: true
    }
  } else if (action.type === 'disable_loading') {
    return {
      ...state,
      enable: false
    }
  } else if (action.type === 'reset' || action.type === 'rest_loading') {
    return initialState
  } else {
    return state
  }
}
