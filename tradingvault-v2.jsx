import { useState, useEffect } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
   Dark terminal aesthetic — chiffres en premier, typographie monospace assumée,
   palette or/vert inspirée des terminaux Bloomberg
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
`;

/* ─── DONNÉES INITIALES ─────────────────────────────────────────────────────── */
const TRADES0 = [
  {id:1,date:"2026-06-02",symbol:"GOLD",direction:"LONG",entry:2318,exit:2345,sl:2305,tp:2360,size:0.5,fees:10,pnl:1350,rr:2.08,status:"WIN",session:"Overlap",setup:"FVG",emotion:"Confiant",notes:"FVG H1 bien formé, confluence OB Daily. Sortie sur TP2.",rule_respected:true},
  {id:2,date:"2026-06-01",symbol:"GOLD",direction:"SHORT",entry:2352,exit:2330,sl:2365,tp:2320,size:0.5,fees:10,pnl:1100,rr:2.46,status:"WIN",session:"New York",setup:"Orderblock",emotion:"Neutre",notes:"OB 1H mitigation. DXY en hausse. Partiel à mi-chemin.",rule_respected:true},
  {id:3,date:"2026-05-30",symbol:"EUR/USD",direction:"LONG",entry:1.0872,exit:1.0851,sl:1.0855,tp:1.0920,size:1.0,fees:8,pnl:-210,rr:2.82,status:"LOSS",session:"London",setup:"Breakout",emotion:"Impatient",notes:"Entré avant confirmation. Mauvais timing, structure pas validée.",rule_respected:false},
  {id:4,date:"2026-05-29",symbol:"NAS100",direction:"LONG",entry:19340,exit:19340,sl:19200,tp:19560,size:0.2,fees:6,pnl:0,rr:1.57,status:"BE",session:"New York",setup:"Structure",emotion:"Neutre",notes:"Sorti au BE après fausse cassure. Position gérée correctement.",rule_respected:true},
  {id:5,date:"2026-05-28",symbol:"GOLD",direction:"LONG",entry:2298,exit:2285,sl:2290,tp:2330,size:0.3,fees:8,pnl:-390,rr:4.0,status:"LOSS",session:"London",setup:"FVG",emotion:"Stressé",notes:"News CPI inattendue. SL touché. Pas de trading sur news = règle violée.",rule_respected:false},
  {id:6,date:"2026-05-27",symbol:"BTC/USD",direction:"SHORT",entry:67800,exit:66950,sl:68400,tp:66000,size:0.15,fees:12,pnl:1275,rr:1.42,status:"WIN",session:"Overlap",setup:"Structure",emotion:"Confiant",notes:"BOS H4 confirmé. Trend baissier clairement établi.",rule_respected:true},
];

const PLAN0 = {
  strategy:"ICT / Smart Money Concepts",
  capital:10000,
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
};

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
    emotion:"Neutre",notes:"",status:"",rule_respected:true};
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

  const Field=({label,fkey,type="text",...rest})=>(
    <div>
      <label className="lbl">{label}</label>
      <input type={type} value={f[fkey]} onChange={e=>set(fkey,e.target.value)} {...rest}/>
    </div>
  );
  const Select=({label,fkey,opts})=>(
    <div>
      <label className="lbl">{label}</label>
      <select value={f[fkey]} onChange={e=>set(fkey,e.target.value)}>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(6px)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div className="card fade" style={{width:"100%",maxWidth:660,maxHeight:"92vh",overflowY:"auto",border:"1px solid var(--border2)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h3 style={{fontWeight:800,fontSize:17}}>{f.id?"Modifier le trade":"+ Nouveau Trade"}</h3>
          <button className="btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

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
          <Field label="Date" fkey="date" type="date"/>
          <Field label="Symbole" fkey="symbol" placeholder="GOLD, EUR/USD..."/>
        </div>
        <div className="g3" style={{gap:10,marginBottom:10}}>
          <Select label="Direction" fkey="direction" opts={["LONG","SHORT"]}/>
          <Field label="Entrée" fkey="entry" type="number" step="any" placeholder="0.00"/>
          <Field label="Sortie" fkey="exit" type="number" step="any" placeholder="0.00"/>
        </div>
        <div className="g3" style={{gap:10,marginBottom:10}}>
          <Field label="Stop Loss" fkey="sl" type="number" step="any" placeholder="0.00"/>
          <Field label="Take Profit" fkey="tp" type="number" step="any" placeholder="0.00"/>
          <Field label="Taille (lots)" fkey="size" type="number" step="any" placeholder="0.1"/>
        </div>
        <div className="g4" style={{gap:10,marginBottom:10}}>
          <Select label="Session" fkey="session" opts={["Tokyo","London","New York","Overlap"]}/>
          <Select label="Setup" fkey="setup" opts={["FVG","Orderblock","Breakout","Structure","Scalp","Autre"]}/>
          <Select label="Émotion" fkey="emotion" opts={["Confiant","Neutre","Incertain","Stressé","Impatient","Euphorique"]}/>
          <Field label="Frais ($)" fkey="fees" type="number" placeholder="8"/>
        </div>
        <div className="g2" style={{gap:10,marginBottom:10}}>
          <Select label="Statut (auto si vide)" fkey="status" opts={["","WIN","LOSS","BE","OPEN"]}/>
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
        <div style={{marginBottom:18}}>
          <label className="lbl">Notes & Analyse post-trade</label>
          <textarea value={f.notes} onChange={e=>set("notes",e.target.value)} rows={3}
            placeholder="Raison d'entrée, gestion, leçons apprises..." style={{resize:"vertical"}}/>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button className="btn-ghost" onClick={onClose}>Annuler</button>
          <button className="btn-gold" onClick={save}>💾 Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ─────────────────────────────────────────────────────────────── */
function Dashboard({trades,plan}){
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
        <span style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--muted2)"}}>GOLD XAU/USD</span>
        <span style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--gold)",fontWeight:700}}>Meilleur créneau :</span>
        {["09h–12h GMT (London)","13h–18h GMT (Overlap ★)"].map(s=>(
          <span key={s} style={{padding:"3px 10px",background:"var(--gold)15",border:"1px solid var(--gold)30",borderRadius:20,fontSize:12,color:"var(--gold)",fontFamily:"var(--mono)"}}>{s}</span>
        ))}
        <span style={{marginLeft:"auto",fontSize:12,color:"var(--muted)",fontFamily:"var(--mono)"}}>Éviter : Tokyo · News ±30min · Vendredi soir</span>
      </div>

      {/* KPIs */}
      <div className="g4">
        <Tile label="Capital" value={`$${f0(capital)}`} sub={fPct(pnlPct)+" depuis début"} accent={totalPnl>=0?"var(--green)":"var(--red)"} icon="💰"/>
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
function Journal({trades,onAdd,onEdit,onDelete}){
  const [modal,setModal]=useState(false);
  const [editT,setEditT]=useState(null);
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

  return(
    <div className="fade">
      {(modal||editT)&&(
        <TradeModal init={editT} onSave={t=>{editT?onEdit(t):onAdd(t);setModal(false);setEditT(null);}} onClose={()=>{setModal(false);setEditT(null);}}/>
      )}

      {/* Toolbar */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:14}}>
        <button className="btn-gold" onClick={()=>setModal(true)}>+ Trade</button>
        <input placeholder="🔍 Symbole..." value={filt.symbol} onChange={e=>setFilt(p=>({...p,symbol:e.target.value}))} style={{width:150}}/>
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
                <th>Act.</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0&&(
                <tr><td colSpan={14} style={{textAlign:"center",color:"var(--muted)",padding:32}}>Aucun trade — clique sur "+ Trade" pour commencer</td></tr>
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
                    <div style={{display:"flex",gap:5}}>
                      <button className="btn-ghost btn-sm" onClick={()=>setEditT(t)}>✏️</button>
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
  const [f,setF]=useState(plan);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));

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
        <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Règles de Trading</div>
        {f.rules.map((r,i)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:8}}>
            <input value={r} onChange={e=>{const arr=[...f.rules];arr[i]=e.target.value;set("rules",arr);}}/>
            <button className="btn-red" onClick={()=>set("rules",f.rules.filter((_,j)=>j!==i))}>✕</button>
          </div>
        ))}
        <button className="btn-ghost btn-sm" onClick={()=>set("rules",[...f.rules,""])}>+ Règle</button>
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
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div>
          <h2 style={{fontWeight:800,fontSize:19}}>{plan.strategy}</h2>
          <p style={{color:"var(--muted2)",fontSize:13,marginTop:3}}>Plan de Trading Personnel — mis à jour régulièrement</p>
        </div>
        <button className="btn-ghost" onClick={()=>{setF(plan);setEditing(true);}}>✏️ Modifier</button>
      </div>

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

      {/* Checklist */}
      <Block title="✅ Checklist Pré-Trade" accent="var(--yellow)">
        <p style={{fontSize:13,color:"var(--muted2)",marginBottom:12}}>Coche chaque point avant d'entrer — elle se remet à zéro à chaque session.</p>
        <div className="g2">
          {["Tendance identifiée sur H4","Setup confirmé sur H1 / M15","SL défini avant l'entrée",
            "R:R ≥ "+plan.min_rr,"Pas de news dans les 30 prochaines minutes","État mental ≥ 6/10",
            "Taille de position conforme au risque","Je ne suis pas en revanche trading"].map((item,i)=>(
            <CheckBox key={i} label={item}/>
          ))}
        </div>
      </Block>

      {/* Horaires Gold */}
      <Block title="🕐 Horaires Optimaux Gold XAU/USD" accent="var(--gold)">
        <div className="g3">
          {[
            {h:"00h–07h GMT",name:"Session Asiatique",q:"Éviter",c:"var(--red)",note:"Peu de volume, faux signaux fréquents"},
            {h:"07h–12h GMT",name:"Session Londres",q:"Correct",c:"var(--yellow)",note:"Institutionnels européens actifs, bon pour setups H1"},
            {h:"13h–18h GMT",name:"Overlap ★ Best",q:"Optimal",c:"var(--green)",note:"Max volume, max volatilité, meilleurs mouvements"},
            {h:"18h–22h GMT",name:"Late New York",q:"Prudence",c:"var(--yellow)",note:"Volume décline, spread élargit en fin de session"},
            {h:"Vendredi soir",name:"Clôture hebdo",q:"Interdit",c:"var(--red)",note:"Liquidations imprévisibles, ne pas trader"},
            {h:"News majeures",name:"CPI / NFP / Fed",q:"Interdit",c:"var(--red)",note:"±30 min autour des news = danger, spreads explosent"},
          ].map((x,i)=>(
            <div key={i} style={{padding:"11px 13px",background:"var(--s2)",borderRadius:"var(--r)",borderLeft:`3px solid ${x.c}`}}>
              <div className="mono" style={{fontWeight:700,fontSize:12,color:x.c,marginBottom:4}}>{x.h}</div>
              <div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{x.name}</div>
              <div style={{fontSize:11,padding:"2px 8px",borderRadius:10,background:x.c+"15",color:x.c,fontWeight:700,display:"inline-block",marginBottom:6}}>{x.q}</div>
              <p style={{fontSize:12,color:"var(--muted2)",lineHeight:1.4}}>{x.note}</p>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}

function CheckBox({label}){
  const [on,setOn]=useState(false);
  return(
    <div onClick={()=>setOn(p=>!p)} style={{display:"flex",gap:10,padding:"8px 12px",background:"var(--s2)",borderRadius:"var(--r)",cursor:"pointer",opacity:on?.5:1,transition:"opacity .2s",alignItems:"center"}}>
      <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${on?"var(--green)":"var(--border2)"}`,background:on?"var(--green)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
        {on&&<span style={{color:"#000",fontWeight:800,fontSize:11}}>✓</span>}
      </div>
      <span style={{fontSize:13,color:on?"var(--muted)":"var(--text)",textDecoration:on?"line-through":"none"}}>{label}</span>
    </div>
  );
}

