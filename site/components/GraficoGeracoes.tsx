// Evangélicos na população brasileira, Censos do IBGE (1980–2022), com as três gerações
// e uma projeção ilustrativa (não é previsão). SVG estático: renderiza no servidor.

const DADOS = [
  { ano: 1980, pct: 6.6 },
  { ano: 1991, pct: 9.0 },
  { ano: 2000, pct: 15.4 },
  { ano: 2010, pct: 21.6 },
  { ano: 2022, pct: 26.9 },
];

const W = 720, H = 400;
const X0 = 64, X1 = 690, Y0 = 340, Y1 = 64;
const ANO_MIN = 1980, ANO_MAX = 2040, PCT_MAX = 40;
const x = (ano: number) => X0 + ((ano - ANO_MIN) / (ANO_MAX - ANO_MIN)) * (X1 - X0);
const y = (pct: number) => Y0 - (pct / PCT_MAX) * (Y0 - Y1);
const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 1 }) + "%";

const linha = DADOS.map((d, i) => `${i ? "L" : "M"}${x(d.ano).toFixed(1)} ${y(d.pct).toFixed(1)}`).join(" ");
const fim = DADOS[DADOS.length - 1];
// Projeções ilustrativas a partir de 2022
const lento = `M${x(2022)} ${y(26.9)} C ${x(2028)} ${y(29.2)}, ${x(2034)} ${y(30.4)}, ${x(2040)} ${y(31)}`;
const forte = `M${x(2022)} ${y(26.9)} C ${x(2028)} ${y(30)}, ${x(2034)} ${y(34)}, ${x(2040)} ${y(37.5)}`;

const FAIXAS = [
  { de: 1980, ate: 1991, titulo: "Avós", sub: "desbravaram" },
  { de: 1991, ate: 2010, titulo: "Pais", sub: "fizeram avançar" },
  { de: 2010, ate: 2040, titulo: "Nossa geração", sub: "e agora?" },
];

export default function GraficoGeracoes() {
  return (
    <figure className="grafico">
      <figcaption className="grafico-titulo">Evangélicos no Brasil, em % da população</figcaption>
      <p className="grafico-dica" aria-hidden="true">Arraste o gráfico pro lado →</p>
      <div className="grafico-scroll" tabIndex={0} role="region" aria-label="Gráfico: evangélicos no Brasil, role para o lado para ver tudo">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="graf-desc" className="grafico-svg">
          <desc id="graf-desc">
            Censos do IBGE: 6,6% em 1980, 9% em 1991, 15,4% em 2000, 21,6% em 2010 e 26,9% em 2022. O crescimento desacelerou depois de 2010. Projeção ilustrativa até 2040 com dois caminhos: o ritmo continuar caindo ou a nossa geração assumir.
          </desc>
          {/* faixas das gerações */}
          {FAIXAS.map((f, i) => (
            <g key={f.titulo}>
              <rect x={x(f.de)} y={Y1 - 40} width={x(f.ate) - x(f.de)} height={Y0 - Y1 + 40} className={i % 2 ? "g-faixa g-faixa-b" : "g-faixa"} />
              <text x={x(f.de) + 10} y={Y1 - 20} className={i === 2 ? "g-faixa-titulo g-nossa" : "g-faixa-titulo"}>{f.titulo}</text>
              <text x={x(f.de) + 10} y={Y1 - 2} className="g-faixa-sub">{f.sub}</text>
            </g>
          ))}
          {/* grade */}
          {[10, 20, 30, 40].map((v) => (
            <g key={v}>
              <line x1={X0} x2={X1} y1={y(v)} y2={y(v)} className="g-grade" />
              <text x={X0 - 10} y={y(v) + 5} textAnchor="end" className="g-eixo">{v}%</text>
            </g>
          ))}
          <line x1={X0} x2={X1} y1={Y0} y2={Y0} className="g-base" />
          {[1980, 1991, 2000, 2010, 2022, 2040].map((a) => (
            <text key={a} x={x(a)} y={Y0 + 26} textAnchor="middle" className="g-eixo">{a}</text>
          ))}
          {/* projeção ilustrativa */}
          <path d={lento} className="g-proj g-proj-lento" />
          <path d={forte} className="g-proj g-proj-forte" />
          <text x={x(2040) - 4} y={y(31) + 36} textAnchor="end" className="g-proj-rot">se o ritmo seguir caindo</text>
          <text x={x(2040) - 4} y={y(37.5) - 12} textAnchor="end" className="g-proj-rot g-proj-rot-forte">se a gente assumir</text>
          {/* série real */}
          <path d={linha} className="g-linha" />
          {DADOS.map((d) => (
            <g key={d.ano}>
              <circle cx={x(d.ano)} cy={y(d.pct)} r={7} className="g-ponto">
                <title>{`${d.ano}: ${fmt(d.pct)}`}</title>
              </circle>
              {d.ano !== fim.ano && (
                <text x={d.ano === 1980 ? x(d.ano) + 14 : x(d.ano)} y={y(d.pct) - 16} textAnchor={d.ano === 1980 ? "start" : "middle"} className="g-valor">{fmt(d.pct)}</text>
              )}
            </g>
          ))}
          <text x={x(fim.ano) - 12} y={y(fim.pct) - 20} textAnchor="end" className="g-valor g-valor-destaque">26,9% · 47 mi</text>
        </svg>
      </div>
      <p className="grafico-nota">
        Fonte: Censos do IBGE. 1980 a 2000 sobre a população total; 2010 e 2022 sobre pessoas com 10 anos ou mais. A parte tracejada é ilustrativa, não é previsão.
      </p>
      <div className="sr-only"><table>
        <caption>Evangélicos no Brasil, em % da população (Censos do IBGE)</caption>
        <thead><tr><th scope="col">Ano</th><th scope="col">Evangélicos</th></tr></thead>
        <tbody>{DADOS.map((d) => <tr key={d.ano}><td>{d.ano}</td><td>{fmt(d.pct)}</td></tr>)}</tbody>
      </table></div>
    </figure>
  );
}
