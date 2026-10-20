import { useMemo, useState } from 'react';
import { SECTIONS, STATS, NOTIFICATIONS } from './data';
import s from './AdminDashboard.module.css';

const NAV = [['dash', '📊', 'Dashboard'], ...Object.entries(SECTIONS).map(([k, v]) => [k, v.icon, v.title]), ['notif', '🔔', 'Notifications']];
const PENDING = ['Pending', 'Review'];

export default function AdminDashboard() {
  const [data, setData] = useState(SECTIONS);
  const [view, setView] = useState('dash');
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState('');
  const [globalQ, setGlobalQ] = useState('');

  const flash = (t) => { setToast(t); setTimeout(() => setToast(''), 2000); };
  const go = (k) => { setView(k); setMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const update = (key, fn) => setData((d) => ({ ...d, [key]: { ...d[key], rows: fn(d[key].rows) } }));

  const onGlobalSearch = (e) => {
    if (e.key !== 'Enter' || !globalQ.trim()) return;
    const t = globalQ.toLowerCase();
    const hit = Object.keys(data).find((k) => data[k].rows.some((r) => r.join(' ').toLowerCase().includes(t)));
    hit ? go(hit) : flash('No match found');
  };

  return (
    <div className={`${s.app} ${dark ? s.dark : ''}`}>
      <aside className={`${s.side} ${menu ? s.sideOpen : ''}`}>
        <div className={s.logo}><i>🌿</i><div><b>GramNexa</b><small>Admin Console</small></div></div>
        {NAV.map(([k, icon, label]) => (
          <button key={k} className={`${s.nav} ${view === k ? s.navOn : ''}`} onClick={() => go(k)}>
            <em>{icon}</em>{label}{k === 'notif' && <span className={s.badge}>{NOTIFICATIONS.length}</span>}
          </button>
        ))}
      </aside>
      {menu && <div className={s.shade} onClick={() => setMenu(false)} />}

      <div className={s.main}>
        <header className={s.top}>
          <button className={s.burger} onClick={() => setMenu(true)} aria-label="Open menu">☰</button>
          <label className={s.search}>🔍
            <input value={globalQ} onChange={(e) => setGlobalQ(e.target.value)} onKeyDown={onGlobalSearch} placeholder="Search schemes, students, jobs, farmers…" />
          </label>
          <span className={s.grow} />
          <button className={s.ico} onClick={() => setDark(!dark)} aria-label="Toggle theme">🌓</button>
          <button className={s.ico} onClick={() => go('notif')} aria-label="Notifications">🔔<span className={s.dot}>{NOTIFICATIONS.length}</span></button>
          <div className={s.avatar}>AD</div>
        </header>

        <main className={s.page} key={view}>
          {view === 'dash' && <Dash data={data} go={go} />}
          {view === 'notif' && <Notifications go={go} />}
          {data[view] && <Section k={view} cfg={data[view]} update={update} flash={flash} />}
        </main>
      </div>
      <div className={`${s.toast} ${toast ? s.toastOn : ''}`}>{toast}</div>
    </div>
  );
}

function Dash({ data, go }) {
  const keys = Object.keys(data);
  const total = keys.reduce((a, k) => a + data[k].rows.length, 0);
  const pending = keys.reduce((a, k) => a + data[k].rows.filter((r) => PENDING.includes(r[2])).length, 0);
  const bars = [['Apr', 40], ['May', 55], ['Jun', 48], ['Jul', 70], ['Aug', 64], ['Sep', 90], ['Oct', 82]];

  return (
    <>
      <div className={s.hero}>
        <div><h1>Welcome back, Admin 👋</h1><p>{pending} items need your attention across {total} records.</p></div>
        <button className={`${s.btn} ${s.btnWhite}`} onClick={() => go('students')}>Review pending</button>
      </div>
      <div className={`${s.grid} ${s.g4}`}>
        {STATS.map((x) => (
          <div key={x.label} className={`${s.card} ${s.stat}`} onClick={() => go(x.to)}>
            <div className={`${s.statIcon} ${s[x.tone]}`}>{x.icon}</div>
            <div><b>{x.value}</b><small>{x.label}</small></div>
          </div>
        ))}
      </div>
      <div className={`${s.grid} ${s.g2}`} style={{ marginTop: 16 }}>
        <div className={s.card}>
          <b>Platform Engagement</b>
          <div className={s.bars}>{bars.map(([m, v]) => <div key={m} style={{ height: `${v}%` }}><span>{m}</span></div>)}</div>
        </div>
        <AIAssistant data={data} />
      </div>
    </>
  );
}

function AIAssistant({ data }) {
  const [msgs, setMsgs] = useState([{ me: false, t: 'Hi! Pick a question or type one below.' }]);
  const [input, setInput] = useState('');
  const count = (k, st) => data[k].rows.filter((r) => r[2] === st).length;
  const answers = {
    pending: () => `${Object.keys(data).reduce((a, k) => a + data[k].rows.filter((r) => PENDING.includes(r[2])).length, 0)} records await review. Students: ${count('students', 'Pending')} pending.`,
    jobs: () => `${count('jobs', 'Open')} jobs open, ${count('jobs', 'Review')} under review, ${count('jobs', 'Closed')} closed.`,
    farm: () => `${count('farmers', 'Verified')} farmers verified, ${count('farmers', 'Pending')} waiting for verification.`,
    stud: () => `${count('students', 'Approved')} students approved, ${count('students', 'Pending')} pending.`,
  };
  const ask = (label, key) => setMsgs((m) => [...m, { me: true, t: label }, { me: false, t: answers[key]() }]);
  const submit = (e) => {
    if (e.key !== 'Enter' || !input.trim()) return;
    const t = input.toLowerCase();
    ask(input, t.includes('job') ? 'jobs' : t.includes('farm') ? 'farm' : /stud|scholar/.test(t) ? 'stud' : 'pending');
    setInput('');
  };
  return (
    <div className={`${s.card} ${s.ai}`}>
      <b>✨ AI Assistant</b>
      <div className={s.msgs}>{msgs.map((m, i) => <div key={i} className={`${s.msg} ${m.me ? s.me : ''}`}>{m.t}</div>)}</div>
      <div className={s.chips}>
        {[['Pending work', 'pending'], ['Jobs summary', 'jobs'], ['Farmer insight', 'farm'], ['Student insight', 'stud']].map(([l, k]) => (
          <button key={k} className={s.chip} onClick={() => ask(l, k)}>{l}</button>
        ))}
      </div>
      <input className={s.aiInput} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={submit} placeholder="Ask anything… (Enter)" />
    </div>
  );
}

function Section({ k, cfg, update, flash }) {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ a: '', b: '', st: 'Pending' });

  const statuses = useMemo(() => ['All', ...new Set(cfg.rows.map((r) => r[2]))], [cfg.rows]);
  const rows = cfg.rows.map((r, i) => [r, i]).filter(([r]) => (filter === 'All' || r[2] === filter) && r.join(' ').toLowerCase().includes(q.toLowerCase()));
  const n = (list) => cfg.rows.filter((r) => list.includes(r[2])).length;

  const setStatus = (i, st) => { update(k, (r) => r.map((x, j) => (j === i ? [x[0], x[1], st] : x))); flash(st); };
  const remove = (i) => { update(k, (r) => r.filter((_, j) => j !== i)); flash('Record deleted'); };
  const save = () => {
    if (!form.a.trim()) return flash('Enter a name');
    update(k, (r) => [[form.a, form.b || '—', form.st], ...r]);
    setForm({ a: '', b: '', st: 'Pending' }); setOpen(false); flash('Added');
  };

  return (
    <>
      <div className={s.row}>
        <div><h1>{cfg.icon} {cfg.title}</h1><p className={s.sub}>Manage, verify and publish {cfg.title.toLowerCase()} records.</p></div>
        <button className={s.btn} onClick={() => setOpen(true)}>+ Add New</button>
      </div>
      <div className={`${s.grid} ${s.g4}`} style={{ marginBottom: 16 }}>
        {[['Total', cfg.rows.length], ['Needs review', n(PENDING)], ['Live', n(cfg.live)], ['Closed / Rejected', n(cfg.closed)]].map(([l, v]) => (
          <div key={l} className={`${s.card} ${s.stat}`}><div><b>{v}</b><small>{l}</small></div></div>
        ))}
      </div>
      <div className={s.card}>
        <div className={s.row}>
          <div className={s.chips}>{statuses.map((x) => <button key={x} className={`${s.chip} ${filter === x ? s.chipOn : ''}`} onClick={() => setFilter(x)}>{x}</button>)}</div>
          <label className={s.search} style={{ maxWidth: 260 }}>🔍<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" /></label>
        </div>
        <div className={s.tbl}>
          <table>
            <thead><tr>{cfg.cols.map((c) => <th key={c}>{c}</th>)}<th>Actions</th></tr></thead>
            <tbody>
              {rows.length === 0 && <tr><td colSpan={4}>No records match. Clear the filter or add a new one.</td></tr>}
              {rows.map(([r, i]) => (
                <tr key={r[0] + i}>
                  <td><b>{r[0]}</b></td><td>{r[1]}</td>
                  <td><span className={`${s.pill} ${s[r[2]]}`}>{r[2]}</span></td>
                  <td>
                    <button className={s.chip} onClick={() => setStatus(i, cfg.ok)} aria-label="Approve">✔</button>{' '}
                    <button className={s.chip} onClick={() => setStatus(i, cfg.no)} aria-label="Reject">✖</button>{' '}
                    <button className={s.chip} onClick={() => remove(i)} aria-label="Delete">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {open && (
        <div className={s.modal} onClick={() => setOpen(false)}>
          <div className={`${s.card} ${s.modalCard}`} onClick={(e) => e.stopPropagation()}>
            <h3>Add to {cfg.title}</h3>
            <input value={form.a} onChange={(e) => setForm({ ...form, a: e.target.value })} placeholder={cfg.cols[0]} />
            <input value={form.b} onChange={(e) => setForm({ ...form, b: e.target.value })} placeholder={cfg.cols[1]} />
            <select value={form.st} onChange={(e) => setForm({ ...form, st: e.target.value })}>
              {['Pending', cfg.ok].map((x) => <option key={x}>{x}</option>)}
            </select>
            <div className={s.row} style={{ margin: 0 }}>
              <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setOpen(false)}>Cancel</button>
              <button className={s.btn} onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Notifications({ go }) {
  return (
    <>
      <h1>🔔 Notifications</h1><p className={s.sub}>Latest alerts from the portal.</p>
      <div className={`${s.card} ${s.tl}`}>
        {NOTIFICATIONS.map((n) => (
          <div key={n.text}><b>{n.text}</b><button className={s.link} onClick={() => go(n.to)}>Open section</button></div>
        ))}
      </div>
    </>
  );
}