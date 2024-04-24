'use client';
import { useState } from 'react';
import Link from 'next/link'

export default function League_parti() {

  const [id_user, setid_user] = useState('');
  const [id_liga, setid_liga] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Intentando enviar datos:', { id_user,id_liga });

    try {
      console.log('Haciendo fetch a /api/particpants...');
      await fetch('/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id_user,leagueId: id_liga}),
      });
      console.log(id_user, id_liga);
    } catch (error) {
      console.error('Error durante el fetch:', error);
    }
  };

  return (
    <div>
        <Link href={'/'}>Home</Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="id_user"
          value={id_user}
          onChange={(e) => setid_user(e.target.value)}
        />
        <input
          type="text"
          placeholder="id_liga"
          value={id_liga}
          onChange={(e) => setid_liga(e.target.value)}
        />
        <button onClick={console.log(id_liga, id_user)}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
