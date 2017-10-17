export function resetLoading () {
  return {
    type:'rest_loading'
  }
}

export function loadingStart (prompt) {
  return {
    type:'loading_start',
    prompt
  }
}

export function loadingEnd () {
  return {
    type:'loading_end'
  }
}

export function enableLoading () {
  return {
    type:'ebable_loading'
  }
}

export function disableLoading () {
  return {
    type:'disable_loading'
  }
}
