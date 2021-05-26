import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const LoginPageDay = () => import('../views/login/LoginDay.vue')
const LoginPageNight = () => import('../views/login/LoginNight.vue')
const RegisterPageDay = () => import('../views/register/RegisterDay.vue')
const RegisterPageNight = () => import('../views/register/RegisterNight.vue')
const RealHomePage = () => import('../views/realHome/RealHome.vue')
const PersonPage = () => import('../views/person/PersonPage.vue')
const HistoryPage = () => import('../views/History/history_test.vue')
const ChatroomPage = () => import('../views/chat_test/room.vue')
const ChatListPage = () => import('../views/chat_test/chatList.vue')
const SearchPassPage = () => import('../views/chat_test/search_pass.vue')
const ImageUploaderPage = () => import('../views/chat_test/uploadImage.vue')
const ShouzhangPreviewPage = () => import('../views/History/shouzhangPreview.vue')
const ShouzhangResultPage = () => import('../views/History/shouzhangResult.vue')
const styleChoosePage = () => import('../views/History/styleChoose.vue')
const shouzhangRecordsPage = () => import('../views/person/shouzhangRecords.vue')

const routes = [
  {
    path: '/',
    redirect: '/loginday'
  },
  {
	path: '/loginday',
	name: 'LoginDay',
	component: LoginPageDay
  },
  {
  	path: '/loginnight',
  	name: 'LoginNight',
  	component: LoginPageNight
  },
  {
  	path: '/registerday',
  	name: 'RegisterDay',
  	component: RegisterPageDay
  },
  {
  	path: '/registernight',
  	name: 'RegisterNight',
  	component: RegisterPageNight
  },
  {
  	path: '/realhome',
  	name: 'RealHome',
  	component: RealHomePage
  },
  {
  	path: '/personpage',
  	name: 'PersonPage',
  	component: PersonPage
  },
  {
  	path: '/historypage',
  	name: 'HistoryPage',
  	component: HistoryPage
  },
  {
  	path: '/chatroom',
  	name: 'ChatRoom',
  	component: ChatroomPage
  },
  {
  	path: '/chatlist',
  	name: 'chatList',
  	component: ChatListPage
  },
  {
  	path: '/searchpass',
  	name: 'searchpass',
  	component: SearchPassPage
  },
  {
  	path: '/imguploader',
  	name: 'imguploader',
  	component: ImageUploaderPage
  },
  {
  	path: '/shouzhangpreview',
  	name: 'shouzhangpreview',
  	component: ShouzhangPreviewPage
  },
  {
  	path: '/shouzhangresult',
  	name: 'shouzhangresult',
  	component: ShouzhangResultPage
  },
  {
  	path: '/stylechoose',
  	name: 'stylechoose',
  	component: styleChoosePage
  },
  {
  	path: '/shouzhangrecords',
  	name: 'shouzhangrecords',
  	component: shouzhangRecordsPage
  },
]

const router = new VueRouter({
  // mode:'history',
  routes
})

export default router
