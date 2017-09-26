import Api from '@/services/Api'

export default {
  create (poll) {
    return Api().post('polls/create', poll)
  },
  index (userId) {
    return Api().get('polls', userId)
  }
  vote (itemId) {
    return Api().put('polls/', itemId)
  }
}
