export interface NotificationMessage {
  title: string;
  body: string;
}

const MORNING: NotificationMessage[] = [
  { title: "Bom dia, estudante!", body: "Que tal começar o dia com uma sessão de estudos?" },
  { title: "Seu futuro agradece", body: "30 minutos hoje podem mudar sua semana. Vamos nessa?" },
  { title: "Não deixe pra depois", body: "O melhor momento para começar é agora. Sua cadeira te espera!" },
  { title: "Stux te espera!", body: "Sua chama está esfriando. Acenda ela com uma sessão hoje!" },
  { title: "Cada manhã você renasceu", body: "O que você faz com esse dia é o que importa. — Buda" },
  { title: "A disciplina é a ponte", body: "Entre quem você é e quem você quer ser. Dê um passo hoje." },
  { title: "Não espere a vontade chegar", body: "A neurociência é clara: a motivação vem depois de começar, não antes. Comece. A vontade aparece." },
  { title: "Amadores esperam inspiração", body: "Profissionais aparecem de qualquer jeito." },
  { title: "O escultor", body: "Michelangelo disse: \"Retiro tudo que não é o anjo.\" Seu potencial já está dentro de você. Cada sessão de estudo retira um pedaço do que ainda te esconde." },
  { title: "Chekhov e os 10 minutos", body: "Anton Chekhov era médico, atendia pacientes, lidava com tuberculose. Escrevia nos intervalos — entre consultas, em viagens de trem. Não esperava condições perfeitas. Deixou mais de 200 contos. Tudo feito nos minutos que sobravam." },
  { title: "Quer fazer agora ou pagar o preço da consequência?", body: "Um vai doer um pouco. O outro vai doer muito mais. Escolha sua dor." },
  { title: "NÃO SEJA FROUXO", body: "SÓ VOCÊ pode alcançar seu SUCESSO. Ninguém vai fazer por você." },
  { title: "Tente ser o mais perfeito possível", body: "Não amanhã. Não na próxima sessão. Agora. Perfeição não é destino, é direção." },
  { title: "Já que tem que ser assim", body: "Assim que seja. A preguiça não vai vencer hoje. Sentou. Estudou. Ponto final." },
  { title: "Você vai ter que se aguentar até o fim", body: "Não tem atalho. Não tem volta. A única saída é através. Então aguenta e faz." },
];

const AFTERNOON: NotificationMessage[] = [
  { title: "E aí, já estudou hoje?", body: "A tarde ainda é jovem. Bora recuperar o tempo perdido?" },
  { title: "Você se esqueceu de mim?", body: "Passei o dia todo te esperando. Vamos estudar um pouco?" },
  { title: "Não precisa ser perfeito", body: "Só 5 minutos já contam como vitória. O importante é começar!" },
  { title: "E o seu futuro?", body: "Ele não pode esperar. Cada sessão te aproxima dos seus objetivos." },
  { title: "Seu eu do futuro", body: "Vai agradecer por ter estudado hoje. Não quebre a corrente!" },
  { title: "Procrastinação não vence", body: "Você é mais forte que a preguiça. Mostre pra ela quem manda!" },
  { title: "Você não precisa de motivação", body: "Você precisa de hábito. E hábitos começam agora, sem glamour nenhum." },
  { title: "Marcus Aurelius escreveu há 2000 anos:", body: "\"Você tem poder sobre sua mente, não sobre eventos externos.\" Sua sessão de hoje é esse poder em ação." },
  { title: "Sabe o que separa quem chega lá de quem não chega?", body: "Não é talento. Não é sorte. É quem abriu o material num dia de preguiça." },
  { title: "A preguiça faz tudo parecer difícil", body: "O trabalho faz tudo parecer possível. Teste isso: abra por 5 minutos." },
  { title: "Não é sobre hoje", body: "É sobre a pessoa em que você está se tornando, uma sessão de cada vez." },
  { title: "A diferença entre quem você é e quem você quer ser", body: "Chama-se ação. E ela ainda cabe nesse dia." },
  { title: "Todo grande resultado tem uma origem humilde:", body: "Alguém, num dia comum, cansado, escolheu fazer mesmo assim." },
  { title: "O desconforto de estudar dura horas", body: "O arrependimento de não estudar dura anos." },
  { title: "Você não está atrasado", body: "Está exatamente onde sua consistência te colocou. Mude isso agora." },
  { title: "Difícil e impossível são coisas muito diferentes.", body: "Uma requer esforço. A outra é só desculpa. Descubra qual é qual." },
  { title: "Demóstenes", body: "O maior orador grego gaguejava. Foi motivo de chacota. Então foi para a praia, encheu a boca de pedrinhas, e praticou discursos contra as ondas — todos os dias, por anos. Ninguém se lembra da gagueira. Todo mundo conhece Demóstenes." },
  { title: "A tapeçaria", body: "Tecelões medievais passavam anos num tapete. Trabalhavam pelo avesso — viam apenas nós, fios soltos, caos. Só quando viravam a peça a imagem aparecia inteira. Você está no avesso agora. Continue tecendo." },
  { title: "O rio e a pedra", body: "A água não é mais dura que a pedra. Não é mais forte. Mas aparece todo dia. E a pedra cede. Não porque a água foi heroica. Porque foi constante." },
  { title: "A última peça", body: "Um montanhista dizia que o mais difícil de toda escalada é levantar da barraca de manhã e dar o primeiro passo. Depois disso, os pés sabem o que fazer. Seu primeiro passo hoje é abrir o material. O resto vem sozinho." },
  { title: "Kafka e a hora", body: "Kafka trabalhava numa seguradora das 8h às 18h. Voltava, jantava, dormia um pouco — e escrevia das 23h até onde aguentasse. Reclamava do cansaço, duvidava do talento. Mesmo assim, aparecia toda noite. A literatura mundial agradece por ele não ter desistido." },
  { title: "Quer fazer agora ou pagar o preço da consequência?", body: "Um vai doer um pouco. O outro vai doer muito mais. Escolha sua dor." },
  { title: "NÃO SEJA FROUXO", body: "SÓ VOCÊ pode alcançar seu SUCESSO. Ninguém vai fazer por você." },
  { title: "Tente ser o mais perfeito possível", body: "Não amanhã. Não na próxima sessão. Agora. Perfeição não é destino, é direção." },
  { title: "Já que tem que ser assim", body: "Assim que seja. A preguiça não vai vencer hoje. Sentou. Estudou. Ponto final." },
  { title: "Você vai ter que se aguentar até o fim", body: "Não tem atalho. Não tem volta. A única saída é através. Então aguenta e faz." },
];

