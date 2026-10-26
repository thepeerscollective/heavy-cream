import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="wrap page nf">
      <p className="script">crumbs everywhere</p>
      <h1 className="headline">This page<br />got eaten.</h1>
      <p className="body" style={{ marginTop: 20 }}>whatever was here, someone had it with a flat white. the tray is still full though.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
        <Link href="/menu/" className="btn fill">see the tray</Link>
        <Link href="/" className="btn">home</Link>
      </div>
    </div>
  );
}
