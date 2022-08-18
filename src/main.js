import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router'
import {Menu,Submenu,MenuItem,Button,Input,Form,FormItem,
	Pagination,Carousel,CarouselItem,
	Dropdown,DropdownMenu,DropdownItem,
	Avatar,DatePicker,Upload,Badge,Table,TableColumn,
	Message,Tag,
} from 'element-ui'
// mavon-editor 引入
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.use(VueRouter)

// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Pagination)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Avatar)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Badge)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)

Vue.prototype.$message=Message
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)



new Vue({
	el:"#app",
	render: h => h(App),
	store,
	router,
	beforeCreate() {
		Vue.prototype.$bus=this
	}

})
