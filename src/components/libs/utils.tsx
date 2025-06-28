import Cookies from 'js-cookie';


export function getUsersToken(){
    const accessToken = Cookies.get('authToken');
    return (accessToken)
}

export function slugify(data:any){
    return data.toLowerCase().trim().split(' ').join('-')
   
}