- TODO 

- [x] Deve ser possível criar um usuário -

      - ID: UUID(), único, primary key;
      - Nome: string;
      - Data de nascimento: date;
          - Deve fazer o cálculo da idade automaticamente.
      - Gẽnero: Enum[Homem, Mulher]

      ! Extra:
        - Peso: string;
        - Altura: string;
          - Fazer o cálculo de IMC utilizando o peso e altura.

- [ ] Identificar o usuário entre as requisições - 
      - Pesquiser sobre JWT depois e aperfeiçoar!

- [ ] Deve ser possível registrar uma refeição feita, com as seguintes informações;
      - ID: UUID(), gerado automaticamente, único, pk;
      - Nome: string;
      - Descrição: string
      - Data e Hora: DateTime();
      - Está na refeição: Boolean
        - Está: true;
        - Não está: false;

- [ ] Editar a refeição, podendo alterar todos os dados acima;
- [ ] Deve ser possível apagar uma refeição;
- [ ] Listar todas as refeições de um usuário;
- [ ] Deve ser possível visualizar uma única refeição;
- [ ] Deve ser possível recuperar as métricas de um usuário:
      - Quantidade total de refeições registradas;
      - Quantidade total de refeições dentro da dieta;
      - Quantidade total de refeições fora da dieta;
      - Melhor sequeência de refeições dentro da dieta;
- [ ] O usuário só pode visualizar, editar e apagar refeições o qual ele criou.