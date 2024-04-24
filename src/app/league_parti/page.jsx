'use client';
import { useState } from 'react';
import Link from 'next/link'

export default function League_parti() {

  const [idUser, setIdUser] = useState('');
  const [idLeague, setIdLeague] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Haciendo fetch a /api/participants...');
      await fetch('/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: idUser, leagueId: idLeague}),
      });
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
          value={idUser}
          onChange={(e) => setIdUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="id_liga"
          value={idLeague}
          onChange={(e) => setIdLeague(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
