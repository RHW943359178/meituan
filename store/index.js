export const state = () => ({

})

export const actions = {
  async nuxtServerInit({
    commit
  },{req, app}) {
    const {status,data: {province,city}} = await app.$axios.get('/geo/getPosition')
    console.log(data, 'data')
    commit('geo/setPosition', status === 200 ? {city, province} : {city: '',province: ''})      
  }
}
