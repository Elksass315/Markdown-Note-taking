import winston from 'winston'

export default function (error, req, res, next) {
    winston.error(error.message, error)
    res.status(500).send("somthing faild")
}