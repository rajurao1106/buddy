import signup from "../models/authentication.js";

export const signupForm = async(req, res) => {
    try {
        const {email, password} = req.body
        const signupForm = new signup({email, password})
        await signupForm.save()
        res.status(201).send('signin Successful')
    } catch (error) {
        res.status(400).send('signin Error')
    }
}