/* ─── ANALYSE ───────────────────────────────────────────────────────────────── */
function Analyse({trades}){
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

  // Rentabilité : équation
  const valid=trades.filter(t=>t.status!=="OPEN");
  const wins=valid.filter(t=>t.status==="WIN");
  const wr=valid.length?wins.length/valid.length:0;
  const avgRR=trades.filter(t=>t.rr>0).reduce((s,t)=>s+t.rr,0)/Math.max(1,trades.filter(t=>t.rr>0).length);
  const disciplinePct=trades.length?trades.filter(t=>t.rule_respected!==false).length/trades.length*100:100;

  // Score rentabilité simplifié
  const scoreEdge=Math.min(100,wr*100+avgRR*10);
  const scoreDiscipline=disciplinePct;
  const scoreGlobal=(scoreEdge*0.5+scoreDiscipline*0.5);

  return(
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:16}}>

      {/* Score rentabilité */}
      <div className="card" style={{borderTop:"2px solid var(--gold)"}}>
        <div style={{fontWeight:700,fontSize:14,color:"var(--gold)",marginBottom:16}}>📊 Équation de Rentabilité</div>
        <div className="g4" style={{marginBottom:16}}>
          {[
            {l:"Win Rate",v:f2(wr*100)+"%",c:wr>=0.5?"var(--green)":"var(--red)",target:"≥ 50%"},
            {l:"R:R Moyen",v:f2(avgRR)+"R",c:avgRR>=1.5?"var(--green)":"var(--red)",target:"≥ 1.5R"},
            {l:"Discipline",v:f2(disciplinePct)+"%",c:disciplinePct>=80?"var(--green)":"var(--red)",target:"≥ 80%"},
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
          <b style={{color:"var(--text)"}}>Formule :</b> Rentabilité = Edge × Discipline × Gestion du Risque × Temps<br/>
          {scoreGlobal>=65
            ? <span style={{color:"var(--green)"}}>✓ Ton trading est sur la bonne trajectoire. Continue à respecter le plan.</span>
            : scoreGlobal>=45
            ? <span style={{color:"var(--yellow)"}}>⚠️ Des axes d'amélioration existent. Concentre-toi sur la discipline et le R:R.</span>
            : <span style={{color:"var(--red)"}}>✗ Revois les fondamentaux. Focus sur le risk management avant de trader en réel.</span>
          }
        </div>
      </div>

      <div className="g2">
        <Table title="💹 Par Symbole" data={grp("symbol")} accent="var(--blue)"/>
        <Table title="🎭 Impact des Émotions" data={grp("emotion")} accent="var(--purple)"/>
      </div>
      <div className="g2">
        <Table title="📐 Par Setup" data={grp("setup")} accent="var(--gold)"/>
        <Table title="↕️ Long vs Short" data={grp("direction")} accent="var(--green)"/>
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

      {/* Leçons */}
      <div className="card" style={{borderTop:"2px solid var(--orange)"}}>
        <div style={{fontWeight:700,fontSize:14,color:"var(--orange)",marginBottom:14}}>📚 Les 5 Vérités pour Être Rentable</div>
        <div className="g2">
          {[
            {n:"1",t:"Risk Management d'abord",d:"1-2% max par trade. Un SL toujours défini AVANT l'entrée. Avec 40% WR + R:R 2.0 → tu es rentable."},
            {n:"2",t:"Un seul edge maîtrisé",d:"Backteste 100 trades avant de trader en réel. Moins de setups = plus de precision = plus de discipline."},
            {n:"3",t:"La psychologie est le vrai problème",d:"FOMO, revanche trading, SL déplacé — voilà les vraies causes de perte. L'émotion coûte plus que le marché."},
            {n:"4",t:"Le journal est obligatoire",d:"Si tu ne notes pas tes trades, tu répètes les mêmes erreurs sans le savoir. Le journal = ton coach."},
            {n:"5",t:"La patience est une compétence",d:"Les meilleurs journées sont souvent celles où tu ne trades pas. Moins trader = mieux trader."},
          ].map(x=>(
            <div key={x.n} style={{padding:"12px 14px",background:"var(--s2)",borderRadius:"var(--r)",borderLeft:"3px solid var(--orange)"}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                <span className="mono" style={{color:"var(--orange)",fontWeight:700,fontSize:13}}>0{x.n}</span>
                <span style={{fontWeight:700,fontSize:13}}>{x.t}</span>
              </div>
              <p style={{fontSize:12,color:"var(--muted2)",lineHeight:1.6}}>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CALCULATEUR DE POSITION ────────────────────────────────────────────────── */
function Calculator({plan}){
  const [capital,setCapital]=useState(plan.capital);
  const [riskPct,setRiskPct]=useState(plan.risk_pct);
  const [entry,setEntry]=useState("");
  const [sl,setSl]=useState("");
  const [tp,setTp]=useState("");
  const [instrument,setInstrument]=useState("GOLD");

  const INSTRUMENTS={
    "GOLD":{pip:0.1,pipVal:1,unit:"$/point",label:"Or (XAU/USD)"},
    "EUR/USD":{pip:0.0001,pipVal:10,unit:"$/pip (lot std)",label:"EUR/USD"},
    "NAS100":{pip:1,pipVal:1,unit:"$/point",label:"Nasdaq 100"},
    "BTC/USD":{pip:1,pipVal:1,unit:"$/point",label:"Bitcoin"},
    "GBP/USD":{pip:0.0001,pipVal:10,unit:"$/pip (lot std)",label:"GBP/USD"},
  };

  const inst=INSTRUMENTS[instrument]||INSTRUMENTS["GOLD"];
  const riskAmt=capital*riskPct/100;
  const e=+entry,s=+sl,t=+tp;
  const slPips=e&&s?Math.abs(e-s)/inst.pip:0;
  const tpPips=e&&t?Math.abs(t-e)/inst.pip:0;
  const rr=slPips>0&&tpPips>0?tpPips/slPips:0;
  const lotSize=slPips>0&&riskAmt>0?(riskAmt/(slPips*inst.pipVal)):0;
  const potGain=lotSize*tpPips*inst.pipVal;

  return(
    <div className="fade" style={{display:"flex",flexDirection:"column",gap:16}}>
      <div>
        <h2 style={{fontWeight:800,fontSize:18}}>🧮 Calculateur de Position</h2>
        <p style={{color:"var(--muted2)",fontSize:13,marginTop:4}}>Calcule automatiquement la taille de position selon ton risque</p>
      </div>

      <div className="g2">
        <div className="card">
          <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Paramètres</div>
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
                <label className="lbl">Risque (%)</label>
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

        <div className="card" style={{borderTop:"2px solid var(--gold)"}}>
          <div style={{fontWeight:700,fontSize:13,color:"var(--gold)",marginBottom:16}}>Résultats</div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {l:"Montant risqué",v:"$"+f2(riskAmt),c:riskAmt>0?"var(--text)":"var(--muted)"},
              {l:"Distance SL (pips/points)",v:slPips>0?f2(slPips)+" pips":"—",c:"var(--red)"},
              {l:"Distance TP (pips/points)",v:tpPips>0?f2(tpPips)+" pips":"—",c:"var(--green)"},
              {l:"Ratio R:R",v:rr>0?f2(rr)+"R":"—",c:rr>=1.5?"var(--green)":rr>0?"var(--red)":"var(--muted)"},
              {l:"Taille de position (lots)",v:lotSize>0?f2(lotSize)+" lots":"—",c:"var(--gold)"},
              {l:"Gain potentiel",v:potGain>0?"+$"+f2(potGain):"—",c:"var(--green)"},
            ].map(x=>(
              <div key={x.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"var(--s2)",borderRadius:"var(--r)"}}>
                <span style={{fontSize:13,color:"var(--muted2)"}}>{x.l}</span>
                <span className="mono" style={{fontWeight:700,color:x.c,fontSize:15}}>{x.v}</span>
              </div>
            ))}
          </div>

          {rr>0&&(
            <div style={{marginTop:14,padding:"11px 14px",borderRadius:"var(--r)",background:rr>=1.5?"#00C89615":"#E8455A15",border:`1px solid ${rr>=1.5?"#00C89630":"#E8455A30"}`,textAlign:"center"}}>
              <span style={{fontWeight:700,fontSize:14,color:rr>=1.5?"var(--green)":"var(--red)"}}>
                {rr>=1.5?"✓ R:R valide — trade autorisé selon le plan":"✗ R:R insuffisant — trade non conforme au plan"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Guide rapide */}
      <div className="card" style={{borderTop:"2px solid var(--blue)"}}>
        <div style={{fontWeight:700,fontSize:13,color:"var(--blue)",marginBottom:12}}>📖 Guide Rapide — Taille de Position</div>
        <div className="g3">
          {[
            {t:"Règle des 1%",d:"Ne jamais risquer plus de 1% du capital sur un seul trade. Avec $10,000 → max $100 de risque par position."},
            {t:"Calcul de base",d:"Lots = (Capital × Risque%) ÷ (Distance SL en pips × Valeur du pip). Toujours calculer AVANT d'entrer."},
            {t:"Pourquoi c'est crucial",d:"Avec 10 pertes consécutives à 1% = -10% capital. À 5% par trade = -40% capital. Le sizing sauve des comptes."},
          ].map(x=>(
            <div key={x.t} style={{padding:"11px 13px",background:"var(--s2)",borderRadius:"var(--r)"}}>
              <div style={{fontWeight:700,fontSize:13,marginBottom:5,color:"var(--blue)"}}>{x.t}</div>
              <p style={{fontSize:12,color:"var(--muted2)",lineHeight:1.6}}>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────────────── */
export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [trades,setTrades]=useState(TRADES0);
  const [plan,setPlan]=useState(PLAN0);

  const TABS=[
    {id:"dashboard",icon:"📊",label:"Tableau de Bord"},
    {id:"journal",icon:"📓",label:"Journal"},
    {id:"plan",icon:"📋",label:"Plan de Trading"},
    {id:"analyse",icon:"🔬",label:"Analyse"},
    {id:"calc",icon:"🧮",label:"Calculateur"},
  ];

  const totalPnl=trades.reduce((s,t)=>s+(t.pnl||0),0);

  return(
    <>
      <style>{G}</style>
      <div style={{minHeight:"100vh"}}>

        {/* HEADER */}
        <header style={{background:"var(--s1)",borderBottom:"1px solid var(--border)",padding:"0 20px",display:"flex",alignItems:"center",height:52,gap:16,position:"sticky",top:0,zIndex:200}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:30,height:30,background:"linear-gradient(135deg,var(--gold),var(--orange))",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📈</div>
            <div>
              <div style={{fontWeight:800,fontSize:15,lineHeight:1}}>TradingVault</div>
              <div style={{fontSize:10,color:"var(--muted2)",letterSpacing:".5px",fontFamily:"var(--mono)"}}>v2.0 · GOLD FOCUS</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{display:"flex",gap:2,background:"var(--s2)",borderRadius:"var(--r)",padding:3,marginLeft:8}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{padding:"6px 14px",borderRadius:7,fontSize:12,fontWeight:700,
                  background:tab===t.id?"var(--gold)":"transparent",
                  color:tab===t.id?"#000":"var(--muted2)",
                  border:"none",transition:"all .15s",whiteSpace:"nowrap"}}>
                <span style={{marginRight:5}}>{t.icon}</span>{t.label}
              </button>
            ))}
          </nav>

          {/* PnL live */}
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
            <div className="mono" style={{fontSize:14,fontWeight:700,color:colorPnl(totalPnl)}}>{fPnl(totalPnl)}</div>
            <div style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",background:"#00C89615",border:"1px solid #00C89630",borderRadius:20}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"var(--green)",animation:"blink 2s infinite"}}/>
              <span style={{fontSize:11,color:"var(--green)",fontFamily:"var(--mono)",fontWeight:700}}>LIVE</span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main style={{padding:"18px 20px",maxWidth:1400,margin:"0 auto"}}>
          {tab==="dashboard"&&<Dashboard trades={trades} plan={plan}/>}
          {tab==="journal"&&<Journal trades={trades} onAdd={t=>setTrades(p=>[t,...p])} onEdit={t=>setTrades(p=>p.map(x=>x.id===t.id?t:x))} onDelete={id=>setTrades(p=>p.filter(x=>x.id!==id))}/>}
          {tab==="plan"&&<Plan plan={plan} onChange={setPlan}/>}
          {tab==="analyse"&&<Analyse trades={trades}/>}
          {tab==="calc"&&<Calculator plan={plan}/>}
        </main>
      </div>
    </>
  );
}
