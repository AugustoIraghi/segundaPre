import { Router } from "express"

const router = Router()

router.get('/in', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

export default router