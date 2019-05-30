# API de horarios-cc-api

## Instalando localmente
```
git clone https://github.com/Guardians-DSC/horarios-cc-api && cd horarios-cc-api
npm install
npm run dev
```  

## Endpoints
A API estará rodando em http://localhost:3000  


Método | Endpoint           | Descrição
-------|--------------------|-------------
GET    | /horarios/         | Retorna todos os horários
GET    | /horarios/**:dia** | Retorna todos os horários do dia especificado (segunda, terca, quarta, quinta ou sexta)

## Formato dos dados
```json
{
   "sala": "pre",
   "disciplina": "sociologia",
   "turma": "t1",
   "professor": "?",
   "categoria": "opt-geral",
   "periodo_ppc_antigo": "*",
   "periodo_ppc_novo": "*",
   "horario": {
      "dia": "quinta",
      "hora": "07"
   }
}
```
