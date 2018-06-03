const actions = {
  changeName(name){
    return {
      type: 'changeName',
      name
    }
  },
  access(){
    return {
      type: 'access'
    }
  }
}

export default actions
