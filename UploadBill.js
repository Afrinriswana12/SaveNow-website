import React, { useState } from 'react';
import API from '../api';

export default function UploadBill(){
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const upload = async () => {
    if (!file) return alert('Choose file');
    const fd = new FormData();
    fd.append('bill', file);
    try {
      const r = await API.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      setMsg(`Uploaded: ${r.data.file}`);
    } catch (err) {
      setMsg('Upload failed. Login required or server error.');
    }
  };

  return (
    <div className="container" style={{marginTop:16}}>
      <div className="card">
        <h3>Upload Bill (PDF / Image)</h3>
        <div style={{marginTop:8}} className="form-row">
          <input className="input" type="file" accept="application/pdf,image/*" onChange={e=>setFile(e.target.files[0])} />
          <button className="btn" onClick={upload}>Upload</button>
        </div>
        {msg && <div style={{marginTop:8}} className="small">{msg}</div>}
      </div>
    </div>
  );
}
