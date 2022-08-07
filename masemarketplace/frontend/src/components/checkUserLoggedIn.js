import axios from 'axios';

export async function checkSessionToken()
{
    var isTokenValid=false
    await axios.get('usermanagement/testaccesstoken').then(res => {
        if(res.data.result.detail==null)
        {
           isTokenValid=true
        }
    })
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
    return result;
}

export async function checkUserVerified()
{
    var result= false
    var _email= await getSessionEmail();
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
    //console.log('userverified:'+result)
    return result;
}