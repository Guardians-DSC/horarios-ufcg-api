
# Contribuindo para nossa API

:+1::tada: Primeiramente, obrigado pelo tempo investido para contribuir! :tada::+1:

Aqui está reunido um conjunto de diretrizes a serem seguidas ao contribuir para esse repositório. São recomendações para facilitar  o trabalho de avaliar e organizar as contribuições.

## Tabela de conteúdos
- [Commits](#guidelines-para-commits)
- [Pull requests](#guidelines-para-pull-requests)
- [Branchs](#guidelines-para-criação-e-uso-das-branchs)
- [Issues](#guidelines-para-issues)

##  Guidelines para commits
![](https://img.icons8.com/dusk/100/000000/commit-git.png)

Um bom commit, geralmente, é composto por 3 coisas: 

###   1. Shotlog ou assunto:

- Máximo de 50 caracteres.
- Manter a linha desse tamanho garante que o shortlog explica a mudança de forma concisa, se houver mais de 50 caracteres, o github vai truncar, porque ele não vai conseguir mostrar tudo, o que vai prejudicar a legibilidade.
-  Deve iniciar com letra maiúscula.
- Não deve terminar com um ponto final.
- Deve descrever a mudança/ação feita no modo imperativo, o motivo pra isso é que o Github sempre usa o modo imperativo quando cria um commit nosso por default, além disso você deve responder a seguinte pergunta quando faz um commit,  
> "Se for aplicado, este commit irá (?) *assunto do commit*."

Alguns exemplos: 
  > Se aplicado, esse commit irá **refactor subsystem X for readability**.
  
  > Se aplicado, esse commit irá **update getting started documentation**.
  
  > Se aplicado, esse commit irá **remove deprecated methods**.
  
  > Se aplicado, esse commit irá **release version 1.0.0**.
  
  > Se aplicado, esse commit irá **merge pull request #123 from user/branch**.

No commit, colocamos o que está em negrito.

###   2. Body ou corpo:
- Maximo de 72 caracteres.
- Não é obrigatório, mas ajuda a explicar suas alterações.
- Deve descrever seu raciocínio. Isso é especialmente importante em casos em que mudanças complexas são feitas. Também é o local correto para escrever sobre bugs relacionados.
- Não deve ser escrito em primeira pessoa.

### 3. Referência a uma issue ou pull request:
- Deve usar algumas das keys definidas na tabela abaixo.
- Deve usar a a numeração da issue ou task.
- Deve haver um único espaço entre a key e a numeração.

##### Categorias dos issues
| keys         | Descrição                                                                                               |
| -------------|---------------------------------------------------------------------------------------------------------|
| **feat**     | Uma nova feature.                                                                                       |
| **fix**      | Uma correção de um bug.                                                                                 |
| **style**    | Mudanças que não afetam o significado do código (espaços em branco, formatação, pontos-e-virgulas, etc).|
| **refactor** | Uma mudança no código que corrige um bug ou adiciona um novo recurso.                                   |
| **test**     | Adição de testes                                                                                        |

Para separar cada parte dessa, deixe uma linha em branco. Vale ressaltar que não necessariamente todas, estarão em um commit, muitas vezes, é necessário apenas o assunto, porque não precisamos dar muitas informações sobre como foi feito, e não temos uma issue ou pull request para referênciar sobre isso.

O comando `git commit -m` não vai deixar você fazer isso, o `git commit` vai abrir um editor no terminal e você estará habilitado a editar do modo que quiser.

#### Exemplo de um commit nesse formato:

```
Migrate CI images to tagged Ubuntu release

Update the CI image process to build from a tagged ubuntu release. All
images now make use of a shared setup script to install the appropriate
binaries.

Closes gh-15158
```

## Guidelines para pull requests
![](https://img.icons8.com/dusk/100/000000/compare-git.png)

Todo código desenvolvido é revisado por uma pessoa e não é aceito sem antes ser avaliado por algum colaborador dessa organização. Cada revisador irá verificar se não há bugs ou warnings inseridos no código e também se esse segue os guidelines estabelecidos nesse documento.

Se existir algo que você ache necessário explicar porque acredita que os revisadores não entenderão por conta própria, sinta-se livre para adicionar na descrição do pull request.

<span style="color:red">ATENÇÃO: Depois que seu pull request for merjado, apague a branch, pra não ficar poluindo as que existem e confundindo as pessoas.</span>

## Guidelines para criação e uso das branchs
![](https://img.icons8.com/dusk/100/000000/code-fork.png)

1. Padronização nos nomes das branchs: `key/num_issue-descricao-da-issue`. Onde *key* é uma das *keys* descritas [aqui](#categorias-dos-issues)
2. **Branchs seguras**: Possuimos duas branches principais, a `master` onde todo o código estável reside, ela geralmente é utilizada para realizar o *deploy* pois é a versão mais confiável do código. E também temos a `developing` que a partir dela criamos outras branches para desenvolvimento de *features*, resolução de *bugs* e outras alterações. Por fim, todo código desenvolvido deverá ser mandado para a branch `developing` por meio de uma pull request, avaliado e aprovado (ou não) e só no fim, quando um release for liberada que esse código passará para a branch `master`.

#### Exemplo de criação e uso de branch
Digamos que iremos fazer uma contribuição para resolver a issue "Refatorar README" que tem o número 13.

```git
git checkout developing
git pull origin developing
git checkout -b refactor/13-update-readme
... realizando alterações e commita
git push origin refactor/13-update-readme
```

Após isso, é só criar a pull request selecionando a branch base `developing`.  

![](https://i.imgur.com/Zp6WE6p.png)

## Guidelines para issues
![](https://img.icons8.com/dusk/100/000000/answers.png)

Quando você criar uma issue, use tags para categorizar e nos ajudar a filtrar as issues, tente não deixar a descrição da issue muito grande, pode ser dificil de acompanhar, como nossas issues vão estar relacionadas as tasks, se ficar muito grande, quebre em várias, lembre-se é sempre melhor resolver um problema complexo, em pequenos passos.

## Agradecimentos :clap:
Muito obrigado por ler até aqui. O grupo **Guardians@Computação** agradece o tempo investido em nós!