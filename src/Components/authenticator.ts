import {auth} from '../../firebaseConfig';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,AuthError, signOut,UserCredential,signInWithCredential, updateProfile, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { firestore } from '../../firebaseConfig';
import { doc,setDoc } from 'firebase/firestore';
import { provider } from '../../firebaseConfig';


export const signUp = async(email:string,password:string,username:string)=>{
    try{
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);   
        const user = userCredential.user;
        await updateProfile(user, {
        displayName: username,});
        await setDoc(doc(firestore, "usuarios",user.uid),{
        username: username,
        email:user.email,
        data_criacao: new Date().toISOString(),
        });

        return {sucess:true, message:"Usuários cadastrados!" ,user: userCredential.user};

    }catch(error:any){
        return{sucess:false,error: error.mensagem||error.code};

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
// export const reauthenticator = async(email:string, password:string)=>{
//     const user = auth.currentUser;
//     if(!user){
//         return false;
//     }
//     const credential = EmailAuthProvider.credential(email, password);
//     try{
//         await reauthenticateWithCredential(user,credential);
//         return true;
//     }catch(error){
//         console.error("Erro ao autenticar", error);
//         alert("Faça Login Novamente , erro de autenticação");
//         return false;
//     }
// }