import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faVuejs, faJs, faNodeJs, faCss3Alt, faGithub, faWeixin } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot, faLightbulb, faLink, faEnvelope, faPaperPlane, faGlobe, faArrowRight, faStar, faBriefcase } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faVuejs, faJs, faNodeJs, faCss3Alt, faGithub, faWeixin, faLocationDot, faLightbulb, faLink, faEnvelope, faPaperPlane, faGlobe, faArrowRight, faStar, faBriefcase)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
