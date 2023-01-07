# Aprendizados REACT

* é uma biblioteca do JavaScript que tem como objetivo a criação de interfaces
* vitejs.dev/guide/#trying-vite-online -> pesquisar como começar um projeto com REACT
* O react funciona atravez de funções e obrigatoriamente voce precisa ter um retorno e esse retorno sempre será em HTML
* Todo conteudo será inserido no elemento ROOT no caso pq estamos renderizando ele exatamente nesse arquivo utilizando a DOM

## Criando o projeto com react

``` node 
npm create vite@latest reactapp --template react 
// Entrar na pasta reactapp criada e inserir
npm install 
// Com isso terá instalado as dependencias
```
#### .JSX

* JSX Sintaxe === É a sintaxe que o react usa para que possamos criar nossas interfaces de forma declarativa
* Dentro do JSX temos uma função e o retorno dela será HTML -> que será o conteudo renderizado na tela

## Fragment

* Regras
- Uma função JSX retorna apenas UM elemento único HTML <br>
- Toda tag html que está no retorno da função JSX, voce necessita por a tag de fechamento "/>" <br>

## Importando arquivos CSS

* Dentro da pasta Scr(Source) cria uma paste Style e la voce coloca os CSSs
* Para importar um CSS para o React Jsx {
    * no main.jsx crie um 
    ``` jsx
        import './style/global.css' // exemplo
    ```
}
* Colocando no main ele será replicado para toda a aplicação
* Se voce colocar um arquivo por exemplo home.jsx, numa pasta chamada home e renomealo para index.jsx, automaticamente voce estará chamando ele, pq quando vc não identifica no import o arquivo, ele chama o index.jsx por padrão

## Componentes

* Crie uma pasta componentes para ajudar na organização
* Dentro da mesma crie outra pasta para cada componente que irá conter um index.jsx e um styles.css para o msm
* importe para o index.jsx o styles css 
``` jsx
import './styles.css';
```
* Após isso crie seu componente e seu retorno e use export para envia-lo para o arquivo principal
``` jsx
export function Card() {
    return (
        <div>
            <strong>João Marangoni</strong>
            <small>08:48:10</small>
        </div>
    )
};

export default Card;
```
* Já no arquivo principal voce irá importar esse arquivo que foi exportado
``` jsx
import {Card} from '../../componentes/card/index'
```
* E para utiliza-lo dentro do seu conteudo da pagina princpal consiste apenas em chama-lo dentro do retorno html da função
``` jsx
<Card />
```
* A facilidade dos componentes é que eles podem ser utilizado quantas vezes voce quiser

## Propriedades

* Sempre que utilizamos chaves dentro de uma função jsx é porque vamos utilizar alguma variavel
* Voce passa a propriedade para uma função atravez da chamada da função
``` jsx
<Card name="João" time="08:48:10"/>
<Card name="Rodrigo" time="09:06:05"/>
```
* Para voce utilizar dentro da sua função essas propriedades, basta passar como parametro para a função o "props"
* props significa propriedades, e ja é pré criado para isso, tudo que voce passar como propriedade será armazenado no props
``` jsx
export function Card(props) {
    return (
        <div className='card'>
            <strong>{props.name}</strong>
            <small>{props.time}</small>
        </div>
    )
};
```
* Após passar props como parametro, É desse modo voce acessará as propriedades do props
``` jsx
{props.name}
{props.time}
{props.nomedoatributo}
```
* Também podemos desestruturar o props, fazendo com que voce acesse propriedades especificaas sem muita dificuldade
``` jsx
export function Card({name, time}) {
    return (
        <strong>{name}<strong/>
        <small>{time}<small/>
    )
}
```

## Armazenar e recuperar valores do "ESTADO"

* Enviando para a função um argumento do html
``` jsx
<input type="text" placeholder="digite seu nome..."onChange={e => handleNameChange(e.target.value)}/>
```
* Toda vez que o conteudo mudar (onChange), vou passar uma arrow function, recebendo um evento, e chamando uma função passando o valor do input como argumento pra função
* Voce precisa utilizar estado, para que uma varavel comum consiga refletir na sua renderização/conteudo
* Para utilizar o estado fazemos os seguintes passos
* passo 1: importando
``` jsx
import React, {useState} from 'react';
```
* passo 2: utilizando
* Na utilização sempre passamos duas coisas no vetor, primeiro passamos a variavel e segundo passamos a função que atualiza esse estado, normalmente como nome da função, chamamos "set"+"nomevariavel" exemplo abaixo:
``` jsx
const [studentName, setStudentName] = useState();
const [clientName, setClientName] = useState();
```

