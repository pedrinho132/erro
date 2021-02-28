import  React, { Component,useState,useEffect } from 'react';
import { StyleSheet, View, Text,TouchableHighlight,ScrollView,Image,SafeAreaView,TextInput,Dimensions,Button} from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import "@react-native-firebase/app";
import Geolocation from '@react-native-community/geolocation';
import "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';




const styles = StyleSheet.create({

  txt:{
    fontSize:10,
    fontWeight:'bold',
    marginTop:5
  },
  })


  

 export default ACTE = ({ route,navigation }) => {

  const dispatch = useDispatch();
  const fotosDoc  = useSelector( state => state.criarPedido.act );
  const endereco  = useSelector( state => state.criarPedido.endereco );
  const [ userData, setUserData ] = useState();
  const reference = storage().ref('pedidos');
  const [ latitude, setLatitude ] = useState();
  const [ longitude, setLongitude ] = useState();
  const [ situaçao, setInputSituaçao] = useState()



  useEffect(()=>{
    console.log(endereco)
    auth().onAuthStateChanged(function(user) {
      if (user) {
         setUserData(user)
      } else {
          // No user is signed in.
          console.log('There is no logged in user');
      }
  })
  },[fetchLocation()])


  const VerDoc = ({tipoDoc,fotosDocs}) => {
    if(fotosDocs){
    return(
      <Text onPress={()=>navigation.navigate('verDoc',{tipoDoc:tipoDoc})} style={{fontSize:15,marginLeft:15,fontWeight:'bold',color:'#49e698'}}>Ver Documento</Text>
    )
    }

    else return null
  }

  function fetchLocation (){
    Geolocation.getCurrentPosition(info => {
      const position = info.coords
      setLatitude(position.latitude)
      setLongitude(position.longitude)
    });
   }



   function gerarPedido  ()  {
      const email = userData.email
      const email64 = base64.encode(email)
      database()
      .ref(`/pedidos/${email64}`)
      .set({ email:email, nome:userData.displayName,endereco:endereco,latitude:latitude,longitude:longitude,descricao:situaçao })
      navigation.navigate('perfilCliente')
  }

  function inputSituaçao(texto){
    setInputSituaçao(texto)
  }


  

    return (
 
                      
                       <View style={{flex:1}} >
                        <ScrollView contentContainerStyle={{height:1400,width:'100%'}} >
     
          <Text style={{fontSize:14,fontWeight:'bold'}} >Dados para registro do imóvel</Text>

              <View style={{height:'20%',width:'100%'}} >

                   <View style={{flex:1}}>

                        <Text style={styles.txt} > Certidão de inteiro Teor (Documento com validade de 30 dias)*</Text>
                
                   </View>

                   <View style={{marginTop:5,flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <TouchableHighlight onPress={()=> navigation.navigate('cameraPedido',{tipo:'foto_cteor'})} style={{marginRight:15,height:'70%',width:'40%',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'green'}}>
                          <Text style={{color:'black',fontSize:10}} >Anexar Documento</Text>
                        </TouchableHighlight>

                        <VerDoc fotosDocs={fotosDoc.cteor} tipoDoc='cteor' />
                   </View>

             </View>

             <View style={{height:'20%',width:'100%'}} >

<View style={{flex:1}}>

     <Text style={styles.txt} > Certidao de relatorios de ONUS  (Documento com validade de 30 dias)*</Text>

</View>

<View style={{marginTop:5,flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
     <TouchableHighlight onPress={()=> navigation.navigate('cameraPedido',{tipo:'foto_cro'})} style={{marginRight:15,height:'70%',width:'40%',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'green'}}>
     <Text style={{color:'black',fontSize:10}} >Anexar Documento</Text>
     </TouchableHighlight>

     <VerDoc fotosDocs={fotosDoc.cRO} tipoDoc='cRO' />
</View>

</View>

<View style={{height:'20%',width:'100%'}} >

<View style={{flex:1}}>

     <Text style={styles.txt} > Certidao de relatorios de AÇÕES (Documento com validade de 30 dias)*</Text>

</View>

<View style={{marginTop:5,flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
     <TouchableHighlight onPress={()=> navigation.navigate('cameraPedido',{tipo:'foto_cra'})} style={{marginRight:15,height:'70%',width:'40%',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'green'}}>
     <Text style={{color:'black',fontSize:10}} >Anexar Documento</Text>
     </TouchableHighlight>

     <VerDoc fotosDocs={fotosDoc.cRA} tipoDoc='cRA' />
</View>

</View>


<View style={{height:'20%',width:'100%'}} >

<View style={{flex:1}}>

     <Text style={styles.txt} >Conta de agua ou ortoga da agua (Documento com validade de 30 dias)*</Text>

</View>

<View style={{marginTop:5,flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
     <TouchableHighlight onPress={()=> navigation.navigate('cameraPedido',{tipo:'foto_coa'})} style={{marginRight:15,height:'70%',width:'40%',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'green'}}>
     <Text style={{color:'black',fontSize:10}} >Anexar Documento</Text>
     </TouchableHighlight>

     <VerDoc fotosDocs={fotosDoc.cOA} tipoDoc='cOA' />
</View>

</View>


<View style={{height:'20%',width:'100%'}} >

<View style={{flex:1}}>

     <Text style={styles.txt} > Alvará de Construção/ART</Text>

</View>

<View style={{marginTop:5,flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
     <TouchableHighlight onPress={()=> navigation.navigate('cameraPedido',{tipo:'foto_alvaraC'})} style={{marginRight:15,height:'70%',width:'40%',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'green'}}>
     <Text style={{color:'black',fontSize:10}} >Anexar Documento</Text>
     </TouchableHighlight>

     <VerDoc fotosDocs={fotosDoc.alvaraC} tipoDoc='alvaraC' />
</View>

</View>

<View style={{height:'10%',width:'100%'}} >

<View style={{flex:1}}>

     <Text style={styles.txt} >Projeto Legal(apresentar tambem o projeto arquitetônico caso a prefeitura analise/aprove projeto simplicado )</Text>

</View>

<View style={{marginTop:5,flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
     <TouchableHighlight onPress={()=> navigation.navigate('cameraPedido',{tipo:'foto_projetoLegal'})} style={{marginRight:15,height:'70%',width:'40%',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'green'}}>
     <Text style={{color:'black',fontSize:10}} >Anexar Documento</Text>
     </TouchableHighlight>

     <VerDoc fotosDocs={fotosDoc.projetoLegal} tipoDoc='projetoLegal' />
</View>

</View>


<View style={{height:'10%',width:'100%'}} >

<View style={{flex:1}}>

     <Text style={styles.txt} >Planilha de financiamento de unidade isolada (PFUI) devidamente preenchida e assinada pelo Responsavel Tecnico</Text>

</View>

<View style={{marginTop:5,flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
     <TouchableHighlight onPress={()=> navigation.navigate('cameraPedido',{tipo:'foto_pfui'})} style={{marginRight:15,height:'70%',width:'40%',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'green'}}>
     <Text style={{color:'black',fontSize:10}} >Anexar Documento</Text>
     </TouchableHighlight>

     <VerDoc fotosDocs={fotosDoc.pfui} tipoDoc='pfui' />
</View>

</View>


<View style={{height:'10%',width:'100%'}} >

<View style={{flex:1}}>

     <Text style={styles.txt} >Projetos assinados (Elétrico,Hidráulico,Sanitario)</Text>

</View>

<View style={{marginTop:5,flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
     <TouchableHighlight onPress={()=> navigation.navigate('cameraPedido',{tipo:'foto_projetosAssinados'})} style={{marginRight:15,height:'70%',width:'40%',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'green'}}>
     <Text style={{color:'black',fontSize:10}} >Anexar Documento</Text>
     </TouchableHighlight>

     <VerDoc fotosDocs={fotosDoc.projetosAssinados} tipoDoc='projetosAssinados' />
</View>

</View>
       
            </ScrollView>
                 </View>
    
            
               
    )
}
  


