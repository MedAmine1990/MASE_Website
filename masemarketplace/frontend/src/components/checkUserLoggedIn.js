import axios from 'axios';

export async function checkSessionToken()
{    
    var isTokenValid=false
    await axios.get('usermanagement/testaccesstoken').then(res => {
        if('result' in res.data)
        {
            if(!('detail' in res.data.result))
                isTokenValid=true
        }
    })
    console.log("Session token implemented")
    return isTokenValid
}

export async function getSessionEmail()
{
    var result= ""
    await axios.get('usermanagement/getsessionemail').then(res =>{
                                                        if(res.data.email!=null)
                                                            result = res.data.email;
                                                        else
                                                            result="";
                                                        })
    console.log("Session email implemented")
    return result;
}

export async function checkUserVerified()
{
    var result= false
    var _email= await getSessionEmail();
    console.log(_email)
    if (_email!="")
    {
        await axios.post('usermanagement/checkuserverified', {
                email:_email
            }).then(res =>{
                                if(res.data.userverified!=null)
                                    result = res.data.userverified;
                                else
                                    result = false;
                            })    
    }
    console.log({result:result, email:_email})
    return {result:result, email:_email};
}