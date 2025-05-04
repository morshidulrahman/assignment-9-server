import { Response } from "express";

const SendResponse=<T>(res:Response,jsondata:{
    statusCode: number,
    success: boolean,
    message: string,
    meta?: {
        page: number,
        limit: number,
        total: number
    },
    data: T | null | undefined
} )=>{
res.status(jsondata.statusCode).json({
    success:jsondata.success,
    message:jsondata.message,
    meta:jsondata.meta || null || undefined,
    data:jsondata.data || null || undefined
})
}

export default SendResponse