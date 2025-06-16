import axios from "axios";


export const axiosInstace = axios.create({
baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_API
})

export class BaseService{
    url: string;

    constructor(url:string){
        this.url = url;
    }

    listarTodos(){
        return axiosInstace.get(this.url);
    }

    buscarPorId(id : number){
        return axiosInstace.get(this.url+"/"+id);
    }

    inserir(objeto : any){
       
        return axiosInstace.post(this.url, objeto);
    }

    alterar(objeto : any){
        return axiosInstace.put(this.url, objeto);
    }

    excluir(id : number){
        return axiosInstace.delete(this.url+"/"+ id);
    }
}