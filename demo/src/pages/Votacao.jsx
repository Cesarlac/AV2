import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/JogadorCard';
import {
  listarPorSituacao,
  obterSuspenso,
  registrarVoto,
} from '../services/votacaoService';

function Votacao() {
  const [selecionado, setSelecionado] = useState(null);
  const [histórico, setHistorico] = useState([]);

  // Último participante que recebeu voto (para a mensagem de confirmação)
  const [ultimoVoto, setUltimoVoto] = useState(null);
  // Quantos votos este usuário deu desde que abriu a página
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  function handleConfirmar() {
    registrarVoto(selecionado.id);
    setUltimoVoto(participante);
    setVotosNaSessao((qtd) => qtd + 1);
  }

  return (
    <main className="pagina">
      <header className="pagina-cabecalho">
        <h1>Quem foi o craque do jogo?</h1>
        <p>Selecione um dos indicados e confirme seu voto.</p>
      </header>

      {ultimoVoto && (
        <div className="aviso" role="status">
          <p>
            Voto registrado para craque <strong>{ultimoVoto.nome}</strong>.
            Você já votou {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'}.
          </p>
          <Link to="/resultado">Ver resultado</Link>
        </div>
      )}

      <section className="grade-roca">
        {naRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
        ))}
      </section>

      <section className="demais">
        <h2>Suspenso</h2>
        <p className="demais-legenda">Não entrou em campo e não pode receber votos</p>
        <div className="grade-participantes">
          {foraDaRoca.map((p) => (
            <ParticipanteCard key={p.id} participante={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;