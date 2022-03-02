import { default as passwordController } from './passwordController.js'
import { default as authController } from './authController.js'



const controllers = {
    ...authController,
    ...passwordController
}

export default controllers;

