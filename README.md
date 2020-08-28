# Horarios UFCG API

Essa API provê dados sobre os horários do curso de Computação@UFCG. Os dados são baseados na planilha de pré-matrícula do período atual.

## Formato do dado

```json
{
  "nome": "SOCIOLOGIA",
  "sala": "pre",
  "disciplina": "sociologia",
  "turma": "t1",
  "categoria": "optativa",
  "periodo": "*",
  "horario": {
    "dia": "quinta",
    "hora": "08"
  }
}
```

## Instalando localmente

```bash
git clone https://github.com/Guardians-DSC/horarios-ufcg-api && cd horarios-ufcg-api
npm install
npm run dev
```

## Endpoints

A API estará rodando em <http://localhost:3000>.
Os dias disponíveis atualmente são: segunda, terca, quarta, quinta e sexta.

Também é possível filtrar os horários utilizando query strings. Podemos utilizar um ou mais parâmetro como filtro, exemplo:

| Método | Endpoint                       | Descrição                                         |
| ------ | ------------------------------ | ------------------------------------------------- |
| GET    | /horarios?**dia=sexta**        | Retorna os horários da sexta-feira                |
| GET    | /horarios?**dia=sexta&hora=8** | Retorna os horários da sexta-feira às 8 horas     |
| GET    | /horarios?**periodo=2**        | Retorne os horários das disciplinas do 2º periodo |
| GET    | /horarios/horas                | Retorna a lista de horas disponíveis              |

### Outros parâmetros são

- categoria (obrigatoria, optativa, complementar)
- disciplina
- turma
- sala
- sort_by
- order (ordem usada no sort_by)