* Utilização completa do uso estado
``` jsx
export function Home() {
  
  const [studentName, setStudentName] = useState();

  return (
    <div className='container'>
      <h1>Nome: {studentName}</h1>

      <input type="text" 
      placeholder="digite seu nome..."
      onChange={e => setStudentName(e.target.value)}
      />

      <button type="button">Adicionar</button>
      <Card name="João Marangoni" time="08:48:10" />
      <Card name="Rodrigo Pessego" time="09:06:50" />
      <Card name="Mayra Barbosa" time="09:13:25" />
    </div>
  );
}
```
* Estamos passando para o input que toda vez que ele mudar [onChange] ele irá passar para função setStudentName, que é a função que criamos para o useState, atualizar a variavel studentName para o novo valor, que é passado no [e.target.value]
* Estado é importante quando voce for utilizar valores, e o conteudo do valor for atualizar em tempo real o seu conteudo
* Inclusive podemos já passar para o estado, um valor inicial padrão que ele irá começar utilizando até que passe outro para atualizar, para fazer isso siga o exemplo:
``` jsx
const [studentName, setStudentName] = useState('Amanda Rodrigues');
```
* Estou dizendo para o useState, que seu valor inicial será ['Amanda Rodrigues']

## Imutabilidade

* Príncipio que os estados do react respeitam
* O conteudo ele não deve ser alterado mas sim substituido, pois é muito mais performatico
* Recuperar o estado antigo e adicionar junto com o novo estado que acabou de chegar
* Fazemos isso atraves do prevState => estado anterior
``` jsx 
setStudents(prevState => [...prevState, newStudent]);
```
* Tenho todo conteudo do estado anterior e concatenando com o novo estado que chegou
* Utilizamos os tres pontos para que ele pegue todo o conteudo no vetor prevState, e coloque no novo vetor
impedindo que aconteça coisas como:
``` jsx
setStudents(prevState => [prevState, newStudent]);
const students = [['prevState'], "newStudent"];
// Com a utilização dos tres pontos fazemos com que ele fique assim:
const students = ['prevState', 'newStudent'];
``` 

## Key Prop

* Quando geramos varios componentes de forma dinâmica baseado numa estrutura de repetição 
* Se tentarmos gerar o card com a mesma propriedade de um card já existente anterior     
* Irá dar erro, pois ele diz que para cada propriedade, nós devemos dar uma unica "key" prop
* Por isso devemos cuidar e acrescentar uma propriedade especial
* Essa propriedade é a "Key" e ela é como um ID, fazendo com que cada um tenha seu único e isso diferencie um do outro apesar de outras propriedades serem iguais
``` jsx
students.map(student => <Card key={student.time} name={student.name} time={student.time}/>)
```
* Estamos utilizando time, pq ele é bem especifico, fazendo com que sirva para Key, pois o tempo nunca será igual ja que estamos considerando segundos
* Exemplo de uma implementação que eu fiz, criando um ID para cada um
``` jsx
// Criei uma função que gera um numero aleatorio
  function createId() {
    const newId =  Math.floor((Math.random() * 1000) - (Math.random() * 100));
    return newId;
  }
// Passei essa função como valor para a propriedade "key" do objeto newStudent
const newStudent = {
        key: createId(),
        name: studentName,
        time: new Date().toLocaleTimeString("pt-br", {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }
// E passei ela pro map que renderiza os Cards de students
{students.map(student => <Card key={student.key} name={student.name} time={student.time}/>)}
```
* Com isso podemos tranquilamente adicionar quantos estudantes quisermos, independente de nomes repetidos e etc
* Pois para cada student, estamos gerando um ID unico

## Hooks

* Um hook geralmente tem um padrão para utilização, normalmente é assim:
``` jsx
import React, { useState, useEffect } from 'react';
// Nesse exemplo estou importando dois tipos de Hooks do react ao msm tempo
```
* Hooks são funções que permitem voce ligar e conectar os recursos de estado e ciclo de vida do react apartir de componentes totalmente funcionais
* Foram criados para podermos utilizar funções de formas mais simples, independentes e flexivieis
* Sempre favorecendo o paradgma funcional, aonde diz que tudo é FUNÇÃO!

#### Hook useEffect

* Importando
``` jsx
import React, {useEffect} from 'react';
```

* Forma de utilização
``` jsx
useEffect(() => {
    // Corpo do useEffect
    // Ações que eu quero que ele execute
  }, []); // Esse Array serve para colocar quais são os estados que o nosso useEffect depende
  // Quando nós criamos e deixamos o array vazio, isso significa que o useEffect irá ser executado apenas uma vez, agora se colocarmos um estado no array de dependencias, toda vez que esse estado acontecer o useEffect irá ser executado também
```
* O useEffect ele é executado automaticamente assim que a interface é renderizado, não precisando

#### Consumindo API com useEffect

* Primeiro dentro do useEffect consuma a API
* Segundo crie um userState que irá armazenar o userEffect
* Terceiro use o setUser, para alterar o estado sempre que a app for renderizada
``` jsx
const [user, setUser] = useState({name: "", avatar: ""});

useEffect(() => {
    fetch("https://api.github.com/users/devMRNGN")
    .then(response => response.json())
    .then(data => {
        setUser({
            name: data.name,
            avatar: data.avatar_url
        });
    })
    .catch(error => console.error(error));
},[])

    <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto de Perfil"/>
    </div>
```

#### Consumindo seEffect em API com assync

* Voce precisa criar uma função, ai dentro da função voce cria a async function faz o fetch e dps chama a função dentro do useEffect
* Pq somente o useEffect não consegue utilizar async function direta
``` jsx
useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/devMRNGN");
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      }) 
    }
    fetchData();
  },[])
```