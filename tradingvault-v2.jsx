import { useState, useEffect } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
   Dark terminal aesthetic — Bloomberg/trading terminal style.
   ─────────────────────────────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060809;
  --s1:#0D1117;
  --s2:#141B24;
  --s3:#1C2635;
  --border:#1F2D3D;
  --border2:#2A3D52;
  --text:#D4E1F0;
  --muted:#4A6278;
  --muted2:#637B92;
  --gold:#C9A84C;
  --gold2:#E8C76A;
  --green:#00C896;
  --red:#E8455A;
  --blue:#2D9CDB;
  --purple:#9B7FE8;
  --orange:#E8923A;
  --yellow:#D4B84A;
  --r:8px;
  --mono:'IBM Plex Mono',monospace;
  --sans:'Inter',sans-serif;
  --shadow:0 8px 32px rgba(0,0,0,.6);
}
body{background:var(--bg);color:var(--text);font-family:var(--sans);min-height:100vh;font-size:14px}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:var(--s1)}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
input,select,textarea{
  background:var(--s2);border:1px solid var(--border);color:var(--text);
  border-radius:var(--r);padding:9px 12px;font-family:var(--sans);font-size:13px;
  outline:none;transition:border-color .15s;width:100%
}
input:focus,select:focus,textarea:focus{border-color:var(--gold)}
input::placeholder{color:var(--muted)}
select option{background:var(--s2)}
button{cursor:pointer;border:none;font-family:var(--sans);font-weight:600;border-radius:var(--r);transition:all .15s;font-size:13px}
.btn-gold{background:var(--gold);color:#000;padding:9px 18px;letter-spacing:.3px}
.btn-gold:hover{background:var(--gold2);transform:translateY(-1px)}
.btn-ghost{background:transparent;color:var(--muted2);border:1px solid var(--border);padding:9px 16px}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold)}
.btn-sm{padding:5px 11px;font-size:12px}
.btn-red{background:#E8455A18;color:var(--red);border:1px solid #E8455A25;padding:5px 10px;font-size:12px}
.btn-red:hover{background:#E8455A30}
.card{background:var(--s1);border:1px solid var(--border);border-radius:var(--r);padding:20px}
.mono{font-family:var(--mono)}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.fade{animation:fadeUp .25s ease forwards}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
@media(max-width:900px){.g4{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.g2,.g3,.g4{grid-template-columns:1fr}}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:var(--s2);color:var(--muted2);font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;padding:10px 12px;text-align:left;border-bottom:1px solid var(--border)}
td{padding:10px 12px;border-bottom:1px solid var(--border);vertical-align:middle}
tr:hover td{background:var(--s2)}
tr:last-child td{border-bottom:none}
.badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;font-family:var(--mono);letter-spacing:.4px}
.bw{background:#00C89618;color:var(--green);border:1px solid #00C89625}
.bl{background:#E8455A18;color:var(--red);border:1px solid #E8455A25}
.bb{background:#D4B84A18;color:var(--yellow);border:1px solid #D4B84A25}
.bo{background:#2D9CDB18;color:var(--blue);border:1px solid #2D9CDB25}
.progress{background:var(--border);border-radius:4px;height:5px;overflow:hidden}
.progress-fill{height:100%;border-radius:4px;transition:width .4s}
label.lbl{display:block;font-size:11px;color:var(--muted2);font-weight:600;letter-spacing:.6px;text-transform:uppercase;margin-bottom:5px}

/* Layout structural adjustments */
.app-container {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 260px;
  background: var(--s1);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 24px 18px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}
.main-content {
  flex: 1;
  margin-left: 260px;
  padding: 24px 32px;
  min-height: 100vh;
  background: var(--bg);
}

/* Sidebar Menu Button */
.nav-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 11px 16px;
  background: transparent;
  color: var(--muted2);
  border: 1px solid transparent;
  border-radius: var(--r);
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s ease-in-out;
  margin-bottom: 4px;
}
.nav-btn:hover {
  background: var(--s2);
  color: var(--text);
}
.nav-btn.active {
  background: #C9A84C12;
  color: var(--gold);
  border: 1px solid #C9A84C25;
}

@media(max-width:900px){
  .app-container {
    flex-direction: column;
  }
  .sidebar {
    position: relative;
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 16px;
  }
  .main-content {
    margin-left: 0;
    padding: 16px;
  }
}

/* Slider style */
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--s3);
  outline: none;
  padding: 0;
  margin: 10px 0;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--gold);
  cursor: pointer;
  transition: transform 0.1s;
}
input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* Calendar styling */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-top: 10px;
}
.calendar-day-header {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 700;
  color: var(--muted2);
  text-align: center;
  padding: 6px 0;
  text-transform: uppercase;
}
.calendar-cell {
  background: var(--s2);
  border: 1px solid var(--border);
  border-radius: 6px;
  min-height: 54px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.15s;
}
.calendar-cell:hover {
  border-color: var(--border2);
}
.calendar-cell.today {
  border-color: var(--gold);
  background: #C9A84C08;
}
.calendar-cell.has-win {
  border-color: var(--green);
  background: #00C89608;
}
.calendar-cell.has-loss {
  border-color: var(--red);
  background: #E8455A08;
}
.calendar-cell.empty {
  background: transparent;
  border: none;
}
.calendar-date-num {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--muted2);
  font-weight: 700;
}
.calendar-pnl {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  text-align: right;
}
`;

/* ─── DONNÉES INITIALES PAR DÉFAUT ───────────────────────────────────────────── */
const TRADES0 = [
  {id:1,accountId:"acc-1",date:"2026-06-02",symbol:"GOLD",direction:"LONG",entry:2318,exit:2345,sl:2305,tp:2360,size:0.5,fees:10,pnl:1350,rr:2.08,status:"WIN",session:"Overlap",setup:"FVG",emotion:"Confiant",notes:"FVG H1 bien formé, confluence OB Daily. Sortie sur TP2.",rule_respected:true,chart_link:"https://tradingview.com"},
  {id:2,accountId:"acc-1",date:"2026-06-01",symbol:"GOLD",direction:"SHORT",entry:2352,exit:2330,sl:2365,tp:2320,size:0.5,fees:10,pnl:1100,rr:2.46,status:"WIN",session:"New York",setup:"Orderblock",emotion:"Neutre",notes:"OB 1H mitigation. DXY en hausse. Partiel à mi-chemin.",rule_respected:true,chart_link:""},
  {id:3,accountId:"acc-1",date:"2026-05-30",symbol:"EUR/USD",direction:"LONG",entry:1.0872,exit:1.0851,sl:1.0855,tp:1.0920,size:1.0,fees:8,pnl:-210,rr:2.82,status:"LOSS",session:"London",setup:"Breakout",emotion:"Impatient",notes:"Entré avant confirmation. Mauvais timing, structure pas validée.",rule_respected:false,chart_link:""},
  {id:4,accountId:"acc-1",date:"2026-05-29",symbol:"NAS100",direction:"LONG",entry:19340,exit:19340,sl:19200,tp:19560,size:0.2,fees:6,pnl:0,rr:1.57,status:"BE",session:"New York",setup:"Structure",emotion:"Neutre",notes:"Sorti au BE après fausse cassure. Position gérée correctement.",rule_respected:true,chart_link:""},
  {id:5,accountId:"acc-1",date:"2026-05-28",symbol:"GOLD",direction:"LONG",entry:2298,exit:2285,sl:2290,tp:2330,size:0.3,fees:8,pnl:-390,rr:4.0,status:"LOSS",session:"London",setup:"FVG",emotion:"Stressé",notes:"News CPI inattendue. SL touché. Pas de trading sur news = règle violée.",rule_respected:false,chart_link:""},
  {id:6,accountId:"acc-1",date:"2026-05-27",symbol:"BTC/USD",direction:"SHORT",entry:67800,exit:66950,sl:68400,tp:66000,size:0.15,fees:12,pnl:1275,rr:1.42,status:"WIN",session:"Overlap",setup:"Structure",emotion:"Confiant",notes:"BOS H4 confirmé. Trend baissier clairement établi.",rule_respected:true,chart_link:""},
];

const PLANS0 = {
  "acc-1": {
    strategy:"ICT / Smart Money Concepts",
    capital:100000,
    risk_pct:1,
    max_loss_day:3,
    max_dd:10,
    monthly_goal:7,
    max_trades_day:2,
    min_rr:1.5,
    sessions:["London","New York","Overlap"],
    pairs:["GOLD","EUR/USD","NAS100","BTC/USD","GBP/USD"],
    setups:[
      {name:"FVG",desc:"Fair Value Gap validé sur M15 après confirmation de structure sur H1. Confluence avec OB.",active:true},
      {name:"Orderblock",desc:"OB institutionnel non mitigé. Volume fort + bougie englobante pour confirmation avant entrée.",active:true},
      {name:"Breakout+Retest",desc:"Cassure S/R clé avec clôture franche. Attendre retest + confirmation avant entrée.",active:true},
      {name:"Structure BOS",desc:"Break of Structure + CHoCH sur HTF. Entrer sur premier pullback dans la nouvelle direction.",active:false},
    ],
    rules:[
      "Définir SL + TP AVANT d'entrer, sans exception",
      "R:R minimum 1.5 pour chaque trade",
      "Maximum 2 trades par jour",
      "Pause obligatoire après 2 pertes consécutives",
      "Zéro trade 30 min avant/après news majeures",
      "Analyser H4 → H1 → M15 avant toute entrée",
      "Journal complété dans les 30 min après clôture",
      "Réduire la taille de 50% après 3 wins consécutifs",
    ],
    emotion_rules:[
      "FOMO → attendre le prochain setup, ne jamais chaser",
      "Revanche → stopper la session immédiatement",
      "Trop confiant (3 wins) → réduire taille de 50%",
      "État mental < 6/10 → pas de trading ce jour",
      "Après 2 pertes consécutives → pause 24h minimum",
    ],
  },
  "acc-2": {
    strategy:"Scalping Momentum",
    capital:5000,
    risk_pct:0.5,
    max_loss_day:2,
    max_dd:8,
    monthly_goal:10,
    max_trades_day:5,
    min_rr:1.2,
    sessions:["London","New York"],
    pairs:["GOLD","EUR/USD","GBP/USD"],
    setups:[
      {name:"Scalp",desc:"Rebond sur support M1 après impulsion forte sur M5. Sortie rapide.",active:true}
    ],
    rules:[
      "Définir SL strict",
      "Pas de trades en dehors des sessions",
    ],
    emotion_rules:[
      "Stopper après 3 pertes de suite"
    ]
  }
};

const ACCOUNTS0 = [
  {id:"acc-1", name:"Prop Firm 100k", capital:100000},
  {id:"acc-2", name:"Compte Personnel", capital:5000}
];

const BACKTESTS0 = [
  {id:1,strategy:"ICT Silver Bullet",date:"2026-06-05",pair:"GOLD",tradesCount:30,winRate:66.7,pnl:4500,notes:"Bon taux de réussite sur la session NY. Drawdown max à 1.5%."},
  {id:2,strategy:"OB Mitigation M5",date:"2026-06-03",pair:"EUR/USD",tradesCount:20,winRate:50.0,pnl:1200,notes:"R:R élevé compensant le winrate moyen. Bon setup."}
];

const MINDSETS0 = [
  {id:1,date:"2026-06-11",sleep:8,energy:7,focus:8,stress:3,newsChecked:true,checklistCompleted:true,notes:"Esprit clair, prêt pour la session de New York. Pas de news avant 14h30."},
  {id:2,date:"2026-06-10",sleep:6,energy:5,focus:6,stress:6,newsChecked:true,checklistCompleted:true,notes:"Légère fatigue. Discipline requise pour ne pas chaser les faux signaux."}
];

/* ─── UTILS ─────────────────────────────────────────────────────────────────── */
const f2 = n => typeof n==="number" ? n.toFixed(2) : "—";
const f0 = n => typeof n==="number" ? Math.round(n).toLocaleString("fr-FR") : "—";
const fPnl = n => {
  if(n===undefined||n===null) return "—";
  const abs = Math.abs(n).toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2});
  return (n>=0?"+":"-")+"$"+abs;
};
const fPct = n => (n>=0?"+":"")+n.toFixed(1)+"%";
const colorPnl = n => n>0?"var(--green)":n<0?"var(--red)":"var(--yellow)";

/* ─── MINI SPARKLINE ─────────────────────────────────────────────────────────── */
function Spark({trades}){
  const sorted=[...trades].sort((a,b)=>a.date.localeCompare(b.date));
  let cum=0;
  const pts=sorted.map(t=>{cum+=t.pnl||0;return cum;});
  if(!pts.length) return null;
  const min=Math.min(0,...pts), max=Math.max(1,...pts), rng=max-min||1;
  const W=180,H=40,pad=4;
  const x=i=>(i/(pts.length-1||1))*(W-pad*2)+pad;
  const y=v=>H-pad-((v-min)/rng)*(H-pad*2);
  const d=pts.map((v,i)=>`${i===0?"M":"L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const color=pts[pts.length-1]>=0?"var(--green)":"var(--red)";
  return(
    <svg width={W} height={H} style={{overflow:"visible"}}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${d} L${x(pts.length-1).toFixed(1)},${H} L${pad},${H} Z`} fill="url(#sg)"/>
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={x(pts.length-1)} cy={y(pts[pts.length-1])} r="3" fill={color}/>
    </svg>
  );
}

/* ─── STAT TILE ─────────────────────────────────────────────────────────────── */
function Tile({label,value,sub,accent="var(--gold)",icon,mono=true}){
  return(
    <div style={{background:"var(--s1)",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"16px 18px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,width:"3px",height:"100%",background:accent,borderRadius:"3px 0 0 3px"}}/>
      <div style={{paddingLeft:8}}>
        <div style={{color:"var(--muted2)",fontSize:11,fontWeight:700,letterSpacing:".8px",textTransform:"uppercase",marginBottom:7}}>{label}</div>
        <div style={{fontSize:22,fontWeight:700,color:accent,fontFamily:mono?"var(--mono)":"var(--sans)",lineHeight:1}}>{value}</div>
        {sub&&<div style={{color:"var(--muted)",fontSize:12,marginTop:5}}>{sub}</div>}
      </div>
      {icon&&<div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:22,opacity:.18}}>{icon}</div>}
    </div>
  );
}

/* ─── MODAL TRADE ─────────────────────────────────────────────────────────────── */
function TradeModal({init,onSave,onClose}){
  const blank={date:new Date().toISOString().slice(0,10),symbol:"GOLD",direction:"LONG",
    entry:"",exit:"",sl:"",tp:"",size:"",fees:"8",session:"Overlap",setup:"FVG",
    emotion:"Neutre",notes:"",status:"",rule_respected:true,chart_link:""};
  const [f,setF]=useState(init||blank);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));

  const calcPnl=()=>{
    const e=+f.entry,x=+f.exit,s=+f.size;
    if(!e||!x||!s) return null;
    return (f.direction==="LONG"?1:-1)*(x-e)*s;
  };
  const calcRR=()=>{
    const e=+f.entry,x=+f.exit,sl=+f.sl;
    if(!e||!x||!sl) return null;
    const risk=Math.abs(e-sl),reward=Math.abs(x-e);
    return risk>0?reward/risk:null;
  };

  const save=()=>{
    const rawPnl=calcPnl()||0;
    const fees=+f.fees||0;
    const pnl=rawPnl-fees;
    const rr=calcRR();
    let status=f.status;
    if(!status){status=pnl>0?"WIN":pnl<0?"LOSS":"BE";}
    onSave({...f,entry:+f.entry,exit:+f.exit,sl:+f.sl||0,tp:+f.tp||0,
      size:+f.size,fees,pnl,rr:rr?+rr.toFixed(2):0,status,id:f.id||Date.now()});
  };

  const prevPnl=calcPnl();
  const prevRR=calcRR();

  const field=(label,fkey,type="text",rest={})=>(
    <div>
      <label className="lbl">{label}</label>
      <input type={type} value={f[fkey]} onChange={e=>set(fkey,e.target.value)} {...rest}/>
    </div>
  );
  const sel=(label,fkey,opts)=>(
    <div>
      <label className="lbl">{label}</label>
      <select value={f[fkey]} onChange={e=>set(fkey,e.target.value)}>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(6px)",zIndex:999,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 16px",overflowY:"auto"}}>
      <div className="card fade" style={{width:"100%",maxWidth:660,maxHeight:"calc(100vh - 80px)",display:"flex",flexDirection:"column",padding:0,border:"1px solid var(--border2)",overflow:"hidden"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",borderBottom:"1px solid var(--border)",flexShrink:0}}>
          <h3 style={{fontWeight:800,fontSize:17}}>{f.id?"Modifier le trade":"+ Nouveau Trade"}</h3>
          <button className="btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}>
          {/* Preview PnL */}
          {prevPnl!==null&&(
            <div style={{background:prevPnl>=0?"#00C89610":"#E8455A10",border:`1px solid ${prevPnl>=0?"#00C89625":"#E8455A25"}`,borderRadius:"var(--r)",padding:"10px 14px",marginBottom:16,display:"flex",gap:24,alignItems:"center"}}>
              <span className="mono" style={{fontWeight:700,fontSize:17,color:colorPnl(prevPnl)}}>{fPnl(prevPnl)}</span>
              {prevRR&&<span style={{color:"var(--muted2)",fontSize:13}}>R:R <b style={{color:"var(--text)"}}>{f2(prevRR)}</b></span>}
              <span style={{marginLeft:"auto",fontSize:12,color:prevRR&&prevRR>=1.5?"var(--green)":"var(--red)",fontWeight:600}}>
                {prevRR?(prevRR>=1.5?"✓ R:R OK":"✗ R:R insuffisant"):""}
              </span>
            </div>
          )}

          <div className="g2" style={{gap:10,marginBottom:10}}>
            {field("Date","date","date")}
            {field("Symbole","symbol","text",{placeholder:"GOLD, EUR/USD..."})}
          </div>
          <div className="g3" style={{gap:10,marginBottom:10}}>
            {sel("Direction","direction",["LONG","SHORT"])}
            {field("Entrée","entry","number",{step:"any",placeholder:"0.00"})}
            {field("Sortie","exit","number",{step:"any",placeholder:"0.00"})}
          </div>
          <div className="g3" style={{gap:10,marginBottom:10}}>
            {field("Stop Loss","sl","number",{step:"any",placeholder:"0.00"})}
            {field("Take Profit","tp","number",{step:"any",placeholder:"0.00"})}
            {field("Taille (lots)","size","number",{step:"any",placeholder:"0.1"})}
          </div>
          <div className="g4" style={{gap:10,marginBottom:10}}>
            {sel("Session","session",["Tokyo","London","New York","Overlap"])}
            {sel("Setup","setup",["FVG","Orderblock","Breakout","Structure","Scalp","Autre"])}
            {sel("Émotion","emotion",["Confiant","Neutre","Incertain","Stressé","Impatient","Euphorique"])}
            {field("Frais ($)","fees","number",{placeholder:"8"})}
          </div>
          <div className="g2" style={{gap:10,marginBottom:10}}>
            {sel("Statut (auto si vide)","status",["","WIN","LOSS","BE","OPEN"])}
            <div>
              <label className="lbl">Règles respectées ?</label>
              <div style={{display:"flex",gap:10,marginTop:2}}>
                {[true,false].map(v=>(
                  <button key={String(v)} onClick={()=>set("rule_respected",v)}
                    style={{flex:1,padding:"9px",borderRadius:"var(--r)",fontWeight:700,fontSize:13,
                    background:f.rule_respected===v?(v?"#00C89620":"#E8455A20"):"var(--s2)",
                    color:f.rule_respected===v?(v?"var(--green)":"var(--red)"):"var(--muted2)",
                    border:`1px solid ${f.rule_respected===v?(v?"#00C89640":"#E8455A40"):"var(--border)"}`}}>
                    {v?"✓ OUI":"✗ NON"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{marginBottom:10}}>
            {field("Lien du Graphique / Screenshot (URL)","chart_link","text",{placeholder:"https://tradingview.com/x/..."})}
          </div>
          <div style={{marginBottom:18}}>
            <label className="lbl">Notes & Analyse post-trade</label>
            <textarea value={f.notes} onChange={e=>set("notes",e.target.value)} rows={3}
              placeholder="Raison d'entrée, gestion, leçons apprises..." style={{resize:"vertical"}}/>
          </div>
        </div>

        <div style={{display:"flex",gap:10,justifyContent:"flex-end",padding:"14px 20px",borderTop:"1px solid var(--border)",background:"var(--s2)",flexShrink:0}}>
          <button className="btn-ghost" onClick={onClose}>Annuler</button>
          <button className="btn-gold" onClick={save}>💾 Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

/* ─── MONTHLY PERFORMANCE CALENDAR ─────────────────────────────────────────── */
function PerformanceCalendar({trades, date, onSelectDate}){
  const [currentDate, setCurrentDate] = useState(date || new Date("2026-06-11"));

  const changeMonth = (dir) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + dir, 1));
  };

  const getDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    let startDay = firstDay.getDay() - 1; // Mon-indexed
    if(startDay === -1) startDay = 6;
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const cells = [];
    for (let i = 0; i < startDay; i++) {
      cells.push({day: null, dateStr: null});
    }
    for (let d = 1; d <= totalDays; d++) {
      const dStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      cells.push({day: d, dateStr: dStr});
    }
    return cells;
  };

  const monthName = currentDate.toLocaleDateString("fr-FR", {month: "long", year: "numeric"});
  const cells = getDays();
  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  // Aggregate PnL by date
  const pnlMap = {};
  trades.forEach(t => {
    if(t.status === "OPEN" || !t.date) return;
    pnlMap[t.date] = (pnlMap[t.date] || 0) + (t.pnl || 0);
  });

  return (
    <div className="card" style={{marginTop: 14}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12}}>
        <div style={{fontWeight: 700, fontSize: 13}}>📅 Calendrier Mensuel des Performance</div>
        <div style={{display: "flex", gap: 6, alignItems: "center"}}>
          <button className="btn-ghost btn-sm" onClick={() => changeMonth(-1)}>◀</button>
          <span className="mono" style={{fontSize: 13, textTransform: "capitalize", fontWeight: 700}}>{monthName}</span>
          <button className="btn-ghost btn-sm" onClick={() => changeMonth(1)}>▶</button>
        </div>
      </div>
      
      <div className="calendar-grid">
        {weekDays.map(wd => <div key={wd} className="calendar-day-header">{wd}</div>)}
        {cells.map((cell, idx) => {
          if (!cell.day) return <div key={`empty-${idx}`} className="calendar-cell empty" />;
          
          const pnl = pnlMap[cell.dateStr];
          const hasTrade = pnl !== undefined;
          const isToday = cell.dateStr === new Date().toISOString().slice(0, 10);
          
          let cellClass = "calendar-cell";
          if (isToday) cellClass += " today";
          if (hasTrade) {
            cellClass += pnl > 0 ? " has-win" : pnl < 0 ? " has-loss" : "";
          }

          return (
            <div key={cell.dateStr} className={cellClass} style={{cursor: "pointer"}} onClick={() => onSelectDate && onSelectDate(cell.dateStr)}>
              <span className="calendar-date-num">{cell.day}</span>
              {hasTrade && (
                <span className="calendar-pnl" style={{color: colorPnl(pnl)}}>
                  {pnl > 0 ? `+${Math.round(pnl)}` : Math.round(pnl)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── DASHBOARD ─────────────────────────────────────────────────────────────── */
function Dashboard({trades,plan,onAddTrade}){
  const valid=trades.filter(t=>t.status!=="OPEN");
  const wins=valid.filter(t=>t.status==="WIN");
  const losses=valid.filter(t=>t.status==="LOSS");
  const totalPnl=trades.reduce((s,t)=>s+(t.pnl||0),0);
  const winRate=valid.length?wins.length/valid.length*100:0;
  const avgWin=wins.length?wins.reduce((s,t)=>s+t.pnl,0)/wins.length:0;
  const avgLoss=losses.length?Math.abs(losses.reduce((s,t)=>s+t.pnl,0)/losses.length):1;
  const pf=losses.length?(wins.reduce((s,t)=>s+t.pnl,0)/Math.abs(losses.reduce((s,t)=>s+t.pnl,0))):null;
  const avgRR=trades.filter(t=>t.rr>0).reduce((s,t)=>s+t.rr,0)/Math.max(1,trades.filter(t=>t.rr>0).length);
  const capital=plan.capital+totalPnl;
  const pnlPct=totalPnl/plan.capital*100;
  const monthTarget=plan.capital*plan.monthly_goal/100;
  const monthProg=Math.min(100,Math.max(0,totalPnl/monthTarget*100));
  const ruleBreaks=trades.filter(t=>t.rule_respected===false).length;

  // streak
  let streak=0,streakType=null;
  const sorted=[...trades].sort((a,b)=>b.date.localeCompare(a.date));
  for(const t of sorted){
    if(t.status==="OPEN") continue;
    if(!streakType){streakType=t.status;streak=1;}
    else if(t.status===streakType) streak++;
    else break;
  }

  // par session
  const bySess={};
  trades.forEach(t=>{if(!bySess[t.session]) bySess[t.session]={pnl:0,n:0,w:0};bySess[t.session].n++;bySess[t.session].pnl+=t.pnl||0;if(t.status==="WIN")bySess[t.session].w++;});

  // par setup
  const bySetup={};
  trades.forEach(t=>{if(!bySetup[t.setup])bySetup[t.setup]={pnl:0,n:0,w:0};bySetup[t.setup].n++;bySetup[t.setup].pnl+=t.pnl||0;if(t.status==="WIN")bySetup[t.setup].w++;});

  const ddPct=Math.max(0,-pnlPct);

  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}} className="fade">

      {/* Barre contexte Gold */}
      <div style={{background:"var(--s1)",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:"11px 18px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
        <span style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--muted2)"}}>CONTEXTE GOLD FOCUS</span>
        <span style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--gold)",fontWeight:700}}>Meilleur créneau :</span>
        {["09h–12h GMT (London)","13h–18h GMT (Overlap ★)"].map(s=>(
          <span key={s} style={{padding:"3px 10px",background:"var(--gold)15",border:"1px solid var(--gold)30",borderRadius:20,fontSize:12,color:"var(--gold)",fontFamily:"var(--mono)"}}>{s}</span>
        ))}
        <span style={{marginLeft:"auto",fontSize:12,color:"var(--muted)",fontFamily:"var(--mono)"}}>Éviter : Tokyo · News ±30min · Vendredi soir</span>
      </div>

      {/* KPIs */}
      <div className="g4">
        <Tile label="Capital Courant" value={`$${f0(capital)}`} sub={fPct(pnlPct)+" depuis début"} accent={totalPnl>=0?"var(--green)":"var(--red)"} icon="💰"/>
        <Tile label="PnL Total" value={fPnl(totalPnl)} sub={`${trades.length} trades`} accent={totalPnl>=0?"var(--green)":"var(--red)"} icon="📊"/>
        <Tile label="Win Rate" value={f2(winRate)+"%"} sub={`${wins.length}W · ${losses.length}L · ${valid.filter(t=>t.status==="BE").length}BE`} accent={winRate>=50?"var(--green)":"var(--red)"} icon="🎯"/>
        <Tile label="Profit Factor" value={pf!==null?f2(pf):"∞"} sub={`R:R moy. ${f2(avgRR)}`} accent={pf===null||pf>=1.5?"var(--green)":pf>=1?"var(--yellow)":"var(--red)"} icon="⚖️"/>
      </div>

      <div className="g2">
        {/* Courbe + stats */}
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <span style={{fontWeight:700,fontSize:14}}>Courbe d'Équité</span>
            <span className="mono" style={{fontSize:13,color:colorPnl(totalPnl),fontWeight:700}}>{fPnl(totalPnl)}</span>
          </div>
          <Spark trades={trades}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginTop:16}}>
            {[
              {l:"Gain moyen",v:"+$"+f2(avgWin),c:"var(--green)"},
              {l:"Perte moyenne",v:"-$"+f2(avgLoss),c:"var(--red)"},
              {l:"Série actuelle",v:streak>0?`${streak}× ${streakType}`:"—",c:streakType==="WIN"?"var(--green)":streakType==="LOSS"?"var(--red)":"var(--muted)"},
            ].map(x=>(
              <div key={x.l} style={{background:"var(--s2)",borderRadius:6,padding:"10px 12px"}}>
                <div style={{fontSize:11,color:"var(--muted2)",fontWeight:600,textTransform:"uppercase",letterSpacing:".6px",marginBottom:4}}>{x.l}</div>
                <div className="mono" style={{fontWeight:700,color:x.c,fontSize:14}}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Objectif + risque */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div className="card">
            <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Objectif Mensuel — {plan.monthly_goal}%</div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12,color:"var(--muted2)"}}>
              <span>Réalisé : <b style={{color:colorPnl(totalPnl)}}>{fPnl(totalPnl)}</b></span>
              <span>Cible : <b style={{color:"var(--text)"}}>{fPnl(monthTarget)}</b></span>
            </div>
            <div className="progress" style={{height:8,marginBottom:4}}>
              <div className="progress-fill" style={{width:monthProg+"%",background:monthProg>=100?"var(--green)":"linear-gradient(90deg,var(--blue),var(--gold))"}}/>
            </div>
            <div style={{fontSize:12,color:"var(--muted2)",marginTop:4}}>{f2(monthProg)}% atteint</div>
          </div>
          <div className="card">
            <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Contrôle du Risque</div>
            {[
              {l:"Drawdown actuel",v:ddPct,max:plan.max_dd,unit:"%"},
              {l:"Règles violées",v:ruleBreaks,max:trades.length||1,unit:" trades"},
            ].map(item=>{
              const p=Math.min(100,item.v/item.max*100);
              const c=p>70?"var(--red)":p>40?"var(--yellow)":"var(--green)";
              return(
                <div key={item.l} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}>
                    <span style={{color:"var(--muted2)"}}>{item.l}</span>
                    <span className="mono" style={{fontWeight:700,color:c}}>{f2(item.v)}{item.unit} / {item.max}{item.unit}</span>
                  </div>
                  <div className="progress"><div className="progress-fill" style={{width:p+"%",background:c}}/></div>
                </div>
              );
            })}
            <div style={{marginTop:10,padding:"9px 12px",background:"var(--s2)",borderRadius:6,borderLeft:"2px solid var(--gold)"}}>
              <div style={{fontSize:11,color:"var(--muted2)",marginBottom:2}}>Risque max par trade</div>
              <div className="mono" style={{fontWeight:700,color:"var(--gold)",fontSize:15}}>${f2(capital*plan.risk_pct/100)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendrier de performance */}
      <PerformanceCalendar trades={trades} />

      {/* Sessions + Setups */}
      <div className="g2">
        <div className="card">
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Performance par Session</div>
          <table>
            <thead><tr><th>Session</th><th>Trades</th><th>Win%</th><th>PnL</th></tr></thead>
            <tbody>
              {Object.entries(bySess).sort((a,b)=>b[1].pnl-a[1].pnl).map(([name,d])=>(
                <tr key={name}>
                  <td style={{fontWeight:600}}>{name}</td>
                  <td style={{color:"var(--muted2)"}}>{d.n}</td>
                  <td><span className="mono" style={{fontSize:12,color:d.w/d.n>=.5?"var(--green)":"var(--red)"}}>{(d.w/d.n*100).toFixed(0)}%</span></td>
                  <td className="mono" style={{fontWeight:700,color:colorPnl(d.pnl),fontSize:13}}>{fPnl(d.pnl)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Performance par Setup</div>
          <table>
            <thead><tr><th>Setup</th><th>Trades</th><th>Win%</th><th>PnL</th></tr></thead>
            <tbody>
              {Object.entries(bySetup).sort((a,b)=>b[1].pnl-a[1].pnl).map(([name,d])=>(
                <tr key={name}>
                  <td style={{fontWeight:600}}>{name}</td>
                  <td style={{color:"var(--muted2)"}}>{d.n}</td>
                  <td><span className="mono" style={{fontSize:12,color:d.w/d.n>=.5?"var(--green)":"var(--red)"}}>{(d.w/d.n*100).toFixed(0)}%</span></td>
                  <td className="mono" style={{fontWeight:700,color:colorPnl(d.pnl),fontSize:13}}>{fPnl(d.pnl)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── JOURNAL ───────────────────────────────────────────────────────────────── */
function Journal({trades,onAdd,onEdit,onDelete,onOpenAddModal,onOpenEditModal}){
  const [filt,setFilt]=useState({status:"ALL",symbol:"",setup:"ALL",rules:"ALL"});
  const [sort,setSort]=useState({k:"date",d:-1});

  const filtered=trades.filter(t=>{
    if(filt.status!=="ALL"&&t.status!==filt.status) return false;
    if(filt.symbol&&!t.symbol.toLowerCase().includes(filt.symbol.toLowerCase())) return false;
    if(filt.setup!=="ALL"&&t.setup!==filt.setup) return false;
    if(filt.rules==="OK"&&t.rule_respected===false) return false;
    if(filt.rules==="KO"&&t.rule_respected!==false) return false;
    return true;
  }).sort((a,b)=>{
    const va=a[sort.k],vb=b[sort.k];
    return sort.d*(typeof va==="string"?va.localeCompare(vb):(va||0)-(vb||0));
  });

  const Th=({k,l})=>(
    <th onClick={()=>setSort(s=>({k,d:s.k===k?-s.d:-1}))} style={{cursor:"pointer",userSelect:"none"}}>
      {l}{sort.k===k?(sort.d===-1?" ↓":" ↑"):""}
    </th>
  );

  const setups=[...new Set(trades.map(t=>t.setup))];

  // CSV Export Function
  const exportCSV = () => {
    const headers = ["Date", "Symbole", "Direction", "Entree", "Sortie", "SL", "TP", "Taille", "Frais", "PnL", "RR", "Statut", "Session", "Setup", "Emotion", "Regles", "Notes", "Screenshot"];
    const rows = filtered.map(t => [
      t.date, t.symbol, t.direction, t.entry, t.exit || "", t.sl || "", t.tp || "", t.size, t.fees, t.pnl || 0, t.rr || 0, t.status, t.session, t.setup, t.emotion, t.rule_respected ? "Respectee" : "Viole", t.notes || "", t.chart_link || ""
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(";"), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(";"))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `journal_trading_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return(
    <div className="fade">
      {/* Toolbar */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:14}}>
        <button className="btn-gold" onClick={onOpenAddModal}>+ Trade</button>
        <button className="btn-ghost" onClick={exportCSV}>📥 Exporter CSV</button>
        <input placeholder="🔍 Symbole..." value={filt.symbol} onChange={e=>setFilt(p=>({...p,symbol:e.target.value}))} style={{width:130}}/>
        <select value={filt.status} onChange={e=>setFilt(p=>({...p,status:e.target.value}))} style={{width:130}}>
          <option value="ALL">Tous statuts</option>
          {["WIN","LOSS","BE","OPEN"].map(s=><option key={s}>{s}</option>)}
        </select>
        <select value={filt.setup} onChange={e=>setFilt(p=>({...p,setup:e.target.value}))} style={{width:130}}>
          <option value="ALL">Tous setups</option>
          {setups.map(s=><option key={s}>{s}</option>)}
        </select>
        <select value={filt.rules} onChange={e=>setFilt(p=>({...p,rules:e.target.value}))} style={{width:150}}>
          <option value="ALL">Toutes les règles</option>
          <option value="OK">Règles respectées</option>
          <option value="KO">Règles violées</option>
        </select>
        <span style={{marginLeft:"auto",fontSize:12,color:"var(--muted2)"}}>{filtered.length} trade{filtered.length!==1?"s":""}</span>
      </div>

      {/* Table */}
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table>
            <thead>
              <tr>
                <Th k="date" l="Date"/>
                <Th k="symbol" l="Symbole"/>
                <th>Dir.</th>
                <Th k="entry" l="Entrée"/>
                <Th k="exit" l="Sortie"/>
                <th>SL / TP</th>
                <Th k="rr" l="R:R"/>
                <th>Setup</th>
                <th>Session</th>
                <th>Émotion</th>
                <Th k="pnl" l="PnL"/>
                <th>Statut</th>
                <th>Règles</th>
                <th>Graph</th>
                <th>Act.</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0&&(
                <tr><td colSpan={15} style={{textAlign:"center",color:"var(--muted)",padding:32}}>Aucun trade — clique sur "+ Trade" pour commencer</td></tr>
              )}
              {filtered.map(t=>(
                <tr key={t.id}>
                  <td className="mono" style={{fontSize:12,color:"var(--muted2)"}}>{t.date}</td>
                  <td style={{fontWeight:700}}>{t.symbol}</td>
                  <td>
                    <span className="mono" style={{fontSize:11,padding:"2px 7px",borderRadius:4,background:t.direction==="LONG"?"#00C89615":"#E8455A15",color:t.direction==="LONG"?"var(--green)":"var(--red)",fontWeight:700}}>
                      {t.direction==="LONG"?"▲":"▼"} {t.direction}
                    </span>
                  </td>
                  <td className="mono" style={{fontSize:12}}>{t.entry}</td>
                  <td className="mono" style={{fontSize:12}}>{t.exit||"—"}</td>
                  <td className="mono" style={{fontSize:11,color:"var(--muted2)"}}>
                    <span style={{color:"var(--red)"}}>{t.sl||"—"}</span> · <span style={{color:"var(--green)"}}>{t.tp||"—"}</span>
                  </td>
                  <td className="mono" style={{fontWeight:700,color:t.rr>=1.5?"var(--green)":t.rr>0?"var(--yellow)":"var(--muted)",fontSize:12}}>{t.rr?f2(t.rr)+"R":"—"}</td>
                  <td><span style={{fontSize:12,padding:"2px 8px",background:"var(--s2)",borderRadius:5}}>{t.setup}</span></td>
                  <td style={{fontSize:12,color:"var(--muted2)"}}>{t.session}</td>
                  <td style={{fontSize:12,color:"var(--muted2)"}}>{t.emotion}</td>
                  <td className="mono" style={{fontWeight:700,color:colorPnl(t.pnl||0),fontSize:13}}>
                    {t.pnl!==undefined?(t.pnl>=0?"+":"")+f2(t.pnl)+"$":"—"}
                  </td>
                  <td>
                    <span className={`badge ${t.status==="WIN"?"bw":t.status==="LOSS"?"bl":t.status==="BE"?"bb":"bo"}`}>{t.status}</span>
                  </td>
                  <td>
                    <span style={{fontSize:16}}>{t.rule_respected===false?"🔴":"🟢"}</span>
                  </td>
                  <td>
                    {t.chart_link ? (
                      <a href={t.chart_link} target="_blank" rel="noreferrer" style={{textDecoration: "none", fontSize: 16}}>🔗</a>
                    ) : "—"}
                  </td>
                  <td>
                    <div style={{display:"flex",gap:5}}>
                      <button className="btn-ghost btn-sm" onClick={()=>onOpenEditModal(t)}>✏️</button>
                      <button className="btn-red" onClick={()=>onDelete(t.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      {filtered.some(t=>t.notes)&&(
        <div className="card" style={{marginTop:14}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>📝 Notes des Trades</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {filtered.filter(t=>t.notes).map(t=>(
              <div key={t.id} style={{padding:"10px 14px",background:"var(--s2)",borderRadius:"var(--r)",borderLeft:`3px solid ${t.status==="WIN"?"var(--green)":t.status==="LOSS"?"var(--red)":"var(--yellow)"}`}}>
                <div style={{display:"flex",gap:10,marginBottom:4,alignItems:"center",flexWrap:"wrap"}}>
                  <span className="mono" style={{fontWeight:700,fontSize:12}}>{t.symbol}</span>
                  <span style={{color:"var(--muted2)",fontSize:12}}>{t.date}</span>
                  <span className={`badge ${t.status==="WIN"?"bw":t.status==="LOSS"?"bl":"bb"}`}>{t.status}</span>
                  {t.rule_respected===false&&<span style={{fontSize:11,color:"var(--red)",fontWeight:600}}>⚠️ Règles non respectées</span>}
                  {t.chart_link && <a href={t.chart_link} target="_blank" rel="noreferrer" style={{fontSize: 12, color: "var(--gold)", marginLeft: "auto"}}>Voir Graphique ↗</a>}
                </div>
                <p style={{fontSize:13,color:"var(--muted2)",lineHeight:1.6}}>{t.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── PLAN DE TRADING ───────────────────────────────────────────────────────── */
function Plan({plan,onChange}){
  const [editing,setEditing]=useState(false);
  const [activeSubTab,setActiveSubTab]=useState("plan");
  const [f,setF]=useState(plan);
  const [notif,setNotif]=useState("");

  const set=(k,v)=>setF(p=>({...p,[k]:v}));

  const triggerNotif=(msg)=>{
    setNotif(msg);
    setTimeout(()=>setNotif(""),3000);
  };

  const GUIDES = [
    {
      name: "SMC FVG+OB",
      desc: "Retest d'un FVG (Fair Value Gap) / Order block après un BOS/CHoCH en tendance supérieure.",
      market: "GOLD, Forex (EURUSD, GBPUSD)",
      rr: "1:3 à 1:5",
      winrate: "40% - 50%",
      detail: "Identifier un CHoCH/BOS en H1/H4. Attendre un retracement en Discount (Fib < 50%) sur M15, et entrer au niveau d'un FVG non comblé ou d'un Order Block récent."
    },
    {
      name: "Liquidity Sweep",
      desc: "Prise de liquidité d'un sommet/creux majeur (EQH/EQL) suivie d'un rejet avec bougie impulsive contraire.",
      market: "Indices (US30, NAS100), GOLD",
      rr: "1:4+",
      winrate: "35% - 45%",
      detail: "Repérer des sommets/creux égaux (Equal Highs/Lows). Attendre la mèche de balayage (sweep), puis une bougie de confirmation (changement de caractère en M1/M5) pour entrer."
    },
    {
      name: "Break & Retest",
      desc: "Cassure franche d'un niveau S/R majeur avec clôture, puis retest du niveau avec bougie de rejet.",
      market: "Forex, Crypto, Actions",
      rr: "1:2",
      winrate: "55% - 65%",
      detail: "Tracer des zones de supports/résistances majeures H4. Attendre une cassure franche avec corps de bougie en H1, puis entrer sur retest avec bougie marteau/englobante."
    },
    {
      name: "Trend Following EMA",
      desc: "Trading de suivi de tendance avec EMA 200 de fond et entrée en pullback sur EMA 50.",
      market: "Forex, Actions, GOLD",
      rr: "1:2 à 1:3",
      winrate: "50% - 60%",
      detail: "La tendance est définie par l'alignement de l'EMA 200. Entrez sur le pullback lorsque le prix vient toucher l'EMA 50 et montre des signes de rejet en bougies H1."
    },
    {
      name: "London Judas Swing",
      desc: "Fausse cassure du range de la session asiatique à l'ouverture de Londres, entrée après réintégration.",
      market: "Forex (GBPUSD, EURUSD), GOLD",
      rr: "1:3",
      winrate: "45% - 55%",
      detail: "Marquer le haut et bas de la session asiatique (00:00 - 08:00 FR). Attendre la fausse impulsion de 8h00-9h00 qui casse ce range pour liquider les traders, puis entrer à la réintégration."
    },
    {
      name: "NY Silver Bullet",
      desc: "Setup algorithmique formé durant la fenêtre 10:00 AM - 11:00 AM EST (16h00 - 17h00 FR).",
      market: "Indices (NASDAQ, SPX), GOLD",
      rr: "1:2 à 1:3",
      winrate: "50% - 60%",
      detail: "Durant l'heure spécifique, identifier une prise de liquidité suivie d'un déplacement impulsif créant un FVG. Placer un ordre limite au FVG avec SL au plus bas/haut local."
    }
  ];

  const addStrategyToPlan = (strat) => {
    if(plan.setups.some(s => s.name.toLowerCase() === strat.name.toLowerCase())) {
      triggerNotif(`Le setup "${strat.name}" existe déjà.`);
      return;
    }
    const updatedSetups = [...plan.setups, { name: strat.name, desc: strat.desc, active: true }];
    onChange({ ...plan, setups: updatedSetups });
    triggerNotif(`Setup "${strat.name}" ajouté !`);
  };

  if(editing) return(
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 style={{fontWeight:800,fontSize:16}}>✏️ Modifier le Plan</h3>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" onClick={()=>setEditing(false)}>Annuler</button>
          <button className="btn-gold" onClick={()=>{onChange(f);setEditing(false);}}>💾 Sauvegarder</button>
        </div>
      </div>
      <div className="card">
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Paramètres Généraux</div>
        <div className="g3" style={{gap:10}}>
          {[["Stratégie","strategy","text"],["Capital ($)","capital","number"],["Risque/trade (%)","risk_pct","number"],
            ["Perte max/jour (%)","max_loss_day","number"],["Drawdown max (%)","max_dd","number"],
            ["Objectif mensuel (%)","monthly_goal","number"],["Max trades/jour","max_trades_day","number"],["R:R minimum","min_rr","number"]
          ].map(([l,k,t])=>(
            <div key={k}>
              <label className="lbl">{l}</label>
              <input type={t} value={f[k]} onChange={e=>set(k,t==="number"?parseFloat(e.target.value):e.target.value)}/>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>📐 Setups Autorisés</div>
        {f.setups.map((s,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12,padding:12,background:"var(--s3)",borderRadius:"var(--r)",border:"1px solid var(--border)"}}>
            <div style={{display:"flex",gap:8}}>
              <input style={{flex:1}} value={s.name} placeholder="Nom du setup" onChange={e=>{const arr=[...f.setups];arr[i]={...s, name:e.target.value};set("setups",arr);}}/>
              <button className={`btn-${s.active?"gold":"ghost"} btn-sm`} style={{fontSize:11}} onClick={()=>{const arr=[...f.setups];arr[i]={...s, active:!s.active};set("setups",arr);}}>{s.active?"Actif":"Inactif"}</button>
              <button className="btn-red" onClick={()=>set("setups",f.setups.filter((_,j)=>j!==i))}>✕</button>
            </div>
            <textarea value={s.desc} placeholder="Description du setup..." rows={2} style={{fontSize:12,lineHeight:1.4}} onChange={e=>{const arr=[...f.setups];arr[i]={...s, desc:e.target.value};set("setups",arr);}}/>
          </div>
        ))}
        <button className="btn-ghost btn-sm" onClick={()=>set("setups",[...f.setups,{name:"",desc:"",active:true}])}>+ Setup</button>
      </div>
      <div className="card">
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Règles de Trading</div>
        {f.rules.map((r,i)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:8}}>
            <input value={r} onChange={e=>{const arr=[...f.rules];arr[i]=e.target.value;set("rules",arr);}}/>
            <button className="btn-red" onClick={()=>set("rules",f.rules.filter((_,j)=>j!==i))}>✕</button>
          </div>
        ))}
        <button className="btn-ghost btn-sm" onClick={()=>set("rules",[...f.rules,""])}>+ Règle</button>
      </div>
      <div className="card">
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>🧠 Règles Émotionnelles</div>
        {f.emotion_rules.map((r,i)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:8}}>
            <input value={r} onChange={e=>{const arr=[...f.emotion_rules];arr[i]=e.target.value;set("emotion_rules",arr);}}/>
            <button className="btn-red" onClick={()=>set("emotion_rules",f.emotion_rules.filter((_,j)=>j!==i))}>✕</button>
          </div>
        ))}
        <button className="btn-ghost btn-sm" onClick={()=>set("emotion_rules",[...f.emotion_rules,""])}>+ Règle Émotionnelle</button>
      </div>
    </div>
  );

  const Block=({title,accent,children})=>(
    <div className="card" style={{borderTop:`2px solid ${accent}`}}>
      <div style={{fontWeight:700,fontSize:14,color:accent,marginBottom:14}}>{title}</div>
      {children}
    </div>
  );

  return(
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderBottom:"1px solid var(--border)",paddingBottom:12}}>
        <div>
          <h2 style={{fontWeight:800,fontSize:19}}>{plan.strategy}</h2>
          <p style={{color:"var(--muted2)",fontSize:13,marginTop:3}}>Plan de Trading Personnel — mis à jour régulièrement</p>
        </div>
        <button className="btn-ghost" onClick={()=>{setF(plan);setEditing(true);}}>✏️ Modifier</button>
      </div>

      {/* Subtab selection */}
      <div style={{display:"flex",gap:10,borderBottom:"1px solid var(--border)",paddingBottom:2,marginTop:-4}}>
        <button onClick={()=>setActiveSubTab("plan")} style={{background:"none",border:"none",color:activeSubTab==="plan"?"var(--gold)":"var(--muted2)",fontWeight:700,fontSize:13,cursor:"pointer",borderBottom:activeSubTab==="plan"?"2px solid var(--gold)":"",padding:"8px 12px",outline:"none"}}>📋 Mon Plan</button>
        <button onClick={()=>setActiveSubTab("guide")} style={{background:"none",border:"none",color:activeSubTab==="guide"?"var(--gold)":"var(--muted2)",fontWeight:700,fontSize:13,cursor:"pointer",borderBottom:activeSubTab==="guide"?"2px solid var(--gold)":"",padding:"8px 12px",outline:"none"}}>💡 Guide de Stratégies</button>
      </div>

      {activeSubTab === "plan" ? (
        <>
          {/* KPIs */}
          <div className="g4">
            <Tile label="Capital de départ" value={`$${f0(plan.capital)}`} accent="var(--blue)" icon="💵"/>
            <Tile label="Risque par trade" value={`${plan.risk_pct}%`} sub={`Max $${f2(plan.capital*plan.risk_pct/100)}`} accent="var(--yellow)" icon="⚠️"/>
            <Tile label="Stop journalier" value={`${plan.max_loss_day}%`} sub={`Max $${f2(plan.capital*plan.max_loss_day/100)}`} accent="var(--red)" icon="🚫"/>
            <Tile label="Objectif mensuel" value={`+${plan.monthly_goal}%`} sub={`+$${f2(plan.capital*plan.monthly_goal/100)}`} accent="var(--green)" icon="🎯"/>
          </div>

          <div className="g2">
            {/* Setups */}
            <Block title="📐 Setups Autorisés" accent="var(--gold)">
              {plan.setups.length === 0 && (
                <div style={{fontSize:12,color:"var(--muted2)",textAlign:"center",padding:20}}>Aucun setup configuré. Visitez le 'Guide de Stratégies' pour en ajouter !</div>
              )}
              {plan.setups.map((s,i)=>(
                <div key={i} style={{marginBottom:10,padding:"11px 13px",background:"var(--s2)",borderRadius:"var(--r)",borderLeft:`3px solid ${s.active?"var(--gold)":"var(--border2)"}`,opacity:s.active?1:.5}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <span style={{fontWeight:700,fontSize:13}}>{s.name}</span>
                    <span style={{fontSize:11,padding:"2px 8px",borderRadius:10,background:s.active?"#C9A84C18":"var(--border)",color:s.active?"var(--gold)":"var(--muted2)",fontWeight:700}}>{s.active?"ACTIF":"INACTIF"}</span>
                  </div>
                  <p style={{fontSize:12,color:"var(--muted2)",lineHeight:1.5}}>{s.desc}</p>
                </div>
              ))}
            </Block>

            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {/* Sessions & paires */}
              <Block title="⏰ Sessions & Instruments" accent="var(--blue)">
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
                  {["Tokyo","London","New York","Overlap"].map(s=>(
                    <span key={s} style={{padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:700,
                      background:plan.sessions.includes(s)?"#2D9CDB20":"var(--s2)",
                      color:plan.sessions.includes(s)?"var(--blue)":"var(--muted2)",
                      border:`1px solid ${plan.sessions.includes(s)?"#2D9CDB40":"var(--border)"}`}}>
                      {s}{plan.sessions.includes(s)?" ✓":""}
                    </span>
                  ))}
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {plan.pairs.map(p=>(
                    <span key={p} style={{padding:"4px 10px",borderRadius:6,fontSize:12,fontWeight:700,background:"var(--gold)15",color:"var(--gold)",border:"1px solid var(--gold)25"}}>{p}</span>
                  ))}
                </div>
              </Block>

              {/* Limites */}
              <Block title="📏 Limites Opérationnelles" accent="var(--purple)">
                <div className="g2" style={{gap:8}}>
                  {[
                    {l:"Max trades/jour",v:plan.max_trades_day},
                    {l:"R:R minimum",v:plan.min_rr+"R"},
                    {l:"Drawdown max",v:plan.max_dd+"%"},
                    {l:"Risque/trade",v:plan.risk_pct+"%"},
                  ].map(x=>(
                    <div key={x.l} style={{background:"var(--s2)",borderRadius:6,padding:"9px 12px"}}>
                      <div style={{fontSize:11,color:"var(--muted2)",fontWeight:600,textTransform:"uppercase",letterSpacing:".6px",marginBottom:3}}>{x.l}</div>
                      <div className="mono" style={{fontWeight:700,color:"var(--purple)",fontSize:15}}>{x.v}</div>
                    </div>
                  ))}
                </div>
              </Block>
            </div>
          </div>

          {/* Règles */}
          <Block title="📜 Règles Fondamentales" accent="var(--green)">
            <div className="g2">
              {plan.rules.map((r,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"8px 12px",background:"var(--s2)",borderRadius:"var(--r)",alignItems:"flex-start"}}>
                  <span style={{color:"var(--green)",fontWeight:700,flexShrink:0}}>✓</span>
                  <span style={{fontSize:13,color:"var(--muted2)",lineHeight:1.5}}>{r}</span>
                </div>
              ))}
            </div>
          </Block>

          {/* Règles émotionnelles */}
          <Block title="🧠 Gestion Émotionnelle — INTERDIT" accent="var(--red)">
            <div className="g2">
              {plan.emotion_rules.map((r,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"8px 12px",background:"var(--s2)",borderRadius:"var(--r)",alignItems:"flex-start"}}>
                  <span style={{color:"var(--red)",fontWeight:700,flexShrink:0}}>✗</span>
                  <span style={{fontSize:13,color:"var(--muted2)",lineHeight:1.5}}>{r}</span>
                </div>
              ))}
            </div>
          </Block>
        </>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{fontSize:13,color:"var(--muted2)",lineHeight:1.5,marginBottom:8}}>
            Voici les stratégies de trading les plus efficaces et reconnues. Cliquez sur <b>"Ajouter au Plan"</b> pour les intégrer instantanément dans votre liste de setups autorisés.
          </div>
          <div className="g2" style={{gap:14}}>
            {GUIDES.map((g,i)=>(
              <div key={i} className="card" style={{display:"flex",flexDirection:"column",justifyContent:"space-between",border:"1px solid var(--border)",background:"var(--s2)",padding:16}}>
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <span style={{fontWeight:800,fontSize:14,color:"var(--gold)"}}>{g.name}</span>
                    <span style={{fontSize:10,background:"var(--bg)",padding:"2px 8px",borderRadius:4,color:"var(--muted2)"}}>{g.market}</span>
                  </div>
                  <p style={{fontSize:12,fontWeight:700,marginBottom:8,color:"var(--text)"}}>{g.desc}</p>
                  <p style={{fontSize:12,color:"var(--muted2)",lineHeight:1.4,marginBottom:12,background:"var(--bg)",padding:8,borderRadius:4}}>{g.detail}</p>
                  <div style={{display:"flex",gap:12,fontSize:11,color:"var(--muted2)",marginBottom:14}}>
                    <span>Winrate: <b style={{color:"var(--green)"}}>{g.winrate}</b></span>
                    <span>R:R Moyen: <b style={{color:"var(--gold)"}}>{g.rr}</b></span>
                  </div>
                </div>
                <button className="btn-gold btn-sm" style={{width:"100%",justifyContent:"center"}} onClick={()=>addStrategyToPlan(g)}>
                  ➕ Ajouter ce setup à mon Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Notification Toast */}
      {notif && (
        <div style={{
          position:"fixed",
          bottom:24,
          right:24,
          background:"var(--gold)",
          color:"#000",
          padding:"12px 20px",
          borderRadius:"var(--r)",
          fontWeight:700,
          fontSize:13,
          zIndex:1000,
          boxShadow:"0 8px 24px rgba(0,0,0,0.5)",
          display:"flex",
          alignItems:"center",
          gap:8
        }}>
          <span>✓</span>
          <span>{notif}</span>
        </div>
      )}
    </div>
  );
}

/* ─── ANALYSE & MONTE CARLO ─────────────────────────────────────────────────── */
function Analyse({trades, plan}){
  const [monteCarlo, setMonteCarlo] = useState(null);
  const [simParams, setSimParams] = useState({runs: 50, tradesCount: 50});

  const grp=(key)=>{
    const m={};
    trades.forEach(t=>{
      const k=t[key]||"—";
      if(!m[k]) m[k]={pnl:0,n:0,w:0,l:0};
      m[k].n++;m[k].pnl+=t.pnl||0;
      if(t.status==="WIN")m[k].w++;
      if(t.status==="LOSS")m[k].l++;
    });
    return m;
  };

  const Table=({title,data,accent})=>(
    <div className="card" style={{borderTop:`2px solid ${accent}`}}>
      <div style={{fontWeight:700,fontSize:13,color:accent,marginBottom:12}}>{title}</div>
      <table>
        <thead><tr><th>Nom</th><th>Trades</th><th>Win%</th><th>PnL</th></tr></thead>
        <tbody>
          {Object.entries(data).sort((a,b)=>b[1].pnl-a[1].pnl).map(([name,d])=>(
            <tr key={name}>
              <td style={{fontWeight:600}}>{name}</td>
              <td style={{color:"var(--muted2)"}}>{d.n}</td>
              <td>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div className="progress" style={{width:40}}>
                    <div className="progress-fill" style={{width:(d.w/d.n*100)+"%",background:d.w/d.n>=.5?"var(--green)":"var(--red)"}}/>
                  </div>
                  <span className="mono" style={{fontSize:12}}>{(d.w/d.n*100).toFixed(0)}%</span>
                </div>
              </td>
              <td className="mono" style={{fontWeight:700,color:colorPnl(d.pnl),fontSize:13}}>{fPnl(d.pnl)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const sorted=[...trades].filter(t=>t.pnl!==undefined).sort((a,b)=>b.pnl-a.pnl);

  const valid=trades.filter(t=>t.status!=="OPEN");
  const wins=valid.filter(t=>t.status==="WIN");
  const losses=valid.filter(t=>t.status==="LOSS");
  const wr=valid.length?wins.length/valid.length:0;
  const avgRR=trades.filter(t=>t.rr>0).reduce((s,t)=>s+t.rr,0)/Math.max(1,trades.filter(t=>t.rr>0).length);
  const disciplinePct=trades.length?trades.filter(t=>t.rule_respected!==false).length/trades.length*100:100;

  const avgWin=wins.length?wins.reduce((s,t)=>s+t.pnl,0)/wins.length:0;
  const avgLoss=losses.length?Math.abs(losses.reduce((s,t)=>s+t.pnl,0)/losses.length):1;

  // Expectancy calculation
  const expectancy = (wr * avgWin) - ((1 - wr) * avgLoss);

  // Score global
  const scoreEdge=Math.min(100,wr*100+avgRR*10);
  const scoreDiscipline=disciplinePct;
  const scoreGlobal=(scoreEdge*0.5+scoreDiscipline*0.5);

  // Performance by weekday
  const getWeekdayStats = () => {
    const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const stats = {};
    trades.forEach(t => {
      if(!t.date) return;
      const dayIndex = new Date(t.date).getDay();
      const dayName = days[dayIndex];
      if(!stats[dayName]) stats[dayName] = {pnl: 0, n: 0, w: 0};
      stats[dayName].n++;
      stats[dayName].pnl += t.pnl || 0;
      if(t.status === "WIN") stats[dayName].w++;
    });
    return stats;
  };

  // Run Monte Carlo simulation
  const runSimulation = () => {
    const cap = plan.capital;
    const wrPct = wr * 100 || 50;
    const wAmt = avgWin || 200;
    const lAmt = avgLoss || 150;
    const {runs, tradesCount} = simParams;

    const paths = [];
    let successCount = 0;
    let ruinCount = 0;
    let totalMaxDd = 0;

    for (let s = 0; s < runs; s++) {
      const path = [cap];
      let current = cap;
      let peak = cap;
      let maxDd = 0;
      
      for (let t = 0; t < tradesCount; t++) {
        const isWin = Math.random() * 100 < wrPct;
        const change = isWin ? wAmt : -lAmt;
        current += change;
        
        if (current > peak) peak = current;
        const dd = ((peak - current) / peak) * 100;
        if (dd > maxDd) maxDd = dd;
        path.push(current);
      }
      paths.push(path);
      totalMaxDd += maxDd;
      if (current >= cap * 1.10) successCount++;
      if (current <= cap * 0.90) ruinCount++;
    }

    setMonteCarlo({
      paths,
      avgMaxDd: totalMaxDd / runs,
      probSuccess: (successCount / runs) * 100,
      probRuin: (ruinCount / runs) * 100,
    });
  };

  return(
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:16}}>

      {/* Équation de Rentabilité */}
      <div className="card" style={{borderTop:"2px solid var(--gold)"}}>
        <div style={{fontWeight:700,fontSize:14,color:"var(--gold)",marginBottom:16}}>📊 Équation de Rentabilité & Statut</div>
        <div className="g4" style={{marginBottom:16}}>
          {[
            {l:"Win Rate",v:f2(wr*100)+"%",c:wr>=0.5?"var(--green)":"var(--red)",target:"≥ 50%"},
            {l:"R:R Moyen",v:f2(avgRR)+"R",c:avgRR>=1.5?"var(--green)":"var(--red)",target:"≥ 1.5R"},
            {l:"Espérance / trade",v:fPnl(expectancy),c:expectancy>0?"var(--green)":"var(--red)",target:"> $0.00"},
            {l:"Score Global",v:f2(scoreGlobal)+"/100",c:scoreGlobal>=65?"var(--green)":scoreGlobal>=45?"var(--yellow)":"var(--red)",target:"≥ 65"},
          ].map(x=>(
            <div key={x.l} style={{background:"var(--s2)",borderRadius:"var(--r)",padding:"13px 15px"}}>
              <div style={{fontSize:11,color:"var(--muted2)",fontWeight:600,textTransform:"uppercase",letterSpacing:".6px",marginBottom:6}}>{x.l}</div>
              <div className="mono" style={{fontWeight:700,color:x.c,fontSize:20,marginBottom:3}}>{x.v}</div>
              <div style={{fontSize:11,color:"var(--muted2)"}}>Cible : {x.target}</div>
            </div>
          ))}
        </div>
        <div style={{padding:"12px 16px",background:"var(--s2)",borderRadius:"var(--r)",borderLeft:"3px solid var(--gold)",fontSize:13,color:"var(--muted2)",lineHeight:1.7}}>
          <b style={{color:"var(--text)"}}>Diagnostic :</b> L'espérance mathématique montre le montant moyen gagné par trade. 
          {expectancy > 0 
            ? <span style={{color:"var(--green)"}}> Votre stratégie dispose d'un avantage statistique positif ({fPnl(expectancy)}/trade).</span>
            : <span style={{color:"var(--red)"}}> Votre espérance est négative ({fPnl(expectancy)}/trade). Ajustez vos ratios ou votre taux de réussite.</span>
          }
        </div>
      </div>

      {/* Monte Carlo Simulator */}
      <div className="card" style={{borderTop: "2px solid var(--purple)"}}>
        <div style={{fontWeight: 700, fontSize: 14, color: "var(--purple)", marginBottom: 12}}>🧪 Simulateur de Monte Carlo (Probabilités futures)</div>
        <div className="g3" style={{marginBottom: 14}}>
          <div>
            <label className="lbl">Nombre de Simulations</label>
            <input type="number" value={simParams.runs} onChange={e => setSimParams(p => ({...p, runs: +e.target.value}))}/>
          </div>
          <div>
            <label className="lbl">Nombre de trades futurs</label>
            <input type="number" value={simParams.tradesCount} onChange={e => setSimParams(p => ({...p, tradesCount: +e.target.value}))}/>
          </div>
          <div style={{display: "flex", alignItems: "flex-end"}}>
            <button className="btn-gold" style={{width: "100%", background: "var(--purple)", color: "#fff"}} onClick={runSimulation}>🎲 Lancer Simulation</button>
          </div>
        </div>

        {monteCarlo && (
          <div className="g2" style={{gap: 16}}>
            <div style={{background: "var(--s2)", padding: 16, borderRadius: "var(--r)", display: "flex", flexDirection: "column", gap: 8}}>
              <div style={{fontSize: 12, color: "var(--muted2)"}}>RÉSULTATS STATISTIQUES (Sur {simParams.runs} parcours)</div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span>Drawdown Max Moyen :</span>
                <span className="mono" style={{fontWeight: 700, color: "var(--red)"}}>{f2(monteCarlo.avgMaxDd)}%</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span>Probabilité de Gain (+10%) :</span>
                <span className="mono" style={{fontWeight: 700, color: "var(--green)"}}>{f2(monteCarlo.probSuccess)}%</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span>Probabilité de Ruine / DD (-10%) :</span>
                <span className="mono" style={{fontWeight: 700, color: "var(--red)"}}>{f2(monteCarlo.probRuin)}%</span>
              </div>
              <p style={{fontSize: 11, color: "var(--muted2)", marginTop: 8}}>
                * La probabilité de ruine indique la part des simulations qui ont touché -10% avant la fin de la série.
              </p>
            </div>
            
            {/* Visual simulation chart */}
            <div style={{background: "var(--s2)", padding: 10, borderRadius: "var(--r)", minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center"}}>
              <svg width="100%" height="150" viewBox="0 0 300 150" style={{overflow: "visible"}}>
                {monteCarlo.paths.map((p, pIdx) => {
                  const pts = p.map((val, tIdx) => {
                    const x = (tIdx / simParams.tradesCount) * 300;
                    // scale capital from cap*0.80 to cap*1.20
                    const y = 150 - ((val - plan.capital * 0.8) / (plan.capital * 0.4)) * 150;
                    return `${x},${y}`;
                  }).join(" ");
                  return (
                    <polyline key={pIdx} fill="none" stroke="var(--purple)" strokeWidth="0.5" opacity="0.15" points={pts} />
                  );
                })}
                {/* Mid line (Initial capital) */}
                <line x1="0" y1="75" x2="300" y2="75" stroke="var(--border2)" strokeDasharray="3,3" />
                <text x="5" y="70" fill="var(--muted2)" fontSize="9" className="mono">Départ</text>
                <text x="5" y="20" fill="var(--green)" fontSize="9" className="mono">+20%</text>
                <text x="5" y="140" fill="var(--red)" fontSize="9" className="mono">-20%</text>
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="g2">
        <Table title="💹 Par Symbole" data={grp("symbol")} accent="var(--blue)"/>
        <Table title="🎭 Impact des Émotions" data={grp("emotion")} accent="var(--purple)"/>
      </div>
      
      <div className="g2">
        <Table title="📐 Par Setup" data={grp("setup")} accent="var(--gold)"/>
        <Table title="📅 Par Jour de la semaine" data={getWeekdayStats()} accent="var(--orange)"/>
      </div>

      {/* Meilleurs/pires */}
      <div className="g2">
        <div className="card" style={{borderTop:"2px solid var(--green)"}}>
          <div style={{fontWeight:700,fontSize:13,color:"var(--green)",marginBottom:12}}>🏆 Top 5 Meilleurs Trades</div>
          {sorted.slice(0,5).map(t=>(
            <div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",background:"#00C89608",borderRadius:"var(--r)",marginBottom:5}}>
              <span style={{fontWeight:700,fontSize:13}}>{t.symbol}</span>
              <span style={{color:"var(--muted2)",fontSize:12}}>{t.date} · {t.setup}</span>
              <span className="mono" style={{fontWeight:700,color:"var(--green)"}}>{fPnl(t.pnl)}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{borderTop:"2px solid var(--red)"}}>
          <div style={{fontWeight:700,fontSize:13,color:"var(--red)",marginBottom:12}}>📉 Top 5 Pires Trades</div>
          {sorted.slice(-5).reverse().map(t=>(
            <div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",background:"#E8455A08",borderRadius:"var(--r)",marginBottom:5}}>
              <span style={{fontWeight:700,fontSize:13}}>{t.symbol}</span>
              <span style={{color:"var(--muted2)",fontSize:12}}>{t.date} · {t.setup} {t.rule_respected===false?"⚠️":""}</span>
              <span className="mono" style={{fontWeight:700,color:"var(--red)"}}>{fPnl(t.pnl)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CALCULATEUR & CONFLUENCE SIZER ─────────────────────────────────────────── */
function Calculator({plan}){
  const [capital,setCapital]=useState(plan.capital);
  const [riskPct,setRiskPct]=useState(plan.risk_pct);
  const [entry,setEntry]=useState("");
  const [sl,setSl]=useState("");
  const [tp,setTp]=useState("");
  const [instrument,setInstrument]=useState("GOLD");

  // Confluences checkboxes state
  const [confluences, setConfluences] = useState({
    htfBos: false,
    obZone: false,
    fvgM15: false,
    sweep: false,
    sessionOverlap: false,
    noNews: false
  });

  const toggleConf = (k) => {
    setConfluences(p => ({...p, [k]: !p[k]}));
  };

  const INSTRUMENTS={
    "GOLD":{pip:0.1,pipVal:1,unit:"$/point",label:"Or (XAU/USD)"},
    "EUR/USD":{pip:0.0001,pipVal:10,unit:"$/pip (lot std)",label:"EUR/USD"},
    "NAS100":{pip:1,pipVal:1,unit:"$/point",label:"Nasdaq 100"},
    "BTC/USD":{pip:1,pipVal:1,unit:"$/point",label:"Bitcoin"},
    "GBP/USD":{pip:0.0001,pipVal:10,unit:"$/pip (lot std)",label:"GBP/USD"},
  };

  const inst=INSTRUMENTS[instrument]||INSTRUMENTS["GOLD"];
  
  // Calculate dynamic risk percentage based on confluence score
  const score = Object.values(confluences).filter(Boolean).length;
  let dynamicRiskPct = riskPct;
  let sizingMessage = "";
  let sizerColor = "var(--gold)";

  if (score === 6) {
    dynamicRiskPct = riskPct; 
    sizingMessage = "🔥 Signal Fort (6/6 confluences) : Risque maximal autorisé (100%)";
    sizerColor = "var(--green)";
  } else if (score >= 4) {
    dynamicRiskPct = riskPct * 0.75;
    sizingMessage = "⚡ Signal Moyen (4-5/6 confluences) : Risque réduit à 75%";
    sizerColor = "var(--yellow)";
  } else if (score >= 3) {
    dynamicRiskPct = riskPct * 0.50;
    sizingMessage = "⚠️ Signal Faible (3/6 confluences) : Risque réduit de moitié (50%)";
    sizerColor = "var(--orange)";
  } else {
    dynamicRiskPct = 0;
    sizingMessage = "🚫 Confluences insuffisantes (<3) : Trade NON recommandé (Risque 0%)";
    sizerColor = "var(--red)";
  }

  const riskAmt=capital*dynamicRiskPct/100;
  const e=+entry,s=+sl,t=+tp;
  const slPips=e&&s?Math.abs(e-s)/inst.pip:0;
  const tpPips=e&&t?Math.abs(t-e)/inst.pip:0;
  const rr=slPips>0&&tpPips>0?tpPips/slPips:0;
  const lotSize=slPips>0&&riskAmt>0?(riskAmt/(slPips*inst.pipVal)):0;
  const potGain=lotSize*tpPips*inst.pipVal;

  return(
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:16}}>
      <div>
        <h2 style={{fontWeight:800,fontSize:18}}>🧮 Calculateur de Sizing & Confluences</h2>
        <p style={{color:"var(--muted2)",fontSize:13,marginTop:4}}>Évaluez vos confluences techniques pour adapter automatiquement votre risque</p>
      </div>

      <div className="g2">
        {/* Paramètres techniques */}
        <div className="card">
          <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Paramètres Techniques</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div>
              <label className="lbl">Instrument</label>
              <select value={instrument} onChange={e=>setInstrument(e.target.value)}>
                {Object.entries(INSTRUMENTS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div className="g2" style={{gap:10}}>
              <div>
                <label className="lbl">Capital ($)</label>
                <input type="number" value={capital} onChange={e=>setCapital(+e.target.value)}/>
              </div>
              <div>
                <label className="lbl">Risque de base (%)</label>
                <input type="number" value={riskPct} step="0.1" onChange={e=>setRiskPct(+e.target.value)}/>
              </div>
            </div>
            <div className="g3" style={{gap:10}}>
              <div>
                <label className="lbl">Entrée</label>
                <input type="number" value={entry} step="any" placeholder="0.00" onChange={e=>setEntry(e.target.value)}/>
              </div>
              <div>
                <label className="lbl">Stop Loss</label>
                <input type="number" value={sl} step="any" placeholder="0.00" onChange={e=>setSl(e.target.value)}/>
              </div>
              <div>
                <label className="lbl">Take Profit</label>
                <input type="number" value={tp} step="any" placeholder="0.00" onChange={e=>setTp(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>

        {/* Confluences Checklist */}
        <div className="card">
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Checklist Confluences (Sizing Dynamique)</div>
          <div style={{display: "flex", flexDirection: "column", gap: 8}}>
            {[
              {k: "htfBos", l: "Structure HTF alignée (BOS H4/Daily)"},
              {k: "obZone", l: "Prix dans un Order Block H1 / M15"},
              {k: "fvgM15", l: "Fair Value Gap (FVG) validé sur M15"},
              {k: "sweep", l: "Balayage de liquidité (Sweep Buy/Sell)"},
              {k: "sessionOverlap", l: "Timing optimal (Session Londres / NY)"},
              {k: "noNews", l: "Aucune annonce majeure CPI/Fed (±30 min)"}
            ].map(item => (
              <div key={item.k} onClick={() => toggleConf(item.k)} style={{
                display:"flex",gap:10,padding:"8px 12px",background:"var(--s2)",borderRadius:"var(--r)",cursor:"pointer",
                opacity:confluences[item.k] ? 1 : 0.6, border: `1px solid ${confluences[item.k] ? "var(--gold)" : "var(--border)"}`
              }}>
                <div style={{
                  width:18,height:18,borderRadius:4,border:`2px solid ${confluences[item.k] ? "var(--gold)":"var(--border2)"}`,
                  background:confluences[item.k] ? "var(--gold)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"
                }}>
                  {confluences[item.k] && <span style={{color:"#000",fontWeight:800,fontSize:11}}>✓</span>}
                </div>
                <span style={{fontSize:13,color:"var(--text)"}}>{item.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="card" style={{borderTop:`2px solid ${sizerColor}`}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16}}>
          <span style={{fontWeight:700,fontSize:13,color:sizerColor}}>Sizing Recommandé</span>
          <span className="mono" style={{fontWeight: 700, color: sizerColor, fontSize: 13}}>{score}/6 Confluences</span>
        </div>

        <div style={{padding: "10px 14px", background: "var(--s2)", borderRadius: "var(--r)", borderLeft: `3px solid ${sizerColor}`, marginBottom: 12, fontSize: 13, fontWeight: 700, color: sizerColor}}>
          {sizingMessage}
        </div>

        <div className="g3" style={{gap: 12}}>
          {[
            {l:"Risque appliqué",v:f2(dynamicRiskPct)+"%",c:"var(--yellow)"},
            {l:"Montant risqué",v:"$"+f2(riskAmt),c:riskAmt>0?"var(--text)":"var(--muted)"},
            {l:"Distance SL",v:slPips>0?f2(slPips)+" pips":"—",c:"var(--red)"},
            {l:"Ratio R:R",v:rr>0?f2(rr)+"R":"—",c:rr>=1.5?"var(--green)":"var(--red)"},
            {l:"Taille de position",v:lotSize>0?f2(lotSize)+" lots":"—",c:sizerColor},
            {l:"Gain potentiel",v:potGain>0?"+$"+f2(potGain):"—",c:"var(--green)"},
          ].map(x=>(
            <div key={x.l} style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"10px 14px",background:"var(--s2)",borderRadius:"var(--r)"}}>
              <span style={{fontSize:11,color:"var(--muted2)",marginBottom:4}}>{x.l}</span>
              <span className="mono" style={{fontWeight:700,color:x.c,fontSize:16}}>{x.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── BACKTESTING TRACKER ─────────────────────────────────────────────────── */
function BacktestTracker({backtests, onAddSession, onDeleteSession}){
  const [f, setF] = useState({strategy: "", date: new Date().toISOString().slice(0, 10), pair: "GOLD", tradesCount: "", winRate: "", pnl: "", notes: ""});
  const set = (k, v) => setF(p => ({...p, [k]: v}));

  const save = () => {
    if(!f.strategy || !f.tradesCount || !f.pnl) return;
    onAddSession({...f, tradesCount: +f.tradesCount, winRate: +f.winRate || 0, pnl: +f.pnl, id: Date.now()});
    setF({strategy: "", date: new Date().toISOString().slice(0, 10), pair: "GOLD", tradesCount: "", winRate: "", pnl: "", notes: ""});
  };

  const totalBtTrades = backtests.reduce((acc, b) => acc + b.tradesCount, 0);
  const avgBtWinrate = backtests.length ? backtests.reduce((acc, b) => acc + b.winRate, 0) / backtests.length : 0;
  const totalBtPnl = backtests.reduce((acc, b) => acc + b.pnl, 0);

  return (
    <div className="fade" style={{display: "flex", flexDirection: "column", gap: 16}}>
      <div>
        <h2 style={{fontWeight: 800, fontSize: 18}}>🧪 Backtesting Tracker</h2>
        <p style={{color: "var(--muted2)", fontSize: 13, marginTop: 4}}>Enregistrez vos simulations historiques pour valider l'avantage de votre stratégie</p>
      </div>

      <div className="g3">
        <Tile label="Sessions testées" value={backtests.length} sub={`${totalBtTrades} positions`} accent="var(--purple)" icon="🔬"/>
        <Tile label="WinRate Moyen (BT)" value={f2(avgBtWinrate)+"%"} sub="Sur toutes les séries" accent={avgBtWinrate>=50?"var(--green)":"var(--red)"} icon="🎯"/>
        <Tile label="PnL Backtest Cumulé" value={fPnl(totalBtPnl)} sub="Performance simulée" accent={totalBtPnl>=0?"var(--green)":"var(--red)"} icon="📊"/>
      </div>

      <div className="g2">
        {/* Ajouter une session */}
        <div className="card">
          <div style={{fontWeight: 700, fontSize: 13, marginBottom: 12}}>+ Enregistrer une Session</div>
          <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <div className="g2" style={{gap: 10}}>
              <div>
                <label className="lbl">Stratégie / Setup</label>
                <input value={f.strategy} onChange={e => set("strategy", e.target.value)} placeholder="ex: FVG Retest M15"/>
              </div>
              <div>
                <label className="lbl">Date</label>
                <input type="date" value={f.date} onChange={e => set("date", e.target.value)}/>
              </div>
            </div>
            <div className="g4" style={{gap: 8}}>
              <div>
                <label className="lbl">Paire</label>
                <input value={f.pair} onChange={e => set("pair", e.target.value)}/>
              </div>
              <div>
                <label className="lbl">Nb Trades</label>
                <input type="number" value={f.tradesCount} onChange={e => set("tradesCount", e.target.value)}/>
              </div>
              <div>
                <label className="lbl">Win Rate (%)</label>
                <input type="number" value={f.winRate} onChange={e => set("winRate", e.target.value)}/>
              </div>
              <div>
                <label className="lbl">PnL ($)</label>
                <input type="number" value={f.pnl} onChange={e => set("pnl", e.target.value)}/>
              </div>
            </div>
            <div>
              <label className="lbl">Notes de session</label>
              <textarea value={f.notes} onChange={e => set("notes", e.target.value)} rows={2} placeholder="Observations sur les spreads, les faux-signaux..."/>
            </div>
            <button className="btn-gold" style={{background: "var(--purple)", color: "#fff", marginTop: 6}} onClick={save}>💾 Enregistrer la Session</button>
          </div>
        </div>

        {/* Historique des sessions */}
        <div className="card">
          <div style={{fontWeight: 700, fontSize: 13, marginBottom: 12}}>Historique des Backtests</div>
          <div style={{overflowX: "auto"}}>
            <table>
              <thead>
                <tr>
                  <th>Stratégie</th>
                  <th>Paire</th>
                  <th>Trades</th>
                  <th>Win%</th>
                  <th>PnL</th>
                  <th>Act.</th>
                </tr>
              </thead>
              <tbody>
                {backtests.length === 0 && (
                  <tr><td colSpan={6} style={{textAlign:"center",color:"var(--muted)",padding:20}}>Aucun backtest enregistré</td></tr>
                )}
                {backtests.map(b => (
                  <tr key={b.id}>
                    <td style={{fontWeight: 600}}>{b.strategy}</td>
                    <td className="mono">{b.pair}</td>
                    <td>{b.tradesCount}</td>
                    <td className="mono" style={{color: b.winRate>=50?"var(--green)":"var(--red)"}}>{b.winRate}%</td>
                    <td className="mono" style={{fontWeight: 700, color: colorPnl(b.pnl)}}>{fPnl(b.pnl)}</td>
                    <td>
                      <button className="btn-red" onClick={() => onDeleteSession(b.id)}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PRÉPARATION MATINALE (MINDSET TRACKER) ────────────────────────────────── */
function MindsetTracker({logs, onAddLog, onDeleteLog}){
  const [f, setF] = useState({date: new Date().toISOString().slice(0, 10), sleep: 7, energy: 7, focus: 7, stress: 3, newsChecked: false, checklistCompleted: false, notes: ""});
  const set = (k, v) => setF(p => ({...p, [k]: v}));

  const save = () => {
    onAddLog({...f, sleep: +f.sleep, energy: +f.energy, focus: +f.focus, stress: +f.stress, id: Date.now()});
    setF({date: new Date().toISOString().slice(0, 10), sleep: 7, energy: 7, focus: 7, stress: 3, newsChecked: false, checklistCompleted: false, notes: ""});
  };

  return (
    <div className="fade" style={{display: "flex", flexDirection: "column", gap: 16}}>
      <div>
        <h2 style={{fontWeight: 800, fontSize: 18}}>🧠 Mindset Tracker & Préparation</h2>
        <p style={{color: "var(--muted2)", fontSize: 13, marginTop: 4}}>Loggez votre état d'esprit quotidien avant de commencer à trader pour identifier vos barrières psychologiques</p>
      </div>

      <div className="g2">
        {/* Nouveau log */}
        <div className="card">
          <div style={{fontWeight: 700, fontSize: 13, marginBottom: 12}}>+ Routine Pré-Session</div>
          <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <div>
              <label className="lbl">Date</label>
              <input type="date" value={f.date} onChange={e => set("date", e.target.value)}/>
            </div>
            
            {/* Sliders d'état mental */}
            {[
              {l: "Qualité du Sommeil", k: "sleep", min: 1, max: 10},
              {l: "Niveau d'Énergie", k: "energy", min: 1, max: 10},
              {l: "Focus / Concentration", k: "focus", min: 1, max: 10},
              {l: "Niveau de Stress / Anxiété", k: "stress", min: 1, max: 10}
            ].map(item => (
              <div key={item.k}>
                <div style={{display: "flex", justifycontent: "space-between"}}>
                  <label className="lbl">{item.l}</label>
                  <span className="mono" style={{fontSize: 12, fontWeight: 700, color: "var(--gold)"}}>{f[item.k]}/10</span>
                </div>
                <input type="range" min={item.min} max={item.max} value={f[item.k]} onChange={e => set(item.k, +e.target.value)}/>
              </div>
            ))}

            {/* Checklists */}
            <div style={{display: "flex", gap: 12, marginTop: 4}}>
              <div onClick={() => set("newsChecked", !f.newsChecked)} style={{
                flex: 1, display: "flex", gap: 8, padding: 10, background: "var(--s2)", borderRadius: "var(--r)", cursor: "pointer",
                border: `1px solid ${f.newsChecked ? "var(--green)" : "var(--border)"}`, opacity: f.newsChecked ? 1 : 0.6
              }}>
                <span style={{fontSize: 14}}>{f.newsChecked ? "✅" : "❌"}</span>
                <span style={{fontSize: 12, fontWeight: 600}}>News Calendrier Vérifié</span>
              </div>
              <div onClick={() => set("checklistCompleted", !f.checklistCompleted)} style={{
                flex: 1, display: "flex", gap: 8, padding: 10, background: "var(--s2)", borderRadius: "var(--r)", cursor: "pointer",
                border: `1px solid ${f.checklistCompleted ? "var(--green)" : "var(--border)"}`, opacity: f.checklistCompleted ? 1 : 0.6
              }}>
                <span style={{fontSize: 14}}>{f.checklistCompleted ? "✅" : "❌"}</span>
                <span style={{fontSize: 12, fontWeight: 600}}>Checklist Pré-trade Prête</span>
              </div>
            </div>

            <div style={{marginTop: 8}}>
              <label className="lbl">Focus du jour & Rappel psychologique</label>
              <textarea value={f.notes} onChange={e => set("notes", e.target.value)} rows={2} placeholder="ex: Rester discipliné. Ne pas trader en dehors de la session New York."/>
            </div>
            
            <button className="btn-gold" style={{marginTop: 6}} onClick={save}>💾 Valider la Routine</button>
          </div>
        </div>

        {/* Historique des états d'esprit */}
        <div className="card">
          <div style={{fontWeight: 700, fontSize: 13, marginBottom: 12}}>Logs des sessions précédentes</div>
          <div style={{display: "flex", flexDirection: "column", gap: 8, maxHeight: 420, overflowY: "auto"}}>
            {logs.length === 0 && (
              <p style={{color: "var(--muted)", textAlign: "center", padding: 20}}>Aucun log de préparation disponible</p>
            )}
            {logs.map(l => (
              <div key={l.id} style={{padding: 12, background: "var(--s2)", borderRadius: "var(--r)", borderLeft: "3px solid var(--gold)"}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 6}}>
                  <span className="mono" style={{fontWeight: 700, fontSize: 12}}>{l.date}</span>
                  <button className="btn-red" style={{padding: "2px 6px"}} onClick={() => onDeleteLog(l.id)}>🗑</button>
                </div>
                <div className="g4" style={{gap: 6, marginBottom: 6}}>
                  <div style={{fontSize: 11, color: "var(--muted2)"}}>Sommeil: <b style={{color:"var(--text)"}}>{l.sleep}/10</b></div>
                  <div style={{fontSize: 11, color: "var(--muted2)"}}>Énergie: <b style={{color:"var(--text)"}}>{l.energy}/10</b></div>
                  <div style={{fontSize: 11, color: "var(--muted2)"}}>Focus: <b style={{color:"var(--text)"}}>{l.focus}/10</b></div>
                  <div style={{fontSize: 11, color: "var(--muted2)"}}>Stress: <b style={{color:"var(--red)"}}>{l.stress}/10</b></div>
                </div>
                <p style={{fontSize: 12, color: "var(--muted2)", fontStyle: "italic"}}>{l.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────────────── */
export default function App(){
  const [tab,setTab]=useState("dashboard");

  // Load state from localStorage or fallback to default lists
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem("tv_accounts");
    return saved ? JSON.parse(saved) : ACCOUNTS0;
  });

  const [currentAccountId, setCurrentAccountId] = useState(() => {
    const saved = localStorage.getItem("tv_curr_acc");
    return saved ? JSON.parse(saved) : "acc-1";
  });

  const [trades,setTrades]=useState(() => {
    const saved = localStorage.getItem("tv_trades");
    return saved ? JSON.parse(saved) : TRADES0;
  });

  const [plans,setPlans]=useState(() => {
    const saved = localStorage.getItem("tv_plans");
    return saved ? JSON.parse(saved) : PLANS0;
  });

  const [backtests, setBacktests] = useState(() => {
    const saved = localStorage.getItem("tv_backtests");
    return saved ? JSON.parse(saved) : BACKTESTS0;
  });

  const [mindsetLogs, setMindsetLogs] = useState(() => {
    const saved = localStorage.getItem("tv_mindsets");
    return saved ? JSON.parse(saved) : MINDSETS0;
  });

  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);

  // Persist state to localStorage on modification
  useEffect(() => {
    localStorage.setItem("tv_accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("tv_curr_acc", JSON.stringify(currentAccountId));
  }, [currentAccountId]);

  useEffect(() => {
    localStorage.setItem("tv_trades", JSON.stringify(trades));
  }, [trades]);

  useEffect(() => {
    localStorage.setItem("tv_plans", JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem("tv_backtests", JSON.stringify(backtests));
  }, [backtests]);

  useEffect(() => {
    localStorage.setItem("tv_mindsets", JSON.stringify(mindsetLogs));
  }, [mindsetLogs]);

  // Handle Multi-Account creation
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [newAccName, setNewAccName] = useState("");
  const [newAccCap, setNewAccCap] = useState("");

  const addAccount = () => {
    if(!newAccName || !newAccCap) return;
    const newId = `acc-${Date.now()}`;
    const newAcc = {id: newId, name: newAccName, capital: +newAccCap};
    setAccounts(p => [...p, newAcc]);
    setPlans(p => ({
      ...p,
      [newId]: {
        strategy: "Stratégie Par Défaut",
        capital: +newAccCap,
        risk_pct: 1.0,
        max_loss_day: 3,
        max_dd: 10,
        monthly_goal: 7,
        max_trades_day: 2,
        min_rr: 1.5,
        sessions: ["London", "New York", "Overlap"],
        pairs: ["GOLD"],
        setups: [{name: "FVG", desc: "Fair Value Gap", active: true}],
        rules: ["Définir SL + TP avant entrée"],
        emotion_rules: ["FOMO interdit"]
      }
    }));
    setCurrentAccountId(newId);
    setNewAccName("");
    setNewAccCap("");
    setShowAccountModal(false);
  };

  const confirmDeleteAccount = () => {
    if(!accountToDelete) return;
    const accId = accountToDelete.id;
    if(accounts.length <= 1) {
      setAccountToDelete(null);
      return;
    }
    setAccounts(p => p.filter(a => a.id !== accId));
    setTrades(p => p.filter(t => t.accountId !== accId));
    const updatedPlans = {...plans};
    delete updatedPlans[accId];
    setPlans(updatedPlans);
    setCurrentAccountId(accounts.find(a => a.id !== accId).id);
    setAccountToDelete(null);
  };

  // Filter items by current account
  const accountTrades = trades.filter(t => t.accountId === currentAccountId);
  const accountPlan = plans[currentAccountId] || PLANS0["acc-1"];

  const TABS=[
    {id:"dashboard",icon:"📊",label:"Tableau de Bord"},
    {id:"journal",icon:"📓",label:"Journal"},
    {id:"plan",icon:"📋",label:"Plan de Trading"},
    {id:"analyse",icon:"🔬",label:"Analyse"},
    {id:"calc",icon:"🧮",label:"Calculateur"},
    {id:"backtest",icon:"🧪",label:"Backtesting"},
    {id:"prepa",icon:"🧠",label:"Préparation"},
  ];

  const totalPnl=accountTrades.reduce((s,t)=>s+(t.pnl||0),0);

  return(
    <>
      <style>{G}</style>
      <div className="app-container">

        {/* SIDEBAR NAVIGATION */}
        <aside className="sidebar">
          {/* Logo / Title */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
            <div style={{width:32,height:32,background:"linear-gradient(135deg,var(--gold),var(--orange))",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>📈</div>
            <div>
              <div style={{fontWeight:800,fontSize:16,lineHeight:1}}>TradingVault</div>
              <div style={{fontSize:10,color:"var(--muted2)",letterSpacing:".5px",fontFamily:"var(--mono)",marginTop:3}}>v2.0 · GOLD FOCUS</div>
            </div>
          </div>

          {/* Account Selector Card */}
          <div style={{marginBottom: 24, background: "var(--s2)", padding: 12, borderRadius: "var(--r)", border: "1px solid var(--border)"}}>
            <label className="lbl" style={{marginBottom: 6}}>Compte Actif</label>
            <div style={{display: "flex", gap: 6}}>
              <select value={currentAccountId} onChange={e=>setCurrentAccountId(e.target.value)} style={{flex: 1, padding: "6px 10px", fontSize: 12, height: 32}}>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </select>
              <button className="btn-ghost" style={{height: 32, width: 32, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16}} onClick={() => setShowAccountModal(true)}>+</button>
            </div>
            {accounts.length > 1 && (
              <button className="btn-red btn-sm" style={{width: "100%", marginTop: 8, height: 26, display: "flex", alignItems: "center", justifyContent: "center", gap: 6}} onClick={() => setAccountToDelete(accounts.find(a => a.id === currentAccountId))}>
                🗑️ Supprimer
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav style={{display:"flex",flexDirection:"column",gap:2}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} className={`nav-btn ${tab===t.id?"active":""}`}>
                <span style={{fontSize: 16}}>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </nav>

          {/* Live PnL Widget at Bottom */}
          <div style={{marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--border)"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6}}>
              <span style={{fontSize: 10, color: "var(--muted2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px"}}>PnL Global</span>
              <div style={{display:"flex",alignItems:"center",gap:5,padding:"2px 8px",background:"#00C89615",border:"1px solid #00C89630",borderRadius:20}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"var(--green)",animation:"blink 2s infinite"}}/>
                <span style={{fontSize:9,color:"var(--green)",fontFamily:"var(--mono)",fontWeight:700}}>LIVE</span>
              </div>
            </div>
            <div className="mono" style={{fontSize: 20, fontWeight: 700, color: colorPnl(totalPnl)}}>{fPnl(totalPnl)}</div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="main-content">
          {/* Header Bar */}
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderBottom: "1px solid var(--border)", paddingBottom: 16}}>
            <div>
              <h1 style={{fontSize: 22, fontWeight: 800}}>{TABS.find(t=>t.id===tab).label}</h1>
              <p style={{fontSize: 12, color: "var(--muted2)", marginTop: 4}}>
                Compte : <b style={{color: "var(--gold)"}}>{accounts.find(a=>a.id===currentAccountId)?.name}</b>
              </p>
            </div>
          </div>

          {tab==="dashboard"&&<Dashboard trades={accountTrades} plan={accountPlan}/>}
          {tab==="journal"&&<Journal trades={accountTrades} onAdd={t=>setTrades(p=>[{...t, accountId: currentAccountId},...p])} onEdit={t=>setTrades(p=>p.map(x=>x.id===t.id?t:x))} onDelete={id=>setTrades(p=>p.filter(x=>x.id!==id))} onOpenAddModal={()=>setTradeModalOpen(true)} onOpenEditModal={t=>setEditingTrade(t)}/>}
          {tab==="plan"&&<Plan plan={accountPlan} onChange={updated => setPlans(p => ({...p, [currentAccountId]: updated}))}/>}
          {tab==="analyse"&&<Analyse trades={accountTrades} plan={accountPlan}/>}
          {tab==="calc"&&<Calculator plan={accountPlan}/>}
          {tab==="backtest"&&<BacktestTracker backtests={backtests} onAddSession={s=>setBacktests(p => [s, ...p])} onDeleteSession={id=>setBacktests(p=>p.filter(x=>x.id!==id))}/>}
          {tab==="prepa"&&<MindsetTracker logs={mindsetLogs} onAddLog={l=>setMindsetLogs(p=>[l, ...p])} onDeleteLog={id=>setMindsetLogs(p=>p.filter(x=>x.id!==id))}/>}
        </main>
      </div>

      {/* Trade Modal (Rendered at Root Viewport Level) */}
      {(tradeModalOpen || editingTrade) && (
        <TradeModal
          init={editingTrade}
          onSave={t => {
            if (editingTrade) {
              setTrades(p => p.map(x => x.id === t.id ? t : x));
            } else {
              setTrades(p => [{...t, accountId: currentAccountId}, ...p]);
            }
            setTradeModalOpen(false);
            setEditingTrade(null);
          }}
          onClose={() => {
            setTradeModalOpen(false);
            setEditingTrade(null);
          }}
        />
      )}

      {/* Create Account Modal */}
      {showAccountModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(6px)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div className="card fade" style={{width:"100%",maxWidth:400,border:"1px solid var(--border2)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h3 style={{fontWeight:800,fontSize:16}}>Créer un Compte</h3>
              <button className="btn-ghost btn-sm" onClick={() => setShowAccountModal(false)}>✕</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
              <div>
                <label className="lbl">Nom du compte</label>
                <input value={newAccName} onChange={e => setNewAccName(e.target.value)} placeholder="ex: Compte Prop Firm 200k"/>
              </div>
              <div>
                <label className="lbl">Capital de départ ($)</label>
                <input type="number" value={newAccCap} onChange={e => setNewAccCap(e.target.value)} placeholder="ex: 200000"/>
              </div>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button className="btn-ghost" onClick={() => setShowAccountModal(false)}>Annuler</button>
              <button className="btn-gold" onClick={addAccount}>Créer</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {accountToDelete && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(6px)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div className="card fade" style={{width:"100%",maxWidth:400,border:"1px solid var(--border2)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h3 style={{fontWeight:800,fontSize:16,color:"var(--red)"}}>⚠️ Supprimer le Compte</h3>
              <button className="btn-ghost btn-sm" onClick={() => setAccountToDelete(null)}>✕</button>
            </div>
            <p style={{fontSize:13,color:"var(--text)",lineHeight:"1.5",marginBottom:18}}>
              Voulez-vous vraiment supprimer le compte <b>{accountToDelete.name}</b> et toutes les données de trading qui y sont associées ? 
              <br/><br/>
              <span style={{color:"var(--red)",fontWeight:700}}>Cette action est irréversible.</span>
            </p>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button className="btn-ghost" onClick={() => setAccountToDelete(null)}>Annuler</button>
              <button className="btn-red" style={{padding:"8px 16px"}} onClick={confirmDeleteAccount}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
