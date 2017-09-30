import Api from '@/services/Api'

export default {
  create (poll) {
    return Api().post('polls/create', poll)
  },
  index () {
    return Api().get('polls')
  },
  show (pollId) {
    return Api().get(`polls/${pollId}`)
  },
  userPolls () {
    return Api().get('polls/user/0', {params: {by: 'user'}})
  },
  delete (pollId) {
    return Api().delete(`polls/${pollId}`)
  },
  addOption (pollId, optionName) {
    return Api().put(`polls/${pollId}/add-option`, {optionName})
  }
}
