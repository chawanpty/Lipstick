import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import UploadService from '@/services/UploadService'

import CommentIndex from '@/components/Comments/index'
import Upload from '@/components/Utils/upload'


import LipstickIndex from '@/components/Lipsticks/Index'
import LipstickCreate from '@/components/Lipsticks/CreateLipstick'
import LipstickShow from '@/components/Lipsticks/ShowLipstick'
import LipstickEdit from '@/components/Lipsticks/EditLipstick'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/users',
            name: 'users',
            component: UserIndex
        },
        {
            path: '/user/edit/:userId',
            name: 'user-edit',
            component: UserEdit
        },
        {
            path: '/user/create',
            name: 'user-create',
            component: UserCreate
        },
        {
            path: '/user/:userId',
            name: 'user',
            component: UserShow
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/lipsticks',
            name: 'lipsticks',
            component: LipstickIndex
        },
        {
            path: '/lipstick/create',
            name: 'lipstick-create',
            component: LipstickCreate
        },
        {
            path: '/lipstick/edit/:lipstickId',
            name: 'lipstick-edit',
            component: LipstickEdit
        },
        {
            path: '/lipstick/:lipstickId',
            name: 'lipstick',
            component: LipstickShow
        },
        {
            path: '/upload',
            name: 'upload',
            component: UploadService
        },
        
    ]
})
