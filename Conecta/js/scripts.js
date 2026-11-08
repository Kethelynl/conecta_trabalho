
function mostrarMensagem() {
    alert("Bem-vindo ao Conecta Trabalho!");
}

function mostrarFormulario(categoria) {

    document.querySelectorAll('.formulario').forEach(form => {
        form.style.display = 'none';
    });

    const formulario = document.getElementById('formulario-' + categoria);

    if (formulario) {
        formulario.style.display = 'block';
    }
}

// Campos e seus respectivos locais na prévia do currículo

const campos = {
    nome: 'preview-nome',
    cargo: 'preview-cargo',
    email: 'preview-email',
    telefone: 'preview-telefone',
    cidade: 'preview-cidade',
    resumo: 'preview-resumo',
    

};

function usarExemploResumo(tipo) {

    const campo = document.getElementById('resumo');

    const exemplos = {
        primeiro: 'Busco minha primeira oportunidade profissional. Sou uma pessoa organizada, dedicada e com facilidade para aprender. Tenho interesse em desenvolver minhas habilidades e contribuir positivamente para a equipe.',

        experiencia: 'Profissional com experiência em atendimento ao cliente, organização de processos e suporte administrativo. Possuo facilidade de comunicação, organização e foco na resolução de problemas.'
    };

    campo.value = exemplos[tipo];

    document.getElementById('preview-resumo').textContent =
        exemplos[tipo];
}


function adicionarExperiencia() {

    const empresa = document.getElementById('empresa').value.trim();
    const cargo = document.getElementById('cargo-experiencia').value.trim();
    const periodo = document.getElementById('periodo').value.trim();
    const atividades = document.getElementById('atividades').value.trim();

    if (!empresa || !cargo || !periodo || !atividades) {
        alert('Preencha todos os campos antes de adicionar.');
        return;
    }

    const lista = document.getElementById('lista-experiencias');
    const preview = document.getElementById('preview-experiencias');

    const experiencia = document.createElement('div');
    experiencia.classList.add('experiencia-item');

    const titulo = document.createElement('strong');
    titulo.textContent = cargo + ' - ' + empresa;

    const data = document.createElement('p');
    data.textContent = periodo;

    const descricao = document.createElement('p');
    descricao.textContent = atividades;

    experiencia.append(titulo, data, descricao);
    lista.appendChild(experiencia);

    const copia = experiencia.cloneNode(true);
    preview.appendChild(copia);

    document.getElementById('empresa').value = '';
    document.getElementById('cargo-experiencia').value = '';
    document.getElementById('periodo').value = '';
    document.getElementById('atividades').value = '';

}


function adicionarFormacao() {

    const instituicao = document.getElementById('instituicao').value.trim();
    const curso = document.getElementById('curso').value.trim();
    const nivel = document.getElementById('nivel').value;
    const status = document.getElementById('status-formacao').value;
    const periodo = document.getElementById('periodo-formacao').value.trim();

    if (!instituicao || !curso || !nivel || !status || !periodo) {
        alert('Preencha todos os campos antes de adicionar.');
        return;
    }

    const lista = document.getElementById('lista-formacoes');
    const preview = document.getElementById('preview-formacoes');

    const formacao = document.createElement('div');
    formacao.classList.add('formacao-item');

    const titulo = document.createElement('strong');
    titulo.textContent = curso;

    const local = document.createElement('p');
    local.textContent = instituicao;

    const detalhes = document.createElement('p');
    detalhes.textContent = nivel + ' | ' + status + ' | ' + periodo;

    formacao.append(titulo, local, detalhes);
    lista.appendChild(formacao);

    const copia = formacao.cloneNode(true);
    preview.appendChild(copia);

    document.getElementById('instituicao').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('nivel').value = '';
    document.getElementById('status-formacao').value = '';
    document.getElementById('periodo-formacao').value = '';

}


