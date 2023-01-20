import util from "util";
import { normalize, schema } from "normalizr";

const mensajes = {
    id: 'Desafio-9-Incutto',
    messages: [
      {
        author: {
          email: 'incuttoezequiel@gmail.com',
          nombre: 'Ezequiel',
          apellido: 'Incutto',
          edad: '21',
          alias: 'Eze',
          avatar: 'http://ezequiel.jpg'
        },
        dateAndTime: '19/1/2023, 19:44:03',
        text: 'sas',
        id: 0
      },
      {
        author: {
            email: 'incuttoezequiel@gmail.com',
            nombre: 'Ezequiel',
            apellido: 'Incutto',
            edad: '21',
            alias: 'Eze',
            avatar: 'http://ezequiel.jpg'
        },
        dateAndTime: '19/1/2023, 19:44:13',
        text: 'dsaas',
        id: 1
      },
      {
        author: {
            email: 'incuttoezequiel@gmail.com',
            nombre: 'Ezequiel',
            apellido: 'Incutto',
            edad: '21',
            alias: 'Eze',
            avatar: 'http://ezequiel.jpg'
        },
        dateAndTime: '8/1/2023, 19:45:27',
        text: 'ffaadds',
        id: 5
      }
    ]
  }
  
  console.log(JSON.stringify(mensajes));
  
  function print(obj) {
    console.log(util.inspect(obj, false, 12, true));
  }
  
  // SCHEMAS
  
  const authorSchema = new schema.Entity("author",{},{idAttribute: 'email'});
  
  const messageSchema = new schema.Entity("message", {
    author: authorSchema,
  });
  
  const messagesSchema = new schema.Entity("messages", {
    messages: [messageSchema],
  });
  
  const messagesNorm = normalize(mensajes, messagesSchema);
  print(messagesNorm);