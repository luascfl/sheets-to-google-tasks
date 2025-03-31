function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Cria um menu personalizado chamado "Tarefas"
  ui.createMenu('Tarefas')
    .addItem('Importar Tarefas', 'importarTarefas')
    .addToUi();
}

function importarTarefas() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();  // Pega os dados da planilha
  
  var taskListId = 'MDJGUlJoQ1h4OTNocWVpYw';  // ID da lista de tarefas no Google Tasks
  
  for (var i = 1; i < data.length; i++) {  // Começa da linha 2, ignorando o cabeçalho
    var titulo = data[i][0];  // Coluna 1: Título da tarefa
    var descricao = data[i][1];  // Coluna 2: Descrição da tarefa

    if (titulo && descricao) {  // Verifica se ambos os campos não estão vazios
      criarTarefa(titulo, descricao, taskListId);
    }
  }
}

function criarTarefa(titulo, descricao, taskListId) {
  var task = {
    title: titulo,
    notes: descricao
  };

  // Usa a API do Google Tasks para criar a tarefa
  Tasks.Tasks.insert(task, taskListId);
}