function adicionarCurso() {

    const nome = document.getElementById('nome-curso').value.trim();
    const instituicao = document.getElementById('instituicao-curso').value.trim();
    const carga = document.getElementById('carga-horaria').value.trim();
    const ano = document.getElementById('ano-curso').value.trim();

    if (!nome || !instituicao || !carga || !ano) {
        alert('Preencha todos os campos antes de adicionar.');
        return;
    }

    const lista = document.getElementById('lista-cursos');
    const preview = document.getElementById('preview-cursos');

    const curso = document.createElement('div');
    curso.classList.add('curso-item');

    const titulo = document.createElement('strong');
    titulo.textContent = nome;

    const local = document.createElement('p');
    local.textContent = instituicao;

    const detalhes = document.createElement('p');
    detalhes.textContent = carga + ' | ' + ano;

    curso.append(titulo, local, detalhes);
    lista.appendChild(curso);

    const copia = curso.cloneNode(true);
    preview.appendChild(copia);

    document.getElementById('nome-curso').value = '';
    document.getElementById('instituicao-curso').value = '';
    document.getElementById('carga-horaria').value = '';
    document.getElementById('ano-curso').value = '';

}

function adicionarHabilidade() {

    const tipo = document.getElementById('tipo-habilidade').value;
    const nome = document.getElementById('habilidade').value.trim();
    const nivel = document.getElementById('nivel-habilidade').value;

    if (!tipo || !nome || !nivel) {
        alert('Preencha todos os campos antes de adicionar.');
        return;
    }

    const lista = document.getElementById('lista-habilidades');
    const preview = document.getElementById('preview-habilidades');

    const placeholder = document.getElementById('placeholder-habilidades');

    if (placeholder) {
        placeholder.remove();
    }

    const habilidade = document.createElement('div');
    habilidade.classList.add('habilidade-item');

    const texto = document.createElement('p');
    texto.textContent = nome + ' — ' + tipo + ' (' + nivel + ')';

    habilidade.appendChild(texto);

    lista.appendChild(habilidade);

    const copia = habilidade.cloneNode(true);
    preview.appendChild(copia);

    document.getElementById('tipo-habilidade').value = '';
    document.getElementById('habilidade').value = '';
    document.getElementById('nivel-habilidade').value = '';
}

// Atualiza a folha enquanto a pessoa digita

Object.keys(campos).forEach(campo => {

    const input = document.getElementById(campo);
    const preview = document.getElementById(campos[campo]);

    if (input && preview) {
        input.addEventListener('input', function() {
            preview.textContent = this.value || 'Não informado';
        });
    }

});

function baixarCurriculo() {

    const folha = document.getElementById('folha-curriculo');
    const nome = document.getElementById('nome').value.trim();

    if (!nome) {
        alert('Preencha seu nome antes de baixar o currículo.');
        return;
    }

    if (typeof html2pdf === 'undefined') {
        alert('A biblioteca de PDF não foi carregada.');
        return;
    }

    // Cria uma área temporária para gerar o PDF
    const area = document.createElement('div');

    area.style.position = 'absolute';
    area.style.left = '0';
    area.style.top = '0';
    area.style.width = '210mm';
    area.style.background = '#ffffff';
    area.style.zIndex = '-1';

    // Copia somente a folha do currículo
    const copia = folha.cloneNode(true);

    copia.style.width = '210mm';
    copia.style.maxWidth = 'none';
    copia.style.minHeight = '297mm';
    copia.style.height = 'auto';
    copia.style.margin = '0';
    copia.style.padding = '15mm';
    copia.style.boxSizing = 'border-box';
    copia.style.background = '#ffffff';
    copia.style.border = 'none';
    copia.style.boxShadow = 'none';

    area.appendChild(copia);
    document.body.appendChild(area);

    const opcoes = {
        margin: 0,

        filename: 'Curriculo_' + nome.replace(/\s+/g, '_') + '.pdf',

        image: {
            type: 'jpeg',
            quality: 0.98
        },

        html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            windowWidth: 794,
            scrollX: 0,
            scrollY: 0
        },

        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },

        pagebreak: {
            mode: ['css', 'legacy']
        }
    };

    html2pdf()
        .set(opcoes)
        .from(copia)
        .save()
        .then(() => {
            area.remove();
        })
        .catch((erro) => {
            console.error(erro);
            area.remove();
            alert('Não foi possível gerar o PDF.');
        });
}