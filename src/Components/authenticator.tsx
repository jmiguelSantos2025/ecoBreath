import {auth} from '../../firebaseConfig';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,AuthError, signOut} from 'firebase/auth'


export const signUp = async(email:string,password:string)=>{
    try{
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        return {sucess:true, message:"Usuários cadastrados com sucesso!" ,user: userCredential.user};

    }catch(error:any){
        return{sucess:false,message: error.message};

    }

}
export const signIn = async(email:string,password:string)=>{
    try{
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        return {sucess:true, message:"Login acessado com sucesso!" ,user: userCredential.user};

    }catch(error:any){
        return{sucess:false,message: error.message};

    }

}
export const logOut = async()=>{
    try{

        await signOut(auth);
        return {sucess:true, message: "Logout realizado com sucesso!"};
    }catch(error:any){
        return{sucess:false,message: error.message};

    }

}