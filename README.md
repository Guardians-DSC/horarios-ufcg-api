# Horarios UFCG API
Essa API provê dados sobre os horários do curso de Computação@UFCG. Os dados são baseados na planilha de pré-matrícula do período atual.

## Formato do dado
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
      "hora": "08"
   }
}
```

## Instalando localmente
```
git clone https://github.com/Guardians-DSC/horarios-ufcg-api && cd horarios-ufcg-api
npm install
npm run dev
```  

## Endpoints
A API estará rodando em http://localhost:3000  

Método | Endpoint           | Descrição
-------|--------------------|-------------
GET    | /horarios         | Retorna todos os horários
GET    | /horarios?**:dia** | Retorna todos os horários do dia especificado
GET    | /horarios?**:dia=Valor**&**:hora=Valor** | Retorna todos os horários filtrados pelo dia e hora especificados

Os dias, disponíveis atualmente, são: segunda, terca, quarta, quinta e sexta. E as horas são: 08, 10, 14 e 16.

### Parâmetros do endpoint /horarios
Também é possível filtrar os horários utilizando query strings. Podemos utilizar um ou mais parâmetro como filtro, exemplo:

Método | Endpoint           | Descrição
-------|--------------------|-------------
GET    | /horarios?**dia=sexta**           | Retorna os horários da sexta-feira
GET    | /horarios?**dia=sexta&hora=8**    | Retorna os horários da sexta-feira às 8 horas
GET    | /horarios?**periodo_ppc_antigo=2**| Retorne os horários das disciplinas do 2º periodo do PPC antigo  

### Outros parâmetros são
- periodo_ppc_novo
- professor
- categoria (obrigatoria, optativa)
- disciplina
- turma
- sala
- sort_by
- order (ordem usada no sort_by)