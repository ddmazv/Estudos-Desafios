import axios from "axios";
import { isAsExpression } from "typescript";
import { BaseService } from "./BaseService";
/*
export const axiosInstace = axios.create({
baseURL: "http://localhost:8080"
})
*/
export class UsuarioService extends BaseService{

    constructor(){
        super("/user")
    }
}