const EVENING: NotificationMessage[] = [
  { title: "Última chamada!", body: "O dia está acabando. Ainda dá tempo de fazer sua sessão de hoje!" },
  { title: "Você se esqueceu de mim?", body: "Mais um dia passou e ainda não estudamos juntos. Que tal agora?" },
  { title: "Nunca é tarde", body: "Nem que sejam 10 minutos, seu cérebro vai agradecer. Vamos?" },
  { title: "Calor da Chama", body: "Seu calor está diminuindo! Uma sessão hoje evita a perda." },
  { title: "Não vá dormir sem estudar", body: "A sensação de dever cumprido é melhor que qualquer desculpa." },
  { title: "Amanhã você se arrepende", body: "Sabe aquela sensação de não ter feito nada? Evite ela hoje." },
  { title: "O segredo é a consistência", body: "Grandes resultados vêm de pequenas ações diárias. Comece agora!" },
  { title: "O tempo é o único recurso que não se recupera", body: "Você já usou algumas horas. Como vai usar as próximas?" },
  { title: "Como você vai dormir hoje?", body: "Com aquela sensação vazia de mais um dia desperdiçado, ou com a leveza de quem honrou seus objetivos?" },
  { title: "Sêneca escreveu:", body: "\"Enquanto adiamos, a vida passa.\" Quantas vezes você já adiou? Essa não precisa ser mais uma." },
  { title: "Epicteto dizia:", body: "\"Não busque que os eventos aconteçam como você quer. Queira que aconteçam como são.\" O que você controla é seu esforço de hoje." },
  { title: "Seu cérebro consolida memória enquanto você dorme", body: "Mas só o que você estudou. Dê a ele algo para trabalhar." },
  { title: "O estudante e o mestre", body: "O aluno disse: \"Quero aprender, mas não sei por onde começar.\" O mestre apontou para uma vela apagada: \"Acenda.\" O aluno acendeu. \"Agora você já começou. O começo nunca foi o problema. Era o acender.\"" },
  { title: "O jardineiro", body: "Plantou uma árvore. O vizinho riu: \"Não vai viver para ver os frutos.\" Ele respondeu: \"Não planto para mim. Planto porque alguém plantou antes.\" Você estuda para a versão de você que ainda não existe. Ela vai agradecer." },
  { title: "A tarefa que você evita", body: "Diz mais sobre você do que gostaria de admitir." },
  { title: "Quer fazer agora ou pagar o preço da consequência?", body: "Um vai doer um pouco. O outro vai doer muito mais. Escolha sua dor." },
  { title: "NÃO SEJA FROUXO", body: "SÓ VOCÊ pode alcançar seu SUCESSO. Ninguém vai fazer por você." },
  { title: "Tente ser o mais perfeito possível", body: "Não amanhã. Não na próxima sessão. Agora. Perfeição não é destino, é direção." },
  { title: "Já que tem que ser assim", body: "Assim que seja. A preguiça não vai vencer hoje. Sentou. Estudou. Ponto final." },
  { title: "Você vai ter que se aguentar até o fim", body: "Não tem atalho. Não tem volta. A única saída é através. Então aguenta e faz." },
];

export function getRandomMessage(): NotificationMessage {
  const hour = new Date().getHours();
  let pool: NotificationMessage[];

  if (hour < 12) {
    pool = MORNING;
  } else if (hour < 18) {
    pool = AFTERNOON;
  } else {
    pool = EVENING;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}
