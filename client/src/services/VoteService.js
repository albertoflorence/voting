import Api from '@/services/Api'

export default {
  vote (optionId) {
    return Api().post('votes', optionId)
  },
  index (pollId) {
    return Api().get('votes', {
      params: pollId
    })
  },
  count (params) {
    return Api().get('votes/count', {
      params: params
    })
  }
}
