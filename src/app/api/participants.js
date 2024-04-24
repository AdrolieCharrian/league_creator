import { POST, PUT, DELETE } from './participants/route';

export default async function handler(request, response) {
  const { method } = request;

  if (method === 'POST') {
    return POST(request, response);
  } else if (method === 'PUT') {
    return PUT(request, response);
  } else if (method === 'DELETE') {
    return DELETE(request, response);
  } else {
    return response.status(405).json({ message: 'Método no permitido' });
  }
}
