import Api from '@/services/Api'

export default {
    index() {
        return Api().get('lipstick')
    },
    show(lipstickId) {
        return Api().get('lipstick/' + lipstickId)
    },
    post(lipstick) {
        return Api().post('lipstick', lipstick)
    },
    put(lipstick) {
        return Api().put('lipstick/' + lipstick.id, lipstick)
    },
    delete(lipstick) {
        return Api().delete('lipstick/' + lipstick.id, lipstick)
    },
}
