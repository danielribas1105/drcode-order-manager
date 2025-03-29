import { v4 as uuid } from "uuid"
import { bigint } from "zod";

export default class GerarIds {

   static generateUniqueId(): bigint {
      const now = new Date();
      const year = now.getFullYear() % 100; // Pega os últimos dois dígitos do ano
      const month = now.getMonth() + 1; // Mês começa do zero, então adicionamos 1
      const day = now.getDate();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      const millisecond = now.getMilliseconds();

      // Concatena os valores para formar um número único
      const uniqueId = BigInt(
         `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}` +
         `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}` +
         `${second.toString().padStart(2, '0')}${millisecond.toString().padStart(3, '0')}`
      );
      
      return uniqueId;
   }

   static gerarIdUnico(): string {
      const agora = new Date();

      // Obter partes da data e hora
      const ano = agora.getFullYear();
      const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Janeiro e 0
      const dia = String(agora.getDate()).padStart(2, '0');
      const hora = String(agora.getHours()).padStart(2, '0');
      const minuto = String(agora.getMinutes()).padStart(2, '0');
      const segundo = String(agora.getSeconds()).padStart(2, '0');
      const milissegundos = String(agora.getMilliseconds()).padStart(3, '0');

      // Concatenar as partes em uma string unica
      return `${ano}${mes}${dia}${hora}${minuto}${segundo}${milissegundos}`;
   }

   static newId(): string {
      return uuid();
   }

}