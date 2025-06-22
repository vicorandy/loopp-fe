import Cookies from 'js-cookie';


export function getUsersToken(){
    const accessToken = Cookies.get('authToken');
    return (accessToken)
}
