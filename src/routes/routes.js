import Authorization from '../pages/Authorization/Authorization'
import Registration from '../pages/Registration/Registration'
import PasswordRestoring from '../pages/PasswordRestoring/PasswordRestoring'
import User from '../pages/User/User'

const routes = {
  publicRoutes:[
    {
      path:'/auth',
      component:Authorization
    },
    {
      path:'/registration',
      component:Registration
    },
    {
      path:'/restoring',
      component:PasswordRestoring
    }
  ],
  authRoutes:[
    {
      path:'/user',
      component:User
    }
  ]
}

export default routes
